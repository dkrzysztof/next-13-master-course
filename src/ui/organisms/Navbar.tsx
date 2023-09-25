import { ActiveLink } from "../atoms/ActiveLink";

export const Navbar = () => {
  return (
    <nav className="w-full flex justify-center gap-x-8 mt-3">
      <ActiveLink href="/">Home</ActiveLink>
      <ActiveLink href="/products">Products</ActiveLink>
    </nav>
  );
};
