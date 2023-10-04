import { CategoryListItem } from "../molecules/CategoryListItem";
import type { CategoryItemType } from "../types";

type CategoriesListProps = {
  categories: CategoryItemType[];
};

export const CategoriesList = ({
  categories,
}: CategoriesListProps) => {
  return (
    <div className="w-100 flex flex-direction-row gap-4">
      {categories.map((category) => (
        <CategoryListItem
          category={category}
          key={category.id}
        />
      ))}
    </div>
  );
};
