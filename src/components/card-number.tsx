"use client";
import React, { useState } from "react";

const CardNumber = () => {
  const [cardNumber, setCardNumber] = useState("4000 0035 6000 0008");
  const [success, setSuccess] = useState(false);
  const handleClick = () => {
    setSuccess(true);
    navigator.clipboard.writeText(cardNumber);
  };
  return (
    <button
      className={`${
        success
          ? "text-green-500 bg-green-100 border-green-500 hover:bg-green-200"
          : "text-red-500 bg-red-100 border-red-500 hover:bg-red-200"
      }  p-2 border-2  rounded  font-medium`}
      onClick={handleClick}
    >
      Click to copy test card
    </button>
  );
};

export default CardNumber;
