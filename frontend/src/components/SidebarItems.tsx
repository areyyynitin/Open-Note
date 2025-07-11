import type { ReactElement } from "react";

export const SidebarItems = ({
  text,
  icon,
  onClick
}: {
  text: string;
  icon?: ReactElement;
  onClick: () => void;
}) => {
  return (
    <div className="flex text-gray-700 py-2 cursor-pointer" onClick={onClick}>
      {icon && <div className="pr-2">{icon}</div>}
      <div>{text}</div>
    </div>
  );
};
