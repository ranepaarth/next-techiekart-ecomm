import Image from "next/image";
import Stripe from "stripe";

type OrderItemProps = {
  amountTotal: number;
  amountSubTotal: number;
  shippingRate: number;
  orderItems: Stripe.LineItem[];
  images: string[];
  createdAt: Date;
};

export const OrderItem = ({
  amountTotal,
  amountSubTotal,
  shippingRate,
  orderItems,
  images,
  createdAt,
}: OrderItemProps) => {
  // console.log(orderItems);

  return (
    <div className="flex flex-col items-center space-x-4 border p-4 space-y-4">
      <div className="flex justify-between w-full">
        <span>Order Total: ₹{amountTotal}</span>
        <span>Order Sub-Total: ₹{amountSubTotal}</span>
        <span>Shipping Charges: ₹{shippingRate}</span>
      </div>
      <span>Total Order Items:{orderItems.length}</span>
      <div className="flex items-center space-x-4 bg-white p-5 rounded">
        {images.map((image, idx) => (
          <Image
            src={image}
            alt="image"
            key={idx}
            width={1020}
            height={720}
            className="object-cover w-20 md:w-32 grow"
          />
        ))}
      </div>
      <div>
        {new Intl.DateTimeFormat("en-IN", {
          dateStyle: "medium",
        }).format(createdAt)}
      </div>
    </div>
  );
};
