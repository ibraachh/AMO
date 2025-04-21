import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Footer: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  return (
    <>
      {location.pathname === "/" ? null : (
        <footer className="footer z-20 relative pb-2">
          <div className="flex container items-center !max-w-[70%] justify-between w-full max-sm:flex-col mt-[65px] max-sm:gap-4 mx-auto">
            <div className="flex md:items-center gap-10 text-white max-sm:flex-col max-sm:gap-2 w-full">
              <p>
                © <span className="year">2025</span> AMO Corporate group
              </p>
              <a href="https://www.esam-innovations.com" target="_blank">
                ESAM innovations
              </a>
            </div>
            <div className="flex items-center gap-2 text-white w-full sm:justify-end sosial-links">
              <span>{t("Follow us")}</span>
              <li>
                <Link
                  className="group cursor-pointer"
                  to="https://www.instagram.com/amogroup.az/"
                >
                  <Icon
                    icon="mdi:instagram"
                    width="24"
                    height="24"
                    className="text-white group-hover:text-red-300 duration-200"
                  />
                </Link>
              </li>
              <li>
                <Link
                  className="cursor-pointer group"
                  to="https://www.linkedin.com/company/a-m-o-group/"
                >
                  <Icon
                    icon="mdi:linkedin"
                    width="24"
                    height="24"
                    className="text-white group-hover:text-red-300 duration-200"
                  />
                </Link>
              </li>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
