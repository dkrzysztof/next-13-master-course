import { getProductsList } from "@/api/products";
import { ProductList } from "./ProductList";

const sleepForTime = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export const SuggestedProductsList = async () => {
  const products = await getProductsList();
  await sleepForTime(5000);
  return <ProductList products={products.slice(0,4)} />;
};
