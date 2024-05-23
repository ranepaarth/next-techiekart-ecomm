"use client";

import React, { useEffect, useState } from "react";

const FormatPrice = ({ price = 0 }: { price: number }) => {
  const [formatPrice, setFormatPrice] = useState<string>();

  useEffect(() => {
    setFormatPrice(
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
      }).format(price)
    );
  }, [price]);

  return <p>{formatPrice}</p>;
};

export default FormatPrice;
