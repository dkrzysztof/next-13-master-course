import { redirect } from "next/navigation";
import Stripe from "stripe";

const paymentStatusText: Record<
  Stripe.Checkout.Session.PaymentStatus,
  string
> = {
  no_payment_required: "No payment required",
  paid: "Paid",
  unpaid: "Unpaid",
};

type CartSuccessPageProps = {
  searchParams: {
    sessionId: string;
  };
};
export default async function CartSuccessPage({
  searchParams,
}: CartSuccessPageProps) {
  if (!searchParams.sessionId) {
    redirect("/");
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-08-16",
    typescript: true,
  });

  const session = await stripe.checkout.sessions.retrieve(
    searchParams.sessionId
  );

  return (
    <>
      <h1>Success!</h1>
      <p>
        Payment status:{" "}
        {paymentStatusText[session.payment_status]}
      </p>
    </>
  );
}
