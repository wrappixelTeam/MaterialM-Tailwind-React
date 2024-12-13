import AnnouncementBar from "src/components/front-pages/layout/AnnouncementBar";
import { Footer } from "src/components/front-pages/layout/Footer";
import FrontHeader from "src/components/front-pages/layout/Header";
import customTheme from "src/utils/theme/custom-theme";
import { Flowbite } from "flowbite-react";
import { Outlet } from "react-router";
import ScrollToTop from "src/components/shared/ScrollToTop";


const FrontendLayout = () => (
    <>
    <div className="frontend-page bg-white dark:bg-dark">
    <Flowbite theme={{ theme: customTheme }}>
        <AnnouncementBar />
        <FrontHeader />
        <ScrollToTop>
        <Outlet />
        </ScrollToTop>
        <Footer />
        </Flowbite>
        </div>
    </>
);

export default FrontendLayout;
