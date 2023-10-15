"use client";
import type { Route } from "next";
import { ActiveLink } from "../atoms/ActiveLink";
import { getPages } from "@/utils";

type PaginationListProps = {
  rootPath: Route;
  pageSize: number;
  totalItems: number;
  searchParamsString?: string;
};

export const PaginationList = ({
  rootPath,
  pageSize,
  totalItems,
  searchParamsString,
}: PaginationListProps) => {
  const availablePages = getPages(pageSize, totalItems);
  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className="flex justify-end mr-3 my-1 text-slate-800"
    >
      {availablePages.map((page) => (
        <ActiveLink
          href={`${rootPath}/${page}` as Route}
          searchParams={searchParamsString}
          key={page}
          className="px-3 py-1 mr-1 hover:text-white hover:bg-blue-600 rounded-lg transition-colors cursor-pointer"
          activeClassName="bg-blue-500 text-white"
          ariaLabel={`Pagination, Go to ${page}`}
        >
          {page}
        </ActiveLink>
      ))}
    </nav>
  );
};
