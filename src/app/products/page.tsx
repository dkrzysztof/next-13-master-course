import { ProductList } from "@/ui/organisms/ProductList";
import { ProductItemType } from "@/ui/types";

const products: ProductItemType[] = [
  {
    id: "1",
    name: "Koszulka",
    category: "T-shirt",
    price: 99,
    coverImage:{
      alt: "koszulka",
      src: "/product_1.jpg"
    }
  },
	{
    id: "2",
    name: "Koszulka",
    category: "T-shirt",
    price: 99,
    coverImage:{
      alt: "koszulka",
      src: "/product_1.jpg"
    }
  },
	{
    id: "3",
    name: "Koszulka",
    category: "T-shirt",
    price: 99,
    coverImage:{
      alt: "koszulka",
      src: "/product_1.jpg"
    }
  },
	{
    id: "4",
    name: "Koszulka",
    category: "T-shirt",
    price: 99,
    coverImage:{
      alt: "koszulka",
      src: "/product_1.jpg"
    }
  },
];

export default function Products() {
  return (
    <section className="mx-auto max-w-2xl px-8 py-12 sm:px-6 sm:py-16 md:max-w-4xl lg:max-w-7xl">
      <ProductList products={products} />
    </section>
  );
}