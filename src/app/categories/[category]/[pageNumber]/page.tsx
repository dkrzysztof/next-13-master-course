import type { Route } from "next";
import { getProductsByCategory } from "@/api/products";
import { PaginationList } from "@/ui/molecules/PaginationList";
import { ProductList } from "@/ui/organisms/ProductList";
import {
  getCategoryBySlug,
} from "@/api/categories";

const PAGE_SIZE = 4;

export const generateMetadata = async ({
  params: { category: categorySlug },
}: CategoryProductsPageProps) => {
  const { name } = await getCategoryBySlug(
    categorySlug
  );
  return {
    title: name,
  };
};

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
    <>
      <ProductList products={categoryProducts} />
      <PaginationList
        totalItems={count}
        rootPath={`/categories/${category}` as Route}
        pageSize={PAGE_SIZE}
      />
    </>
  );
}
