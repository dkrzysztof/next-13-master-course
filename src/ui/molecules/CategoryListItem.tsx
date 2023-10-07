import type { Route } from "next";
import { ActiveLink } from "../atoms/ActiveLink";
import type { CategoryItemType } from "../types";

type CategoryListItemProps = {
  category: CategoryItemType;
};

export const CategoryListItem = ({
  category: { name, slug },
}: CategoryListItemProps) => {
  return (
    <li>
      <ActiveLink
        href={`/categories/${slug}` as Route}
        className={""}
        activeClassName={""}
      >
        <div className="py-6 px-12 text-slate-800 rounded-lg border-gray-400 border-2">
          {name}
        </div>
      </ActiveLink>
    </li>
  );
};
