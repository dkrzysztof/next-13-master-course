'use client'
import clsx from "clsx";
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ActiveLinkProps = {
  href: Route;
  className?: string;
  activeClassName?: string;
  children: React.ReactNode;
};

export const ActiveLink = ({
  children,
  href,
  activeClassName,
  className,
}: ActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(`text-blue-400 hover:text-blue-600`, {
        underline: isActive,
      })}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
};
