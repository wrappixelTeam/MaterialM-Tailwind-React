

import Google from "/src/assets/images/svgs/google-icon.svg";
import FB from "/src/assets/images/svgs/facebook-icon.svg";
import { HR } from "flowbite-react";
import { Link } from "react-router-dom";
import React from "react";

interface MyAppProps {
    title?:string;
  }

const SocialButtons: React.FC<MyAppProps> = ({ title }) => {
  return (
    <>
      <div className="flex justify-between gap-8 my-6 ">
        <Link
          to={"/"}
          className="px-4 py-2.5 border border-ld flex gap-2 items-enter w-full rounded-md text-center justify-center text-dark dark:text-white text-primary-ld"
        >
          <img src={Google} alt="google" height={18} width={18} /> Google
        </Link>
        <Link
          to={"/"}
          className="px-4 py-2.5 border border-ld flex gap-2 items-enter w-full rounded-md text-center justify-center text-dark dark:text-white text-primary-ld"
        >
          <img src={FB} alt="google" height={18} width={18} />
          Facebook
        </Link>
      </div>
      {/* Divider */}
      <HR.Text text={`${title}`} className="!border-t !border-ld !bg-transparent" />
    </>
  );
};

export default SocialButtons;
