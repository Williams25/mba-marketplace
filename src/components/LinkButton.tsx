import { Link, LinkProps } from "react-router-dom";
import { Button, ButtonProps } from "./ui/button";

export interface ILinkButtonProps {
  link: LinkProps;
  button: ButtonProps;
  children: React.ReactNode;
}

export const LinkButton = ({ button, link, children }: ILinkButtonProps) => {
  return (
    <Link {...link}>
      <Button {...button}>{children}</Button>
    </Link>
  );
};
