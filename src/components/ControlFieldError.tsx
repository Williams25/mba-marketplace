import { CircleAlert } from "lucide-react";
import { FieldError } from "react-hook-form";

export interface ControlFieldErrorProps {
  error?: FieldError | undefined;
  helpText?: string;
}

export const ControlFieldError: React.FC<ControlFieldErrorProps> = ({
  error,
  helpText,
}) =>
  !!error || helpText ? (
    <span className="text-red-700 font-semibold text-sm text-start flex items-center gap-2 mt-2">
      <CircleAlert /> {error ? error.message : helpText ? helpText : ""}
    </span>
  ) : (
    <></>
  );
