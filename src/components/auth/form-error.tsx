import React from "react";

const FormError = ({ error }: { error: string }) => {
  return (
    error && (
      <p className="bg-red-200 text-red-500 p-2 rounded border-red-600 border-2">
        {error}
      </p>
    )
  );
};

export default FormError;
