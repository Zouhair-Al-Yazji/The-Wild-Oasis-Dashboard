import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Cabin } from "./useCabins";
import { useCreateCabin, useUpdateCabin } from "./useCabinMutations";
import { DialogFooter } from "@/components/ui/dialog";
import SpinnerMini from "@/ui/SpinnerMini";
import FormRow from "@/ui/FormRow";
import ImageUpload from "./ImageUpload";

type CreateCabinFormProps = {
  onConfirm: () => void;
  cabinToUpdate?: Cabin;
};

export default function CreateCabinForm({
  onConfirm,
  cabinToUpdate,
}: CreateCabinFormProps) {
  const { mutate: createCabin, isPending: isCreating } = useCreateCabin();
  const { mutate: updateCabin, isPending: isUpdating } = useUpdateCabin();

  const { id: updateId, ...updateValues } = cabinToUpdate || {};

  const isWorking = isCreating || isUpdating;

  const isUpdateSession = Boolean(updateId);

  const form = useForm<Cabin>({
    defaultValues: isUpdateSession
      ? updateValues
      : {
          name: "",
          maxCapacity: 0,
          regularPrice: 0,
          discount: 0,
          description: "",
          image: "",
        },
  });

  const { handleSubmit, reset, register, formState, getValues, watch } = form;
  const { errors } = formState;

  function onSubmit(data: Cabin) {
    // Handle image field
    let image: FileList | string = data.image;

    // For update: if no new image is provided (empty FileList), use the existing image
    if (
      isUpdateSession &&
      image instanceof FileList &&
      image.length === 0 &&
      cabinToUpdate?.image
    ) {
      // Keep the existing image from cabinToUpdate
      image = cabinToUpdate.image;
    }

    if (isUpdateSession && updateId) {
      updateCabin(
        { newCabin: { ...data, image }, id: updateId },
        {
          onSuccess: () => {
            reset();
            onConfirm();
          },
        },
      );
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onConfirm();
          },
        },
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-h-[calc(90vh-180px)] divide-y overflow-y-auto px-1"
    >
      <div className="space-y-6 py-4">
        <FormRow
          label="Cabin name"
          htmlFor="name"
          model={true}
          error={
            typeof errors?.name?.message === "string"
              ? errors.name.message
              : undefined
          }
        >
          <Input
            type="text"
            id="name"
            disabled={isWorking}
            placeholder="cabin name"
            className="text-accent-foreground"
            {...register("name", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow
          label="Maximum capacity"
          htmlFor="maxCapacity"
          model={true}
          error={
            typeof errors?.maxCapacity?.message === "string"
              ? errors.maxCapacity.message
              : undefined
          }
        >
          <Input
            type="number"
            id="maxCapacity"
            disabled={isWorking}
            className="text-accent-foreground"
            {...register("maxCapacity", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Capacity must be at least 1",
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Regular price"
          htmlFor="regularPrice"
          model={true}
          error={
            typeof errors?.regularPrice?.message === "string"
              ? errors.regularPrice.message
              : undefined
          }
        >
          <Input
            type="number"
            id="regularPrice"
            className="text-accent-foreground"
            disabled={isWorking}
            {...register("regularPrice", {
              required: "This field is required",
              min: {
                value: 1,
                message: "The price must be at least 1",
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Discount"
          htmlFor="discount"
          model={true}
          error={
            typeof errors?.discount?.message === "string"
              ? errors.discount.message
              : undefined
          }
        >
          <Input
            type="number"
            id="discount"
            min={0}
            disabled={isWorking}
            className="text-accent-foreground"
            {...register("discount", {
              required: "This field is required",
              validate: (value: number) =>
                value <= getValues("regularPrice") ||
                "Discount should be less than regular price",
            })}
          />
        </FormRow>

        <FormRow
          label="Description"
          htmlFor="description"
          model={true}
          error={
            typeof errors?.description?.message === "string"
              ? errors.description.message
              : undefined
          }
        >
          <Textarea
            id="description"
            className="text-accent-foreground"
            placeholder="cabin description"
            disabled={isWorking}
            {...register("description", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow
          label={`Cabin photo ${isUpdateSession ? "(optional)" : ""}`}
          htmlFor="image"
          model={true}
          error={
            typeof errors?.image?.message === "string"
              ? errors.image.message
              : undefined
          }
        >
          <ImageUpload
            register={register}
            watch={watch}
            isUpdateSession={isUpdateSession}
            cabinToUpdate={cabinToUpdate}
          />
        </FormRow>
      </div>

      <DialogFooter className="bg-background sticky bottom-0 border-t pt-6">
        <Button
          variant="outline"
          type="button"
          disabled={isWorking}
          onClick={(e) => {
            e.preventDefault();
            onConfirm();
          }}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isWorking}>
          {isWorking ? (
            <SpinnerMini label="saving..." />
          ) : isUpdateSession ? (
            "Update Cabin"
          ) : (
            "Add Cabin"
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
