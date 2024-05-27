import Image from "next/image";
import Link from "next/link";
import React from "react";
import github from "../../public/images/social-github.svg";
import linkedin from "../../public/images/social-linkedin.svg";
import source from "../../public/images/social-source-code.svg";

const Socials = () => {
  return (
    <div className="flex items-center gap-4 px-8 py-4">
      <Link
        target="_blank"
        href={"https://github.com/ranepaarth"}
        className="hover:scale-125 transition-all duration-200 ease-in-out"
      >
        <Image src={github} width={40} height={40} alt="github" />
      </Link>
      <Link
        target="_blank"
        href={"https://github.com/ranepaarth/next-techiekart-ecomm"}
        className="hover:scale-125 transition-all duration-200 ease-in-out"
      >
        <Image src={source} width={40} height={40} alt="github" />
      </Link>
      <Link
        target="_blank"
        href={"https://linkedin.com/in/paarth-rane"}
        className="hover:scale-125 transition-all duration-200 ease-in-out"
      >
        <Image src={linkedin} width={40} height={40} alt="github" />
      </Link>
    </div>
  );
};

export default Socials;
