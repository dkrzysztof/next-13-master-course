import { notFound } from "next/navigation";
import { executeQraphql } from ".";
import type { CollectionItemType } from "@/ui/types";
import {
  CollectionBySlugDocument,
  CollectionsGetListDocument,
} from "@/gql/graphql";
import { productFragmentToProductItem } from "@/utils";

export const getCollectionsList = async (): Promise<
  CollectionItemType[]
> => {
  const { collections } = await executeQraphql({
    query: CollectionsGetListDocument,
  });

  if (!collections) {
    return [];
  }

  return collections;
};

export const getCollectionBySlug = async (
  slug: string
): Promise<CollectionItemType> => {
  const {
    collections: [collection],
  } = await executeQraphql({
    query: CollectionBySlugDocument,
    variables: {
      slug,
    },
  });

  if (!collection) {
    notFound();
  }

  return {
    ...collection,
    slug,
    products: collection.products.map(
      productFragmentToProductItem
    ),
  };
};
