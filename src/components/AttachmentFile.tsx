import { Controller, useFormContext } from "react-hook-form";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";
import { ImageUp } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { ControlFieldError } from "./ControlFieldError";

export interface IAttachmentFileProps {
  id: string;
  className?: string;
  classNameLabel?: string;
  error?: string;
}

export const AttachmentFile = ({
  id,
  className = "",
  classNameLabel = "",
  error
}: IAttachmentFileProps) => {
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isUploadingFile, setIsUploadingFile] = useState<boolean>(false);
  const methods = useFormContext();

  const handleSaveAvatar = async (
    files: FileList | null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (...event: any[]) => void
  ) => {
    setIsUploadingFile(true);
    let currentFileURL: string | null = null;
    await new Promise((resolve) => setInterval(resolve, 2000));
    const currentFile = files?.[0];
    if (currentFile) {
      currentFileURL = URL.createObjectURL(currentFile);
    }
    setFilePreview(currentFileURL);
    onChange(currentFile);
    setIsUploadingFile(false);
  };

  useEffect(() => {
    setFilePreview(null);
  }, [methods.formState.isSubmitSuccessful]);

  return (
    <Controller
      control={methods.control}
      name={id}
      render={({ field, fieldState }) => {
        return (
          <div className={className}>
            <Label
              htmlFor={id}
              className={`max-w-32 min-w-32 max-h-32 min-h-32 flex rounded-md justify-center items-center bg-[#F5EAEA] overflow-hidden cursor-pointer ${classNameLabel}`}
            >
              <input
                type="file"
                id={id}
                accept="image/*"
                onChange={(e) => {
                  handleSaveAvatar(e.target.files, field.onChange);
                }}
                className="hidden"
              />

              {!filePreview && !isUploadingFile && (
                <ImageUp className="w-8 h-8 text-orange-500" />
              )}

              {filePreview && !isUploadingFile && (
                <img
                  src={filePreview || ""}
                  className="object-cover w-full h-full"
                />
              )}

              {isUploadingFile && (
                <Skeleton className="min-w-32 min-h-32 bg-gray-300" />
              )}
            </Label>

            <ControlFieldError error={fieldState?.error} helpText={error} />
          </div>
        );
      }}
    />
  );
};
