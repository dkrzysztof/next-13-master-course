import { executeQraphql } from ".";
import type { CollectionItemType } from "@/ui/types";
import { CollectionsGetListDocument } from "@/gql/graphql";

export const getCollectionsList = async (): Promise<
  CollectionItemType[]
> => {
  const { collections } = await executeQraphql(
    CollectionsGetListDocument,
    {}
  );

  if (!collections) {
    return [];
  }

  return collections;
};
