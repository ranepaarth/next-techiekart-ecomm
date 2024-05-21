import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: Request, res: NextApiResponse) {
  const sig = req.headers.get("stripe-signature");
  const buf = await req.text();

  console.log("----------------INCOMING REQUEST------------------------");
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig!, webhookSecret);
  } catch (error: any) {
    console.log(`❌ Error message: ${error.message}`);
    res.status(400).send(`Webhook Error: ${error.message}`);
    return;
  }
  if (event.type === "checkout.session.completed") {
    console.log("✅ Success:", event.id);
    const session = event.data.object;

    if (session.metadata) {
      //** Create an order
      //  Create an order with the foreign key of the user id. So that all the orders of the user whose id matches the user id inside the orders table will be returned
      await prisma.orders
        .create({
          data: {
            orderId: session.id,
            amountSubTotal: session.amount_subtotal! / 100,
            amountTotal: session.amount_total! / 100,
            shippingAmount: session.total_details?.amount_shipping! / 100,
            userId: session.metadata.userId,
            images: JSON.parse(session.metadata.images),
          },
        })
        .then((data) => console.log("✅ Success:", data.id));
    }
  }

  return NextResponse.json({ message: "✅ Webhook request success!!" });
}

