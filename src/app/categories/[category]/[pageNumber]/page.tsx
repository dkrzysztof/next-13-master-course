import type { Route } from "next";
import { getProductsByCategory } from "@/api/products";
import { PaginationList } from "@/ui/molecules/PaginationList";
import { ProductList } from "@/ui/organisms/ProductList";

type CategoryProductsPageProps = {
  params: { category: string, pageNumber: string };
};

export default async function CategoryProductsPage({
  params: { category },
}: CategoryProductsPageProps) {
  const categoryProducts = await getProductsByCategory(
    category
  );
  return (
    <section className="mx-auto max-w-2xl px-8 py-12 sm:px-6 sm:py-16 md:max-w-4xl lg:max-w-7xl">
      <ProductList products={categoryProducts} />
      <PaginationList rootPath={`/categories/${category}` as Route} />
    </section>
  );
}
