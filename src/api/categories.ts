import { notFound } from "next/navigation";
import { executeQraphql } from ".";
import type { CategoryItemType } from "@/ui/types";
import {
  GetCategoriesListDocument,
  GetCategoryBySlugDocument,
} from "@/gql/graphql";

export const getCategoriesList = async (): Promise<
  CategoryItemType[]
> => {
  const { categories } = await executeQraphql(
    GetCategoriesListDocument,
    {}
  );

  return categories;
};

export const getCategoryBySlug = async (
  slug: string
): Promise<CategoryItemType> => {
  const {
    categories: [category],
  } = await executeQraphql(GetCategoryBySlugDocument, {
    slug,
  });

  if (!category) {
    notFound();
  }

  return category;
};
