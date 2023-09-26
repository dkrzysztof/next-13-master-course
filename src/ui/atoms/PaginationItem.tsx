"use client";
import clsx from "clsx";

type PaginationItemProps = {
  value: number;
  active: boolean;
  onClick: (cursor: number) => void;
};

export const PaginationItem = ({
  value,
  active,
  onClick,
}: PaginationItemProps) => {
  return (
    <div
      className={clsx(
        "px-3 py-1 mr-1 hover:text-white hover:bg-blue-600 rounded-lg transition-colors cursor-pointer",
        {
          "bg-blue-500 text-white": active,
        }
      )}
      onClick={() => onClick(value)}
    >
      {value}
    </div>
  );
};
