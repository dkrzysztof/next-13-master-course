import {
  AddReviewToProductDocument,
  GetReviewsByProductIdDocument,
  PublishReviewDocument,
} from "@/gql/graphql";
import { executeQraphql } from ".";

export type AddReviewType = {
  name: string;
  content: string;
  headline: string;
  email: string;
  rating: number;
  productId: string;
};

export const addReviewToProduct = async (
  data: AddReviewType
): Promise<{ id: string }> => {
  const response = await executeQraphql({
    query: AddReviewToProductDocument,
    variables: data,
  });

  if (!response.createReview) {
    throw new Error("createReview is not defined");
  }

  await publishReview(response.createReview.id);

  return { id: response.createReview.id };
};

export const getProductReviews = async (
  productId: string
) => {
  const { reviews } = await executeQraphql({
    query: GetReviewsByProductIdDocument,
    variables: {
      productId,
    },
    cache: "no-cache",
  });

  return reviews;
};

export const publishReview = async (reviewId: string) => {
  const response = await executeQraphql({
    query: PublishReviewDocument,
    variables: { id: reviewId },
  });

  if(!response.publishReview){
    throw new Error(`Error during publishing review: ${reviewId}`)
  }

  return response.publishReview.id
};
