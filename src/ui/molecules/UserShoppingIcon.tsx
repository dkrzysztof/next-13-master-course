import { ShoppingCart } from "lucide-react";
import {
  ActiveLink,
  ActiveLinkProps,
} from "../atoms/ActiveLink";

type UserCartIconProps = {
  activeLinkProps: Pick<
    ActiveLinkProps,
    "activeClassName" | "className"
  >;
  quantity: number;
};

export async function UserCartIcon({
  activeLinkProps,
  quantity,
}: UserCartIconProps) {
  return (
    <ActiveLink href={"/cart"} {...activeLinkProps}>
      <div className="flex w-10 justify-between align-bottom">
        <ShoppingCart /> {quantity}
      </div>
    </ActiveLink>
  );
}
