import React, { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import BgImage1 from "../../assets/image/bg-2.jpeg";
import { Toaster } from "sonner";
import Bg3 from "../../assets/image/bg3.png";
import Bg1 from "../../assets/image/bg-1.jpeg";
import HeroImg from "../../assets/image/hero-bg.png";
import FounderBgImg from "../../assets/image/founder-bg.jpeg";
import CompaniesBgImg from "../../assets/image/companies-bg.jpeg";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const getBackgroundImage = () => {
    switch (location.pathname) {
      case "/news":
      case "/newsDetail":
        return BgImage1;
      case "/contact":
        return Bg3;
      case "/career":
      case "/careerDetail":
        return Bg1;
      case "/who-we-are":
      case "/mission-vision":
        return HeroImg;
      case "/history":
        return FounderBgImg;
      case "/companies/amo-trade":
      case "/companies/amo-grow":
      case "/companies/amo-do":
      case "/companies/amo-transport":
        return CompaniesBgImg;
    }
  };

  const getHasOverlay = () => {
    switch (location.pathname) {
      case "/news":
      case "/newsDetail":
      case "/career":
      case "/careerDetail":
      case "/who-we-are":
      case "/mission-vision":
      case "/history":
      case "/companies/amo-trade":
      case "/companies/amo-grow":
      case "/companies/amo-do":
      case "/companies/amo-transport":
        return "before:bg-[#033641]";
      default:
        return "";
    }
  };

  const backgroundImage = getBackgroundImage();

  return (
    <main
      style={{
        backgroundImage: `url(${backgroundImage})`,
        position: "absolute",
        top: 0,
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        zIndex: 1,
        minHeight: "100vh",
        // height: "100%",
        backgroundPosition: "left",
      }}
      className={`before:content-empty ${getHasOverlay()} before:absolute before:w-full before:h-full !before:z-0 before:opacity-80`}
    >
      <Toaster />
      {children}
    </main>
  );
};

export default Layout;
