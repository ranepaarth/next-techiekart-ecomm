import React from "react";

export const FormDivider = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <hr className="w-full" />
      <p className="text-nowrap">{label}</p>
      <hr className="w-full" />
    </div>
  );
};
