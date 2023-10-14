"use client";
// @ts-expect-error
// eslint-disable-next-line
import { experimental_useOptimistic as useOptimistic } from "react";
import { changeItemQuantity } from "./actions";

export function ChangeQuantity({
  itemId,
  quantity,
}: {
  itemId: string;
  quantity: number;
}) {
  const [optimisticQuantity, setOptimisticQuantity] =
    useOptimistic(
      quantity,
      //@ts-expect-error
      (_state, newQuantity: number) => newQuantity
    );

  return (
    <form className="flex">
      <button
        className="h-6 w-6 border"
        type="submit"
        data-testid="increment"
        formAction={async () => {
          setOptimisticQuantity(optimisticQuantity - 1);
          await changeItemQuantity(
            itemId,
            optimisticQuantity - 1
          );
        }}
      >
        -
      </button>
      <span className="w-8 text-center">
        {optimisticQuantity}
      </span>
      <button
        className="h-6 w-6 border"
        type="submit"
        data-testid="increment"
        formAction={async () => {
          setOptimisticQuantity(optimisticQuantity + 1);
          await changeItemQuantity(
            itemId,
            optimisticQuantity + 1
          );
        }}
      >
        +
      </button>
    </form>
  );
}
