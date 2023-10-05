"use client";

import { useRouter } from 'next/navigation'
import { SearchBar } from "./SearchBar";

type SearchProductsProps = {
  className?: string;
};

export const SearchProducts = ({
  className,
}: SearchProductsProps) => {
  const router = useRouter()
  const handleSearchProducts = async (value: string) => {
    if (value) {
      router.push(`/search?query=${value}`)
      return;
    }
    router.push(`/products`)
  };

  return (
    <SearchBar
      className={className}
      onSearch={handleSearchProducts}
    />
  );
};
