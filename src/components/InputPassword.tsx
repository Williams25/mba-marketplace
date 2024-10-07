import { KeyRound, Eye, EyeOff } from "lucide-react";
import { InputCustom, InputCustomProps } from "./InputCustom";
import { useState } from "react";

export interface InputPasswordProps
  extends Omit<InputCustomProps, "type" | "startIcon" | "endIcon"> {}

export const InputPassword = ({ ...rest }: InputPasswordProps) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  return (
    <InputCustom
      {...rest}
      type={isShowPassword ? "text" : "password"}
      startIcon={<KeyRound />}
      endIcon={
        isShowPassword ? (
          <EyeOff
            onClick={() => setIsShowPassword(false)}
            className="cursor-pointer"
          />
        ) : (
          <Eye
            onClick={() => setIsShowPassword(true)}
            className="cursor-pointer"
          />
        )
      }
    />
  );
};
