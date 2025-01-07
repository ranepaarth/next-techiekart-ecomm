import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { cart, email, userId } = await req.json();

    const lineItemsCart = cart.map((item: CartProductType) => ({
      price_data: {
        currency: "inr",
        unit_amount: Math.round((item.price * 100) + Number.EPSILON),
        product_data: {
          name: item.title,
          description: item.description,
          images: [item.image],
        },
      },
      quantity: item.quantity,
    }));

    const shippingRate = await stripe.shippingRates.create({
      display_name: "Ground shipping",
      type: "fixed_amount",
      fixed_amount: {
        amount: 150,
        currency: "inr",
      },
    });

    // Create Checkout session from body params
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["IN", "US"],
      },
      shipping_options: [
        {
          shipping_rate: shippingRate.id,
        },
      ],
      line_items: lineItemsCart,
      mode: "payment",
      success_url: `${process.env.CLIENT}/success`,
      cancel_url: `${process.env.CLIENT}/cart`,
      metadata: {
        userId,
        email,
        images: JSON.stringify(cart.map((item: CartProductType) => item.image)),
      },
    });

    console.log({cart,email,userId})

    return NextResponse.json({ id: session.id });
  } catch (e: any) {
    switch (e.type) {
      case "StripeCardError":
        console.log(`A payment error occurred: ${e.message}`);
        break;
      case "StripeInvalidRequestError":
        console.log("An invalid request occurred.");
        break;
      default:
        console.log("Another problem occurred, maybe unrelated to Stripe.");
        break;
    }
    console.log(e);
    return NextResponse.json(e);
  }
}
