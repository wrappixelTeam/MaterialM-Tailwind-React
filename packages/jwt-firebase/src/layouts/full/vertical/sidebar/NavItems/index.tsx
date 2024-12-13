import React, { useContext } from "react";

import { ChildItem } from "../Sidebaritems";
import { Sidebar } from "flowbite-react";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DashboardContext } from "@src/context/DashboardContext/DashboardContext";



interface NavItemsProps {
  item: ChildItem;
}
const NavItems: React.FC<NavItemsProps> = ({ item }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const { t } = useTranslation();

  const {setIsMobileSidebarOpen}  = useContext(DashboardContext);
  return (
    <>
      <Sidebar.Item
        to={item.url}
        as={Link}
        onClick = {() => setIsMobileSidebarOpen(false)}
        className={`${
          item.url == pathname
            ? "text-white bg-primary rounded-xl  hover:text-white hover:bg-primary dark:hover:text-white shadow-btnshdw active"
            : "text-link bg-transparent group/link "
        } `}
      >
        <span className="flex gap-3 align-center items-center">
          {item.icon ? (
            <Icon icon={item.icon} className={`${item.color}`} height={18} />
          ) : (
            <span
              className={`${
                item.url == pathname
                  ? "dark:bg-white rounded-full mx-1.5 group-hover/link:bg-primary !bg-primary h-[6px] w-[6px]"
                  : "h-[6px] w-[6px] bg-black/40 dark:bg-white rounded-full mx-1.5 group-hover/link:bg-primary"
              } `}
            ></span>
          )}
          <span
            className={`max-w-36 overflow-hidden`}
          >
            {t(`${item.name}`)}
          </span>
        </span> 
      </Sidebar.Item>
    </>
  );
};

export default NavItems;
