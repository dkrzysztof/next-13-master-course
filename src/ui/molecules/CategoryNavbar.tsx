import type { Route } from "next";
import { ActiveLink } from "../atoms/ActiveLink";
import type { CategoryItemType } from "../types";

type CategoryNavbarItemProps = {
  category: CategoryItemType;
  activeClassName: string;
  className: string;
};

export const CategoryNavbarItem = ({
  category: { name, slug },
  ...activeLinkProps
}: CategoryNavbarItemProps) => {
  return (
    <ActiveLink
      href={`/categories/${slug}/1` as Route}
      {...activeLinkProps}
    >
      {name}
    </ActiveLink>
  );
};
