import type { Route } from "next";
import { getProductsList } from "@/api/products";
import { PaginationList } from "@/ui/molecules/PaginationList";
import { ProductList } from "@/ui/organisms/ProductList";
import { getPages } from "@/utils";

type ProductsCursorPageProps = {
  params: {
    cursor: number;
    category: string;
  };
};

export const generateStaticParams = async () => {
  return getPages(20, 100).map((cursor) => {
    cursor;
  });
};

export default async function Products({
  params: { cursor, category },
}: ProductsCursorPageProps) {
  const products = await getProductsList(cursor);
  return (
    <section className="mx-auto max-w-2xl px-8 py-12 sm:px-6 sm:py-16 md:max-w-4xl lg:max-w-7xl">
      <ProductList products={products} />
      <PaginationList rootPath={`/products/${category}` as Route} />
    </section>
  );
}
