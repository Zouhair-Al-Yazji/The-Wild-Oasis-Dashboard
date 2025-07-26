import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CloudUpload } from "lucide-react";
import type { Cabin } from "./useCabins";

type ImageUploadProps = {
  register: UseFormRegister<Cabin>;
  watch: UseFormWatch<Cabin>;
  isUpdateSession: boolean;
  cabinToUpdate?: Cabin;
  error?: string;
};

export default function ImageUpload({
  register,
  watch,
  isUpdateSession,
  cabinToUpdate,
  error,
}: ImageUploadProps) {
  return (
    <>
      {watch("image") instanceof FileList && watch("image").length > 0 && (
        <div className="border-border relative h-32 w-full overflow-hidden rounded-lg border">
          <img
            src={URL.createObjectURL(watch("image")[0] as File)}
            alt="Preview"
            className="h-full w-full object-cover"
            onLoad={(e) => {
              URL.revokeObjectURL((e.target as HTMLImageElement).src);
            }}
          />
        </div>
      )}
      {isUpdateSession &&
        typeof cabinToUpdate?.image === "string" &&
        (!(watch("image") instanceof FileList) || !watch("image")?.length) && (
          <div className="border-border relative h-32 w-full overflow-hidden rounded-lg border">
            <img
              src={cabinToUpdate.image}
              alt="Current cabin"
              className="h-full w-full object-cover"
            />
          </div>
        )}

      {/* Upload Button */}
      <div className="flex w-full items-center justify-center">
        <Label
          htmlFor="image"
          className="border-muted bg-muted hover:bg-accent flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <CloudUpload className="text-muted-foreground h-8 w-8" />
            <p className="text-muted-foreground mb-2 text-sm">
              <span className="font-semibold">Click to upload</span>
              &nbsp;or drag and drop
            </p>
            <p className="text-muted-foreground text-xs">
              SVG, PNG, JPG or GIF (MAX. 4MB)
            </p>
          </div>
          <Input
            id="image"
            type="file"
            className="hidden"
            accept="image/*"
            {...register("image", {
              required: isUpdateSession ? false : "This field is required",
            })}
          />
        </Label>
      </div>

      {error && <p className="text-destructive text-sm">{error}</p>}

      {watch("image") instanceof FileList && watch("image").length > 0 && (
        <p className="text-muted-foreground text-sm">
          Selected: {(watch("image") as FileList)[0].name}
        </p>
      )}
      {isUpdateSession &&
        typeof cabinToUpdate?.image === "string" &&
        (!(watch("image") instanceof FileList) || !watch("image")?.length) && (
          <p className="text-muted-foreground text-sm">
            Current image: {cabinToUpdate.image.split("/").pop()}
          </p>
        )}
    </>
  );
}
