"use server";
import { verifyWebhookSignature } from "@hygraph/utils";

export async function validateHygraphRequest(
  signature: string | null,
  body: any
) {
  if (!process.env.HYPGRAPH_SECRET_KEY) {
    throw new Error("Missing HYPGRAPH_SECRET_KEY");
  }

  if (!signature) {
    throw new Error("Missing gcms-signature");
  }

  return verifyWebhookSignature({
    body,
    signature,
    secret: process.env.HYPGRAPH_SECRET_KEY,
  });
}
