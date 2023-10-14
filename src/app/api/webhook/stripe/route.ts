/// <reference types="stripe-event-types" />

import { NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("Missing STRIPE_WEBHOOK_SECRET");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-08-16",
    typescript: true,
  });

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return new Response("No signature", { status: 401 });
  }

  const event = stripe.webhooks.constructEvent(
    await request.text(),
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  ) as Stripe.DiscriminatedEvent;

  switch (event.type) {
    case "checkout.session.completed": {
      console.log(event.data.object.metadata)
      event.data.object.metadata?.cartId
    }
    case "checkout.session.async_payment_succeeded":
    case "checkout.session.async_payment_failed":
    case "checkout.session.expired":
  }

  return new Response(null, { status: 204 });
}
