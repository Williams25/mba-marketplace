import { Link, LinkProps, useLocation } from "react-router-dom";

export interface INavLinkProps extends LinkProps {}

export const NavLink = ({ ...rest }: INavLinkProps) => {
  const { pathname } = useLocation();
  return (
    <Link
      data-current={pathname === rest.to}
      className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-400 hover:text-foreground data-[current=true]:text-orange-500 data-[current=true]:bg-orange-500 data-[current=true]:bg-opacity-15"
      {...rest}
    />
  );
};
