import { ImageResponse } from "next/server";
import { SingleProductPageProps } from "./page";
import { getProductById } from "@/api/products";

export const runtime = "edge";

export const alt = "next13 masters sklep";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function og({
  params: { productId },
}: SingleProductPageProps) {
  const product = await getProductById(productId);
  return new ImageResponse(
    (
      <div tw="w-full h-full flex flex-row text-black items-center justify-around">
        <div
          style={{ display: "flex", maxWidth: "400px" }}
          tw="w-full flex flex-col"
        >
          <p tw="font-extralight italic text-gray-500 text-sm uppercase tracking-widest ml-1 mb-0">{product.category}</p>
          <h1 tw="font-black uppercase m-0 p-0 text-5xl">
            {product.name}
          </h1>
          <div tw="max-w-40 mb-3 border-b-blue-600 border-4"></div>
          <p tw="text-slate-900 mb-8">{product.description}</p>
          <p tw="font-extralight italic text-blue-500 text-sm uppercase tracking-widest">Clothees Shop ® 2023</p>
        </div>
        <div
          style={{ display: "flex", maxWidth: "500px" }}
          tw="w-full max-w-xs"
        >
          <img
            src={product.coverImage?.src || ""}
            alt={product.coverImage?.alt || "product-image"}
          />
        </div>
      </div>
    ),
    size
  );
}
