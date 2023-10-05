import type { Route } from "next";
import { getProductsList } from "@/api/products";
import { PaginationList } from "@/ui/molecules/PaginationList";
import { ProductList } from "@/ui/organisms/ProductList";

const PAGE_SIZE = 8;

type ProductsCursorPageProps = {
  params: {
    pageNumber: number;
  };
};

export const generateStaticParams = async () => {
  return [
    {
      pageNumber: "1",
    },
    {
      pageNumber: "2",
    },
  ];
};

export default async function Products({
  params: { pageNumber },
}: ProductsCursorPageProps) {
  const { data: products, count } = await getProductsList(
    PAGE_SIZE,
    pageNumber
  );

  return (
    <section className="mx-auto max-w-2xl px-8 py-12 sm:px-6 sm:py-16 md:max-w-4xl lg:max-w-7xl">
      <ProductList products={products} />
      <PaginationList
        rootPath={`/products` as Route}
        pageSize={PAGE_SIZE}
        totalItems={count}
      />
    </section>
  );
}
