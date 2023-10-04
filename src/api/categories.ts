import { executeQraphql } from ".";
import { CategoriesListDocument } from "@/gql/graphql";
import type { CategoryItemType } from "@/ui/types";

export const getCategoriesList = async (): Promise<
  CategoryItemType[]
> => {
  const { categories } = await executeQraphql(
    CategoriesListDocument,
    {}
  );

  return categories;
};
