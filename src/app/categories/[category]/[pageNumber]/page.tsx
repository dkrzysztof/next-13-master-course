import type { Route } from "next";
import { getProductsByCategory } from "@/api/products";
import { PaginationList } from "@/ui/molecules/PaginationList";
import { ProductList } from "@/ui/organisms/ProductList";

const PAGE_SIZE = 8;

type CategoryProductsPageProps = {
  params: { category: string; pageNumber: string };
};

export default async function CategoryProductsPage({
  params: { category, pageNumber },
}: CategoryProductsPageProps) {
  const { data: categoryProducts, count } =
    await getProductsByCategory(
      +pageNumber,
      PAGE_SIZE,
      category
    );
  return (
    <section className="mx-auto max-w-2xl px-8 py-12 sm:px-6 sm:py-16 md:max-w-4xl lg:max-w-7xl">
      <ProductList products={categoryProducts} />
      <PaginationList
        totalItems={count}
        rootPath={`/categories/${category}` as Route}
        pageSize={PAGE_SIZE}
      />
    </section>
  );
}
