import type { Route } from "next";
import { getProductsBySearch } from "@/api/products";
import { PaginationList } from "@/ui/molecules/PaginationList";
import { ProductList } from "@/ui/organisms/ProductList";
import { PageHeader } from "@/ui/atoms/PageHeader";

const PAGE_SIZE = 8;

type SearchPageProps = {
  searchParams: {
    query: string;
  };
};

export default async function SearchPage({
  searchParams: { query },
}: SearchPageProps) {
  const { data: products, count } =
    await getProductsBySearch(query);
  const isEmpty = products.length === 0;
  return (
    <section className="mx-auto max-w-2xl px-8 py-4 sm:px-6 sm:py-4 md:max-w-4xl lg:max-w-7xl">
      <PageHeader title={query} name="SEARCHED PHRASE:"/>
      {isEmpty ? (
        <>Nothing was found :(</>
      ) : (
        <>
          <ProductList products={products} />
          <PaginationList
            rootPath={`/products` as Route}
            pageSize={PAGE_SIZE}
            totalItems={count}
          />
        </>
      )}
    </section>
  );
}
