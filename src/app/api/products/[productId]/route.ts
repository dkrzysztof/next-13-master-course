import { executeQraphql } from "@/api";
import { updateProductAverageRating } from "@/api/products";
import { getProductReviewsRatings } from "@/api/reviews";
import { avatarGroupClasses } from "@mui/material";
import { type NextRequest } from "next/server";

export async function POST(
  request: NextRequest
): Promise<Response> {
  const [_, productId] = request.nextUrl.pathname.split(
    "/api/products/"
  );

  if (!productId) {
    return new Response(null, { status: 400 });
  }

  const reviews = await getProductReviewsRatings(productId);

  if (!reviews || reviews.length === 0) {
    return new Response("Nothing to calculate", {
      status: 400,
    });
  }

  const ratingsSum = reviews.reduce(
    (acc, { rating }) => acc + rating,
    0
  );

  const averageRating = ratingsSum / reviews.length;

  await updateProductAverageRating(
    productId,
    averageRating ?? 0
  );

  console.log(
    `Calculated new rating for ${productId}. New rating equals: ${averageRating}`
  );

  return new Response(productId, { status: 200 });
}
