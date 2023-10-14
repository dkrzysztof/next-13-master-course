import { ProductList } from "./ProductList";
import { getProductsByCategory } from "@/api/products";

const sleepForTime = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

type SuggestedProductsListProps = {
  categorySlug: string;
};

export const SuggestedProductsList = async ({
  categorySlug,
}: SuggestedProductsListProps) => {
  const { data: products } = await getProductsByCategory(
    1,
    4,
    categorySlug
  );
  await sleepForTime(5000);
  return (
    <div data-testid="related-products">
      <ProductList products={products} />
    </div>
  );
};
