import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CartGetByIdDocument } from "@/gql/graphql";
import { formatMoney } from "@/utils";
import { executeQraphql } from "@/api";
import { ChangeQuantity } from "./IncrementProductQuantity";

export default async function CartPage() {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    redirect("/");
  }

  const { order: cart } = await executeQraphql({
    query: CartGetByIdDocument,
    variables: {
      id: cartId,
    },
  });

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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
