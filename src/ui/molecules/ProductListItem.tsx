import Link from "next/link";
import { ProductCoverImage } from "../atoms/ProductCoverImage";
import { ProductListItemDescription } from "../atoms/ProductListItemDescription";
import { ProductItemType } from "../types";

type ProductListItemProps = {
  product: ProductItemType;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <li>
      <Link href={`/product/${product.id}`}>
        <article>
          <ProductCoverImage
            src={product.coverImage.src}
            alt={product.coverImage.alt}
          />
          <ProductListItemDescription product={product} />
        </article>
      </Link>
    </li>
  );
};
