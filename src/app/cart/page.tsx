import { redirect } from "next/navigation";
import { formatMoney } from "@/utils";
import { ChangeQuantity } from "./IncrementProductQuantity";
import { RemoveButton } from "./RemoveButton";
import { getCartFromCookies } from "@/api/carts";
import { handleStripePaymentAction } from "./actions";

export default async function CartPage() {
  const cart = await getCartFromCookies();
  if (!cart) {
    redirect("/");
  }

  return (
    <div>
      <h1>Order #{cart.id} summary</h1>
      <table className="table-fixed">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.orderItems.map((item) => {
            if (!item.product) {
              return null;
            }
            return (
              <tr key={item.product.id}>
                <td>{item.product.name}</td>
                <td className="text-center">
                  <ChangeQuantity
                    itemId={item.id}
                    quantity={item.quantity}
                  />
                </td>
                <td>{formatMoney(item.product.price)}</td>
                <td className="px-4 py-2">
                  <RemoveButton itemId={item.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <form
        action={handleStripePaymentAction}
        className="ml-auto"
      >
        <button
          type="submit"
          className="w-full max-w-lg rounded-md border bg-slate-900 px-8 py-2 text-white shadow-sm transition-colors hover:bg-slate-850"
        >
          Pay
        </button>
      </form>
    </div>
  );
}
