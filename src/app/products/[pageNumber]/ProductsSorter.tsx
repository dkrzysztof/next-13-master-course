"use client"
import { SortingProductsList } from "@/api/products";
import { Route } from "next";
import { redirect, useRouter } from "next/navigation";

export type ProductsSorter = {
  currentSorting: SortingProductsList | "";
  pageNumber: number;
};

export const ProductsSorter = ({
  currentSorting,
  pageNumber,
}: ProductsSorter) => {
  const router = useRouter();
  const handleChangeSorting = (event: any) => {
    const value = event.target.value;
    const path = `/products/${pageNumber}${
      value ? `?order=${value}` : ""
    }`;
    router.push(path as Route);
    router.refresh();
  };

  return (
    <div className="mb-4">
      <label id="demo-simple-select-label">
        Sort products by
      </label>
      <select
        className="arrow-down-bg block w-48 cursor-pointer appearance-none rounded-md border-gray-600 px-4 py-2 text-sm font-light shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 lg:mt-1"
        value={currentSorting}
        onChange={handleChangeSorting}
      >
        <option
          value={"price-desc"}
          data-testid="sort-by-price"
        >
          Price Descending
        </option>
        <option
          value={"price-asc"}
          data-testid="sort-by-price"
        >
          Price Ascending
        </option>
        <option
          value="rating-desc"
          data-testid="sort-by-rating"
        >
          Rating (High to Low)
        </option>
        <option
          value="rating-asc"
          data-testid="sort-by-rating"
        >
          Rating (Low to High)
        </option>
      </select>
    </div>
  );
};
