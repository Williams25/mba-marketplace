import { MoveRight } from "lucide-react";
import { LinkButton } from "./LinkButton";

export interface IFooterAuthProps {
  title: string;
  labelButton: string;
  link: string;
}

export const FooterAuth = ({ labelButton, title, link }: IFooterAuthProps) => {
  return (
    <div className="mt-auto w-full">
      <span className="text-gray-500 text-base font-medium">{title}</span>
      <LinkButton
        link={{
          to: link,
          className: "w-full"
        }}
        button={{
          type: "button",
          size: "lg",
          className:
            "mt-4 w-full flex items-center justify-between text-sm font-bold",
          variant: "outline-default"
        }}
      >
        {labelButton}
        <MoveRight />
      </LinkButton>
    </div>
  );
};
