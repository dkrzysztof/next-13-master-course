import NextImage from "next/image";
import type { Route } from "next";
import Link from "next/link";
import type { CollectionItemType } from "../types";

type CollectionItemProps = {
  collection: CollectionItemType;
};

export const CollectionItem = ({
  collection: { id, image, name, slug },
}: CollectionItemProps) => {
  return (
    <Link href={`/collections/${slug}` as Route}>
      <div
        className="text-slate-600 hover:-translate-y-2 transition-transform cursor-pointer"
        key={id}
      >
        <h2>{name}</h2>
        <div className="rounded-lg overflow-hidden">
          <NextImage
            height={400}
            width={520}
            src={image.url}
            alt={name}
          />
        </div>
      </div>
    </Link>
  );
};
