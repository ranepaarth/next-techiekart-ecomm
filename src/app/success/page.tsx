import { Metadata } from "next";
import Link from "next/link";
import React from "react";

// export const metadata: Metadata = {
//   title: "Order Success",
// };

const SuccessPage = () => {
  return (
    <div>
      <span>Thankyou for shopping from Anazom!!</span>
      <p>To see all your orders, please click the below link</p>
      <Link href={"/orders"}>My Orders</Link>
    </div>
  );
};

export default SuccessPage;
