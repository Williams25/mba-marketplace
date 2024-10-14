import { ReactNode, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IconCustom } from "./IconCustom";
import { ControlFieldError } from "./ControlFieldError";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";

export interface ISelectCustomProps {
  id: string;
  className?: string;
  label?: string;
  placeholder?: string;
  error?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  options?: { label: string; value: string }[];
  disabled?: boolean;
}

export const SelectCustom = ({
  id,
  className,
  label,
  error,
  startIcon,
  placeholder,
  options,
  disabled
}: ISelectCustomProps) => {
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
            {label && (
              <span
                className={`font-bold text-sm uppercase ${
                  !isFocusInput ? "text-gray-400" : ""
                }`}
              >
                {label}
              </span>
            )}
            <div
              className={`flex gap-2 items-center border-b-2 ${
                isFocusInput ? "border-b-orange-600" : ""
              }`}
            >
              {startIcon && (
                <IconCustom isFocus={isFocusInput} icon={startIcon} />
              )}

              <Select
                name={field.name}
                onValueChange={field.onChange}
                value={field.value}
                disabled={
                  field.disabled ||
                  formState.isLoading ||
                  formState.isSubmitting ||
                  disabled
                }
                onOpenChange={setIsFocusInput}
              >
                <SelectTrigger
                  className={`border-0 outline-none focus:outline-none focus:border-0 shadow-none focus:ring-offset-0 focus-visible:ring-0 focus:shadow-none ${field.value ? "text-gray-600" : "text-gray-300"} text-sm tracking-tight font-semibold`}
                  id={id}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Label>
          <ControlFieldError error={fieldState?.error} helpText={error} />
        </div>
      )}
    />
  );
};
