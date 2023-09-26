"use client";
import type { Route } from "next";
import { ActiveLink } from "../atoms/ActiveLink";
import { getPages } from "@/utils";

type PaginationListProps = {
  rootPath: Route;
};

export const PaginationList = ({ rootPath }: PaginationListProps) => {
  const availablePages = getPages(20, 100);

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className="flex justify-end mr-3 my-1 text-slate-800"
    >
      {availablePages.map((page) => (
        <ActiveLink
          exact
          href={`${rootPath}/${page}` as Route}
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
