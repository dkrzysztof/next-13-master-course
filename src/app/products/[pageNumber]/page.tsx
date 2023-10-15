import type { Route } from "next";
import {
  SortingProductsList,
  getProductsList,
} from "@/api/products";
import { PaginationList } from "@/ui/molecules/PaginationList";
import { ProductList } from "@/ui/organisms/ProductList";
import { PageHeader } from "@/ui/atoms/PageHeader";
import { ProductsSorter } from "./ProductsSorter";

const PAGE_SIZE = 8;

type ProductsCursorPageProps = {
  params: {
    pageNumber: number;
  };
  searchParams: {
    order?: SortingProductsList;
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
  searchParams: { order },
}: ProductsCursorPageProps) {
  const { data: products, count } = await getProductsList(
    PAGE_SIZE,
    pageNumber,
    order
  );

  // const collections = await getCollectionsList();

  return (
    <>
      {/* <section className="mx-auto max-w-2xl px-8 pt-12 pb-4 sm:px-6 sm:py-4 md:max-w-4xl lg:max-w-7xl">
        <PageHeader title="Newest collections" name={""} />
        <CollectionList collections={collections} />
      </section> */}
      <section className="mx-auto max-w-2xl px-8 pb-12 sm:px-6 sm:py-16 md:max-w-4xl lg:max-w-7xl">
        <PageHeader title="Our products" name={""} />
        <ProductsSorter pageNumber={pageNumber} currentSorting={order || ""} />
        <ProductList products={products} />
        <PaginationList
          rootPath={`/products` as Route}
          pageSize={PAGE_SIZE}
          totalItems={count}
          searchParamsString={order && `?order=${order}`}
        />
      </section>
    </>
  );
}
