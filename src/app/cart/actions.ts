"use server";

import { executeQraphql } from "@/api";
import { CartSetProductQuantityDocument } from "@/gql/graphql";

export const changeItemQuantity = (
  itemId: string,
  quantity: number
) => {
  return executeQraphql({
    query: CartSetProductQuantityDocument,
    variables: {
      itemId,
      quantity,
    },
  });
};
