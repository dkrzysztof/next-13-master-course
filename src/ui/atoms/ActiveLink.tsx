"use client";
import clsx from "clsx";
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ActiveLinkProps = {
  href: Route;
  exact?: boolean;
  className: string;
  activeClassName: string;
  children: React.ReactNode;
  ariaLabel?:string;
};

export const ActiveLink = ({
  children,
  href,
  exact,
  activeClassName,
  className,
  ariaLabel
}: ActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.includes(href);

  return (
    <Link
      href={href}
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
