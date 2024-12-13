
import  { useState, useEffect, useContext } from "react";
import { Navbar } from "flowbite-react";
import Search from "./Search";
import { Icon } from "@iconify/react";
import AppLinks from "./AppLinks";
import Notifications from "./Notifications";
import Profile from "./Profile";
import FullLogo from "../../shared/logo/FullLogo";
import MobileHeaderItems from "./MobileHeaderItems";
import { Drawer } from "flowbite-react";
import MobileSidebar from "../sidebar/MobileSidebar";
import HorizontalMenu from "../../horizontal/header/HorizontalMenu";
import { CustomizerContext } from "../../../../context/CustomizerContext";
import { Language } from "./Language";
import { DashboardContext } from "@src/context/DashboardContext/DashboardContext";

interface HeaderPropsType {
  layoutType: string;
}

const Header = ({ layoutType }: HeaderPropsType) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const {  isLayout, activeMode, setActiveMode } =
    useContext(CustomizerContext);

    const {isMobileSidebarOpen,setIsMobileSidebarOpen} = useContext(DashboardContext);

  const [mobileMenu, setMobileMenu] = useState("");

  const handleMobileMenu = () => {
    if (mobileMenu === "active") {
      setMobileMenu("");
    } else {
      setMobileMenu("active");
    }
  };

  const toggleMode = () => {
    setActiveMode((prevMode: string) =>
      prevMode === "light" ? "dark" : "light"
    );
  };

  // mobile-sidebar
  const handleClose = () => setIsMobileSidebarOpen(false);
  return (
    <>
      <header
        className={`top-0 z-[5]  ${
          isSticky
            ? "bg-white dark:bg-darkgray sticky"
            : "bg-transparent"
        }`}
      >
        <Navbar
          fluid
          className={`rounded-none bg-transparent dark:bg-transparent py-4 sm:px-[15px] px-2 ${
            layoutType == "horizontal" ? "container mx-auto !px-6" : ""
          }  ${isLayout == "full" ? "!max-w-full " : ""}`}
        >
          {/* Mobile Toggle Icon */}
          <span
            onClick={() => setIsMobileSidebarOpen(true)}
            className="h-10 w-10 flex text-black dark:text-white text-opacity-65 xl:hidden hover:text-primary hover:bg-lightprimary rounded-full justify-center items-center cursor-pointer"
          >
            <Icon icon="solar:hamburger-menu-line-duotone" height={21} />
          </span>
          {/* Toggle Icon   */}
          <Navbar.Collapse className="xl:block ">
            <div className="flex gap-3 items-center relative">
              {layoutType == "horizontal" ? (
                <div className="me-3">
                  <FullLogo />
                </div>
              ) : null}

              {/* App Link Dropwown   */}

              <Search />
              <AppLinks />
            </div>
          </Navbar.Collapse>

          {/* mobile-logo */}
          <div className="block xl:hidden">
            <FullLogo />
          </div>

          <Navbar.Collapse className="xl:block hidden">
            <div className="flex gap-3 items-center">
              {/* Search   */}

              {/* Theme Toggle */}

              {/* Light Mode Button */}
              {activeMode === "light" ? (
                <div
                  className="h-10 w-10 hover:text-primary hover:bg-lightprimary dark:hover:bg-darkminisidebar  dark:hover:text-primary focus:ring-0 rounded-full flex justify-center items-center cursor-pointer text-darklink  dark:text-white"
                  onClick={toggleMode}
                >
                  <span className="flex items-center">
                    <Icon icon="solar:moon-line-duotone" width="20" />
                  </span>
                </div>
              ) : (
                // Dark Mode Button
                <div
                  className="h-10 w-10 hover:text-primary hover:bg-lightprimary dark:hover:bg-darkminisidebar  dark:hover:text-primary focus:ring-0 rounded-full flex justify-center items-center cursor-pointer text-darklink  dark:text-white"
                  onClick={toggleMode}
                >
                  <span className="flex items-center">
                    <Icon icon="solar:sun-bold-duotone" width="20" />
                  </span>
                </div>
              )}

              {/* Notification Dropdown */}
              <Notifications />

              {/* Language Dropdown*/}
              <Language />

              {/* Profile Dropdown */}
              <Profile />
            </div>
          </Navbar.Collapse>
          {/* Mobile Toggle Icon */}
          <span
            className="h-10 w-10 flex xl:hidden hover:text-primary hover:bg-lightprimary rounded-full justify-center items-center cursor-pointer"
            onClick={handleMobileMenu}
          >
            <Icon icon="tabler:dots" height={21} />
          </span>
        </Navbar>
        <div
          className={`w-full  xl:hidden block mobile-header-menu ${mobileMenu}`}
        >
          <MobileHeaderItems />
        </div>

        {/* Horizontal Menu  */}
        {layoutType == "horizontal" ? (
          <div className="xl:border-t xl:border-ld">
            <div
              className={`${isLayout == "full" ? "w-full px-6" : "container"}`}
            >
              <HorizontalMenu />
            </div>
          </div>
        ) : null}
      </header>

      {/* Mobile Sidebar */}
      <Drawer open={isMobileSidebarOpen} onClose={handleClose} className="w-130">
        <Drawer.Items>
          <MobileSidebar />
        </Drawer.Items>
      </Drawer>
    </>
  );
};

export default Header;
