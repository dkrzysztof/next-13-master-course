import { getProductById } from "@/api/products";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { ProductListItem } from "@/ui/molecules/ProductListItem";
import { SuggestedProductsList } from "@/ui/organisms/SuggestedProductsList";
import { Suspense } from "react";

type SingleProductPageProps = {
  params: { productId: string };
};

export default async function SingleProductPage({
  params: { productId },
}: SingleProductPageProps) {
  const product = await getProductById(productId);
  return (
    <>
      <h1>{product.name}</h1>
      <article className="max-w-xs">
        <ProductCoverImage {...product.coverImage} />
        <ProductListItemDescription product={product} />
      </article>
      <aside>
        <Suspense fallback="Ładowanie...">
          <SuggestedProductsList />
        </Suspense>
      </aside>
    </>
  );
}
