import React from "react";

export interface IIconCustomProps {
  icon: React.ReactNode;
  isFocus?: boolean;
}

export const IconCustom = ({ icon, isFocus }: IIconCustomProps) => {
  return <div className={!isFocus ? "text-gray-300" : ""}>{icon}</div>;
};
