import { Suspense } from "react";
import {
  getProductById, getProductVariants,
} from "@/api/products";
import { ProductImage } from "@/ui/atoms/ProductImage";
import { ProductDescription } from "@/ui/atoms/ProductDescription";
import { SuggestedProductsList } from "@/ui/organisms/SuggestedProductsList";
import { ProductVariants } from "@/ui/molecules/ProductVariants";

type SingleProductPageProps = {
  params: { productId: string };
};


export const generateMetadata = async ({
  params: { productId },
}: SingleProductPageProps) => {
  const product = await getProductById(productId);
  return {
    title: `${product.name} - Sklep internetowy`,
    description: product.description,
    image: product.coverImage?.src,
  };
};

export default async function SingleProductPage({
  params: { productId },
}: SingleProductPageProps) {
  const product = await getProductById(productId);
  const productVariants = await getProductVariants(productId);

  return (
    <section className="mx-auto max-w-2xl px-8 py-4 sm:px-6 sm:py-4 md:max-w-4xl lg:max-w-7xl">
      <article className="flex flex-row justify-between gap-6">
        <div className="float-left max-w-lg">
          <ProductDescription product={product} />
          <ProductVariants variants={productVariants} />
        </div>
        <div className="float-right max-w-lg">
          {product.coverImage && (
            <ProductImage {...product.coverImage} />
          )}
        </div>
      </article>
      <aside className="mt-12">
        <h3 className="text-slate-900">
          Mogą ci się spodobać:
        </h3>
        <Suspense fallback="Ładowanie...">
          <SuggestedProductsList categorySlug={product.categorySlug} />
        </Suspense>
      </aside>
    </section>
  );  
}
