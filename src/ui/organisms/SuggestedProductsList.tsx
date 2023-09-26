import { ProductList } from "./ProductList";
import { getProductsList } from "@/api/products";

const sleepForTime = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export const SuggestedProductsList = async () => {
  const products = await getProductsList();
  await sleepForTime(5000);
  return <ProductList products={products.slice(0,4)} />;
};
