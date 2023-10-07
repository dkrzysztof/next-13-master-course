import type { CollectionItemType } from "../types";
import { CollectionItem } from "../molecules/CollectionItem";

type CollectionListProps = {
  collections: CollectionItemType[];
};

export const CollectionList = ({
  collections,
}: CollectionListProps) => {
  return (
    <ul className="flex gap-10">
      {collections.map((collection) => (
        <CollectionItem key={collection.id} collection={collection} /> 
      ))}
    </ul>
  );
};
