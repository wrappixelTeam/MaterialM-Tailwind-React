
import { twMerge } from "tailwind-merge";
import { HiOutlineChevronDown } from "react-icons/hi";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const CustomCollapse: React.FC<{
    label: string;
    open: boolean;
    children:any;
    onClick: () => void;
    icon: string;
    className?: string;
  }> = ({ label, open, onClick, icon, children, className }) => {
    return (
      <div className={twMerge("transition-all duration-300")}>
        <div
          className={twMerge("flex cursor-pointer mb-1 items-center justify-between rounded-full px-4 py-[11px] gap-3 text-[15px] leading-[normal] font-normal text-link  hover:text-primary dark:text-white hover:bg-lightprimary dark:hover:bg-lightprimary dark:hover:text-primary",className)}
          onClick={onClick}
        >
          <div className="flex items-center gap-3">
          <Icon icon={icon} height={18} />
            <span className="truncate max-w-28"  >{label}</span>
          </div>
          <HiOutlineChevronDown
            className={twMerge("transform transition-transform", open ? "rotate-180" : "rotate-0")}
          />
        </div>
        <div
          className={twMerge(
            "overflow-hidden transition-all duration-300",
            open ? "max-h-screen" : "max-h-0"
          )}
        >
          {children}
        </div>
      </div>
    );
  };

  export {CustomCollapse}