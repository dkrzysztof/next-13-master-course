import { Suspense } from "react";
import {
  getProductById,
  getProductVariants,
} from "@/api/products";
import { ProductImage } from "@/ui/atoms/ProductImage";
import { ProductDescription } from "@/ui/atoms/ProductDescription";
import {
  SuggestedProductsList,
  SuggestedProductsListSuspense,
} from "@/ui/organisms/SuggestedProductsList";
import { ProductVariants } from "@/ui/molecules/ProductVariants";
import { ReviewsOrganism } from "@/ui/organisms/ReviewsOrganism";
import { getProductReviews } from "@/api/reviews";
import { getCartFromCookies } from "@/api/carts";

export type SingleProductPageProps = {
  params: { productId: string };
};

export const generateMetadata = async ({
  params: { productId },
}: SingleProductPageProps) => {
  const product = await getProductById(productId);
  return {
    title: product.name,
    description: product.description,
    image: product.coverImage?.src,
  };
};

// export const generateStaticParams = async ():SingleProductPageProps["params"][] => {
//   return [
//     {
//       productId: "ckdu44mn40gxh010405uwgbtw",
//     },
//   ];
// };

export default async function SingleProductPage({
  params: { productId },
  ...props
}: SingleProductPageProps) {
  const product = await getProductById(productId);
  const productVariants = await getProductVariants(
    productId
  );

  const reviews = await getProductReviews(productId);

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
        <Suspense
          fallback={<SuggestedProductsListSuspense />}
        >
          <SuggestedProductsList
            categorySlug={product.categorySlug}
          />
        </Suspense>
      </aside>
      <aside className="mt-8 flex flex-row gap-20">
        <ReviewsOrganism
          productId={productId}
          reviews={reviews}
        />
      </aside>
    </section>
  );
}
