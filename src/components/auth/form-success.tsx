import React from "react";

const FormSuccess = ({ success }: { success: string }) => {
  return (
    success && (
      <p className="bg-emerald-200 text-emerald-500 p-2 rounded border-emerald-600 border-2">
        {success}
      </p>
    )
  );
};

export default FormSuccess;
