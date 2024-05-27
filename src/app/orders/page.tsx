import { OrderItem } from "@/components/order-item";
import { prisma } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { stripe } from "@/lib/stripe";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute: "Your Orders",
  },
  robots: {
    follow: true,
    index: false,
  },
};

const OrdersPage = async () => {
  const user = await getUser();
  const orders = await prisma.orders.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const orderItems = await Promise.all(
    orders.map(async (order) => {
      return {
        id: order.id,
        orderItems: (
          await stripe.checkout.sessions.listLineItems(order.orderId)
        ).data,
        amountTotal: order.amountTotal,
        amountSubTotal: order.amountSubTotal,
        shippingRate: order.shippingAmount,
        images: order.images,
        createdAt: order.createdAt,
      };
    })
  );

  if (!user) {
    return <h3 className="text-2xl font-bold">Login to view your orders</h3>;
  }

  if (orders.length === 0) {
    return (
      <div className="flex gap-6 p-4 flex-col">
        <span className="text-2xl font-bold">You have no orders</span>
        <Link
          href={"/"}
          className="bg-blue-500 w-fit p-2 rounded hover:bg-blue-600"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-screen-xl mx-auto space-y-4">
      {user &&
        orderItems.map((orderItem) => (
          <OrderItem
            key={orderItem.id}
            amountTotal={orderItem.amountTotal}
            amountSubTotal={orderItem.amountSubTotal}
            shippingRate={orderItem.shippingRate}
            orderItems={orderItem.orderItems}
            images={orderItem.images}
            createdAt={orderItem.createdAt}
          />
        ))}
    </div>
  );
};

export default OrdersPage;
