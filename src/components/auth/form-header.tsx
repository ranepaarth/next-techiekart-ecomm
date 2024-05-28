import React from "react";

interface FormHeaderProps {
  header: string;
  subheader: string;
}
const FormHeader = ({ header, subheader }: FormHeaderProps) => {
  return (
    <header className="text-center">
      <h3 className="text-3xl font-semibold">{header}</h3>
      <p>{subheader}</p>
    </header>
  );
};

export default FormHeader;
