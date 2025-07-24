import { CircleUserRoundIcon, XIcon } from "lucide-react";

import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function AvatarImageUploader({
  initialAvatar,
  onFileChange,
}: {
  initialAvatar: string;
  onFileChange: (file: File | null) => void;
}) {
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      maxFiles: 1,
      maxSize: 5 * 1024 * 1024,
      accept: "image/*",
      initialFiles: initialAvatar
        ? [
            {
              id: "initial-avatar",
              name: "avatar",
              size: 0,
              type: "image/*",
              url: initialAvatar,
            },
          ]
        : [],
    });

  const previewUrl = files[0]?.preview || null;
  const fileName = files[0]?.file.name || null;

  useEffect(() => {
    if (files.length > 0) {
      if (files[0].file instanceof File) {
        onFileChange?.(files[0].file);
      }
    } else {
      onFileChange?.(null);
    }
  }, [files, onFileChange]);

  return (
    <div className="flex flex-col gap-2">
      <div className="inline-flex">
        <Button
          variant="outline"
          className="size-16 overflow-hidden p-0 shadow-none"
          onClick={openFileDialog}
          aria-label={previewUrl ? "Change image" : "Upload image"}
          type="button"
        >
          {previewUrl ? (
            <img
              className="size-full object-cover"
              src={previewUrl}
              alt="Preview of uploaded image"
              width={64}
              height={64}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div aria-hidden="true">
              <CircleUserRoundIcon className="size-4 opacity-60" />
            </div>
          )}
        </Button>
        {previewUrl && (
          <Button
            onClick={() => removeFile(files[0]?.id)}
            size="icon"
            className="border-background focus-visible:border-background relative -top-2 right-2 size-6 rounded-full border-2 shadow-none"
            aria-label="Remove image"
          >
            <XIcon className="size-3.5" />
          </Button>
        )}
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
          tabIndex={-1}
        />
      </div>
      {fileName && <p className="text-muted-foreground text-xs">{fileName}</p>}
    </div>
  );
}
