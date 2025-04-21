import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { PropsDialogType } from "@/ui/DeleteConfirmationDialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CloudUpload } from "lucide-react";

export default function CreateCabinFormDialog({
  open,
  onOpenChange,
}: PropsDialogType) {
  const { register, handleSubmit, formState, reset, getValues, watch } =
    useForm();
  const { errors } = formState;

  function onSubmit() {}
  function onError() {}

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] !max-w-[800px] overflow-hidden">
        <DialogHeader className="px-1">
          <DialogTitle>Add Cabin</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new cabin to your inventory.
            <br />
            All fields are required.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="max-h-[calc(90vh-180px)] divide-y divide-gray-200 overflow-y-auto px-1"
        >
          <div className="space-y-6 py-4">
            {/* Cabin Name */}
            <div className="grid grid-cols-[13rem_1fr_1fr] items-center gap-6">
              <Label htmlFor="name">Cabin name</Label>
              <div className="space-y-2">
                <Input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "This field is required",
                  })}
                />
                {errors?.name && (
                  <p className="text-sm text-red-600">
                    {typeof errors?.name?.message === "string" &&
                      errors.name.message}
                  </p>
                )}
              </div>
            </div>

            {/* Max Capacity */}
            <div className="grid grid-cols-[13rem_1fr_1fr] items-center gap-6">
              <Label htmlFor="maxCapacity">Maximum capacity</Label>
              <div className="space-y-2">
                <Input
                  type="number"
                  id="maxCapacity"
                  {...register("maxCapacity", {
                    required: "This field is required",
                    min: {
                      value: 1,
                      message: "Capacity must be at least 1",
                    },
                  })}
                />
                {errors?.maxCapacity && (
                  <p className="text-sm text-red-600">
                    {typeof errors?.maxCapacity?.message === "string" &&
                      errors.maxCapacity.message}
                  </p>
                )}
              </div>
            </div>

            {/* Regular Price */}
            <div className="grid grid-cols-[13rem_1fr_1fr] items-center gap-6">
              <Label htmlFor="regularPrice">Regular price</Label>
              <div className="space-y-2">
                <Input
                  type="number"
                  id="regularPrice"
                  {...register("regularPrice", {
                    required: "This field is required",
                    min: {
                      value: 1,
                      message: "The price must be at least 1",
                    },
                  })}
                />
                {errors?.regularPrice && (
                  <p className="text-sm text-red-600">
                    {typeof errors?.regularPrice?.message === "string" &&
                      errors.regularPrice.message}
                  </p>
                )}
              </div>
            </div>

            {/* Discount */}
            <div className="grid grid-cols-[13rem_1fr_1fr] items-center gap-6">
              <Label htmlFor="discount">Discount</Label>
              <div className="space-y-2">
                <Input
                  type="number"
                  id="discount"
                  {...register("discount", {
                    required: "This field is required",
                    validate: (value) =>
                      value <= getValues("regularPrice") ||
                      "Discount should be less than regular price",
                  })}
                />
                {errors?.discount && (
                  <p className="text-sm text-red-600">
                    {typeof errors?.discount?.message === "string" &&
                      errors.discount.message}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="grid grid-cols-[13rem_1fr_1fr] items-center gap-6">
              <Label htmlFor="description">Description</Label>

              <Textarea
                id="description"
                {...register("description", {
                  required: "This field is required",
                })}
              />
              {errors?.description && (
                <p className="mt-2 text-sm text-red-600">
                  {typeof errors?.description?.message === "string" &&
                    errors.description.message}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className="grid grid-cols-[13rem_1fr_1fr] items-center gap-6">
              <Label htmlFor="image">Cabin photo</Label>
              <div className="col-span-2 space-y-2">
                <div className="flex w-full items-center justify-center">
                  <Label
                    htmlFor="image"
                    className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <CloudUpload className="h-8 w-8 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>
                        &nbsp;or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (MAX. 4MB)
                      </p>
                    </div>
                    <Input
                      id="image"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      {...register("image", {
                        required: "This field is required",
                      })}
                    />
                  </Label>
                </div>
                {errors?.image && (
                  <p className="text-sm text-red-600">
                    {typeof errors?.image?.message === "string" &&
                      errors.image.message}
                  </p>
                )}
                {watch("image")?.[0]?.name && (
                  <p className="text-sm text-gray-600">
                    Selected: {watch("image")[0].name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="bg-background sticky bottom-0 pt-6">
            <Button
              variant="outline"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Add Cabin</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
