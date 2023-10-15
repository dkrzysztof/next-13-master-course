"use client";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export type ActiveLinkProps = {
  href: Route;
  exact?: boolean;
  className: string;
  activeClassName: string;
  children: React.ReactNode;
  ariaLabel?:string;
  searchParams?: string;
};

export const ActiveLink = ({
  children,
  href,
  exact,
  activeClassName,
  className,
  ariaLabel,
  searchParams
}: ActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.includes(href);
  const _href = searchParams ? href + searchParams : href;
  return (
    <Link
      href={_href as Route}
      className={clsx(className, {
        [activeClassName]: isActive,
      })}
      aria-current={isActive ? "page" : undefined}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
};
