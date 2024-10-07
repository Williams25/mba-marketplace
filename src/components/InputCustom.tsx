import { Label } from "./ui/label";
import { Input, InputProps } from "./ui/input";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IconCustom } from "./IconCustom";
import { ControlFieldError } from "./ControlFieldError";

export interface InputCustomProps extends Omit<InputProps, "id"> {
  label: string;
  id: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  error?: string;
  mask?: (value: string) => string;
}

export const InputCustom = ({
  label,
  id,
  startIcon,
  endIcon,
  className,
  error,
  mask,
  ...rest
}: InputCustomProps) => {
  const [isFocusInput, setIsFocusInput] = useState<boolean>(false);
  const methods = useFormContext();

  return (
    <Controller
      name={id}
      control={methods.control}
      render={({ field, formState, fieldState }) => (
        <div className={`w-full ${className}`}>
          <Label
            htmlFor={id}
            className={`block ${isFocusInput ? "text-orange-600" : ""}`}
          >
            <span
              className={`font-bold text-sm uppercase ${
                !isFocusInput ? "text-gray-400" : ""
              }`}
            >
              {label}
            </span>
            <div
              className={`flex gap-2 items-center border-b-2 ${
                isFocusInput ? "border-b-orange-600" : ""
              }`}
            >
              {startIcon && (
                <IconCustom isFocus={isFocusInput} icon={startIcon} />
              )}

              <Input
                {...rest}
                {...field}
                className="border-0 outline-none focus:outline-none focus:border-0 shadow-none focus-visible:ring-0 placeholder-gray-300 placeholder-opacity-75 placeholder:text-gray-300 placeholder:text-sm placeholder:-tracking-tight placeholder:font-semibold"
                value={
                  typeof mask === "function"
                    ? mask(field.value || "")
                    : field.value
                }
                onChange={(e) => {
                  if (typeof mask === "function") {
                    field.onChange(mask(e.target.value));
                    return;
                  }
                  field.onChange(e.target.value);
                }}
                onFocus={(e) => {
                  if (typeof rest.onFocus !== "undefined") rest.onFocus(e);
                  setIsFocusInput(true);
                }}
                id={id}
                onBlur={() => {
                  if (typeof field.onBlur !== "undefined") field.onBlur();
                  setIsFocusInput(false);
                }}
                disabled={
                  formState.isLoading ||
                  formState.isSubmitting ||
                  rest?.disabled
                }
              />

              {endIcon && <IconCustom isFocus={isFocusInput} icon={endIcon} />}
            </div>
          </Label>
          <ControlFieldError error={fieldState?.error} helpText={error} />
        </div>
      )}
    />
  );
};
