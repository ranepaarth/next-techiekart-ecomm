import React from "react";

interface FormSubmitButtonProps {
  isPending: boolean;
  displayLabel: string;
  loadingLabel: string;
}
const FormSubmitButton = ({
  isPending,
  displayLabel,
  loadingLabel,
}: FormSubmitButtonProps) => {
  return (
    <button
      type="submit"
      className="bg-amber-400 hover:bg-amber-600 p-2 rounded disabled:bg-amber-700 flex-1"
      disabled={isPending}
    >
      {!isPending ? displayLabel : loadingLabel}
    </button>
  );
};

export default FormSubmitButton;
