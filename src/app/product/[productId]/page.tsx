import { Suspense } from "react";
import { getProductById, getProductsList } from "@/api/products";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import ProductDescription from "@/ui/atoms/ProductDescription";
import { SuggestedProductsList } from "@/ui/organisms/SuggestedProductsList";

type SingleProductPageProps = {
  params: { productId: string };
};

export const generateStaticProps = async () => {
  const products = await getProductsList();
  return products.map(({ id }) => ({ productId: id }));
};

export const generateMetadata = async ({
  params: { productId },
}: SingleProductPageProps) => {
  const product = await getProductById(productId);
  return {
    title: `${product.name} - Sklep internetowy`,
    description: product.description,
    image: product.coverImage.src,
  };
};

export default async function SingleProductPage({
  params: { productId },
}: SingleProductPageProps) {
  const product = await getProductById(productId);
  return (
    <>
      <article className="flex flex-row justify-around gap-6">
        <div className="max-w-sm">
          <ProductDescription product={product} />
        </div>
        <div className="max-w-md">
          <ProductCoverImage {...product.coverImage} />
        </div>
      </article>
      <aside className="mt-12">
        <h3 className="text-slate-900">Mogą ci się spodobać:</h3>
        <Suspense fallback="Ładowanie...">
          <SuggestedProductsList />
        </Suspense>
      </aside>
    </>
  );
}
