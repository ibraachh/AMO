import React, { useCallback, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../hooks/hooks";
import { changeLang } from "../redux/slice/langSlice";
import Logo from "../../assets/image/logo.svg";
import BasicModal from "../general/Modal";
import i18n from "../../lib/i18n/config";
import "../../assets/css/header.css";

const Header: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSidebarMenu, setShowSidebarMenu] = useState<{
    first: boolean;
    last: boolean;
  }>({
    first: false,
    last: false,
  });
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const handleOpen = () => setOpen(true);

  const openMobileMenu = useCallback(() => {
    setMobileMenuOpen(!mobileMenuOpen);
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setShowSidebarMenu({ first: false, last: false });
    setMobileMenuOpen(!mobileMenuOpen);
  }, [mobileMenuOpen]);

  const handleShowLangMenu = () => {
    setShowMenu(!showMenu);
  };

  const openFirstSidebarMenu = useCallback(() => {
    setShowSidebarMenu((prev) => ({ ...prev, first: !showSidebarMenu.first }));
  }, [showSidebarMenu]);
  const openLastSidebarMenu = useCallback(() => {
    setShowSidebarMenu((prev) => ({ ...prev, last: !showSidebarMenu.last }));
  }, [showSidebarMenu]);

  const changeLangStorage = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = (e.target as HTMLLIElement).innerText;
    dispatch(changeLang(value.toLowerCase()));
  };

  return (
    <section>
      <header className="header py-[38px] fixed top-0 z-[10000] w-full bg-blue transition-all duration-200">
        <div className="container relative z-[10000] mx-auto !full-w-[70%] max-w-[70%] transition-all duration-200">
          <div className="flex items-center justify-between transition-all duration-200">
            <div className="h-left transition-all duration-200">
              <Link to="/">
                <img
                  src={Logo}
                  alt=""
                  className="min-w-[60px] lg:min-w-[100px] w-full h-full"
                />
              </Link>
            </div>
            <div className="h-average w-full px-[90px] justify-center mx-auto transition-all duration-200">
              <nav>
                <ul className="flex gap-10 justify-center items-center py-0 px-5">
                  <li className="flex items-center justify-center group cursor-pointer">
                    <span className="font-open-sans title !text-[#fff] shrink-0 flex items-center justify-center !min-w-max hover:!font-bold hover:mx-1 duration-200">
                      {t("About us")}
                    </span>
                    <Icon
                      icon="fe:arrow-down"
                      width="24"
                      height="24"
                      style={{ color: "#fff" }}
                      className="opacity-0 invinsible group-hover:opacity-100 group-hover:visible duration-200"
                    />
                    <ul className="absolute rounded-xl group-hover:visible invisible py-[15px] px-[10px] duration-500 !bg-[#EDEDED] flex flex-col !w-[300px] text-white group-hover:bg-orange-500 top-full left-[45%] translate-x-[-100%] opacity-0 group-hover:opacity-100 transition-all">
                      <li className="hover:bg-[#DFDFDF] mb-[10px] px-[10px] rounded-lg overflow-hidden duration-200 flex gap-5 items-center justify-between dropdown-link cursor-pointer">
                        <Link
                          to="/who-we-are"
                          className="!text-black text-[19px] w-full h-full px-4 py-2 flex items-center justify-between"
                        >
                          {t("Who we are")}
                        </Link>
                        <Icon
                          icon="fe:arrow-right"
                          width="30"
                          height="30"
                          style={{ color: "#000" }}
                          className="opacity-0 invinsible transition-opacity group-hover:visible duration-200 icon"
                        />
                      </li>
                      <li className="hover:bg-[#DFDFDF] text-[19px] mb-[10px] px-[10px] rounded-lg overflow-hidden duration-200 flex gap-5 items-center justify-between dropdown-link cursor-pointer">
                        <Link
                          to="/mission-vision"
                          className="!text-black w-full h-full px-4 py-2 flex items-center justify-between"
                        >
                          {t("Mission / Vision")}
                        </Link>
                        <Icon
                          icon="fe:arrow-right"
                          width="30"
                          height="30"
                          style={{ color: "#000" }}
                          className="opacity-0 invinsible transition-opacity group-hover:visible duration-200 icon"
                        />
                      </li>
                      <li className="hover:bg-[#DFDFDF] text-[19px] mb-[10px] px-[10px] rounded-lg overflow-hidden duration-200 flex gap-5 items-center justify-between dropdown-link cursor-pointer">
                        <Link
                          to="/history"
                          className="!text-black w-full h-full px-4 py-2 flex items-center justify-between"
                        >
                          {t("History")}
                        </Link>
                        <Icon
                          icon="fe:arrow-right"
                          width="30"
                          height="30"
                          style={{ color: "#000" }}
                          className="opacity-0 invinsible transition-opacity group-hover:visible duration-200 icon"
                        />
                      </li>
                    </ul>
                  </li>
                  <li className="flex items-center justify-center group cursor-pointer">
                    <span className="font-open-sans title !text-[#fff] shrink-0 flex items-center justify-center !min-w-max hover:!font-bold hover:mx-1 duration-200">
                      {t("Companies")}
                    </span>
                    <Icon
                      icon="fe:arrow-down"
                      width="24"
                      height="24"
                      style={{ color: "#fff" }}
                      className="opacity-0 invinsible group-hover:opacity-100 group-hover:visible duration-200"
                    />
                    <ul className="absolute invisible group-hover:visible rounded-xl py-[15px] px-[10px] duration-500 !bg-[#EDEDED] flex-col !w-max text-white group-hover:bg-orange-500 top-full left-[50%] translate-x-[-80%] opacity-0 group-hover:opacity-100 transition-all">
                      <li className="hover:bg-[#DFDFDF] mb-[10px] px-[10px] rounded-lg overflow-hidden duration-200 flex gap-5 items-center justify-between dropdown-link cursor-pointer">
                        <Link
                          to="/companies/amo-trade"
                          className="!text-black text-[19px] w-full h-full px-4 py-2 flex items-center justify-between"
                        >
                          {t("Amotrade (amofresh)")}
                        </Link>
                        <Icon
                          icon="fe:arrow-right"
                          width="30"
                          height="30"
                          style={{ color: "#000" }}
                          className="opacity-0 invinsible transition-opacity group-hover:visible duration-200 icon"
                        />
                      </li>
                      <li className="hover:bg-[#DFDFDF] text-[19px] mb-[10px] px-[10px] rounded-lg overflow-hidden duration-200 flex gap-5 items-center justify-between dropdown-link cursor-pointer">
                        <Link
                          to="/companies/amo-grow"
                          className="!text-black w-full h-full px-4 py-2 flex items-center justify-between"
                        >
                          {t("Amogrow (amofresh)")}
                        </Link>
                        <Icon
                          icon="fe:arrow-right"
                          width="30"
                          height="30"
                          style={{ color: "#000" }}
                          className="opacity-0 invinsible transition-opacity group-hover:visible duration-200 icon"
                        />
                      </li>
                      <li className="hover:bg-[#DFDFDF] text-[19px] mb-[10px] px-[10px] rounded-lg overflow-hidden duration-200 flex gap-5 items-center justify-between dropdown-link cursor-pointer">
                        <Link
                          to="/companies/amo-do"
                          className="!text-black w-full h-full px-4 py-2 flex items-center justify-between"
                        >
                          {t("Amo D.O (amofresh)")}
                        </Link>
                        <Icon
                          icon="fe:arrow-right"
                          width="30"
                          height="30"
                          style={{ color: "#000" }}
                          className="opacity-0 invinsible transition-opacity group-hover:visible duration-200 icon"
                        />
                      </li>
                      <li className="hover:bg-[#DFDFDF] text-[19px] mb-[10px] px-[10px] rounded-lg overflow-hidden duration-200 flex gap-5 items-center justify-between dropdown-link cursor-pointer">
                        <Link
                          to="/companies/amo-transport"
                          className="!text-black w-full h-full px-4 py-2 flex items-center justify-between"
                        >
                          {t("Amotransport")}
                        </Link>
                        <Icon
                          icon="fe:arrow-right"
                          width="30"
                          height="30"
                          style={{ color: "#000" }}
                          className="opacity-0 invinsible transition-opacity group-hover:visible duration-200 icon"
                        />
                      </li>
                    </ul>
                  </li>
                  <li className="flex items-center justify-center group cursor-pointer">
                    <span className="font-open-sans title !text-[#fff] shrink-0 flex items-center justify-center !min-w-max hover:!font-bold hover:mx-1 duration-200">
                      <Link to="/news">{t("Media Center")}</Link>
                    </span>
                  </li>
                  <li className="flex items-center justify-center group cursor-pointer">
                    <span className="font-open-sans title !text-[#fff] shrink-0 flex items-center justify-center !min-w-max hover:!font-bold hover:mx-1 duration-200">
                      <Link to="/career">{t("Career")}</Link>
                    </span>
                  </li>
                  <li className="flex items-center justify-center group cursor-pointer">
                    <span className="font-open-sans title !text-[#fff] shrink-0 flex items-center justify-center !min-w-max hover:!font-bold hover:mx-1 duration-200">
                      <Link to="/contact">{t("Contact us")}</Link>
                    </span>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="h-right flex items-center transition-all duration-200">
              <div className="relative ml-5" onClick={handleShowLangMenu}>
                <span className="text-white uppercase text-xl flex gap-1 items-center cursor-pointer">
                  {i18n.language}
                  <Icon
                    icon="ri:arrow-down-s-line"
                    width="24"
                    height="24"
                    style={{ color: "#fff" }}
                    className={`transform duration-300 ${
                      showMenu && "rotate-180"
                    }`}
                  />
                </span>

                {showMenu && (
                  <div className="bg-[#033641] absolute top-full left-0 mt-2 text-white rounded-md shadow-md transition-opacity duration-300 z-10">
                    <ul className="py-2 px-4 leading-[33px] font-[400] text-[22px] -tracking-[0.017em]">
                      <li
                        onClick={(e: React.MouseEvent<HTMLLIElement>) =>
                          changeLangStorage(e)
                        }
                        className="cursor-pointer"
                      >
                        EN
                      </li>
                      <li
                        onClick={(e: React.MouseEvent<HTMLLIElement>) =>
                          changeLangStorage(e)
                        }
                        className="cursor-pointer"
                      >
                        AZ
                      </li>
                      <li
                        onClick={(e: React.MouseEvent<HTMLLIElement>) =>
                          changeLangStorage(e)
                        }
                        className="cursor-pointer"
                      >
                        RU
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <button
                className="cursor-pointer outline-none"
                onClick={handleOpen}
              >
                <Icon
                  icon="stash:search"
                  width="33"
                  height="33"
                  style={{ color: "#fff" }}
                  className="ml-[24px]"
                />
              </button>
              <button
                className="burger-menu outline-none border-none"
                onClick={openMobileMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="cursor-pointer ml-[24px] text-white w-[33px] h-[33px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {mobileMenuOpen && (
          <motion.section
            initial={{ left: "-100%" }}
            animate={{ left: 0 }}
            exit={{ left: "-100%", transition: { duration: 0.4 } }}
            transition={{ duration: 0.4 }}
            key="section"
            className={`fixed top-0 left-0 w-full h-full bg-[#033641] z-[1000215] shadow-lg pt-[70px] px-[30px] pb-[30px] flex flex-col gap-4`}
          >
            <ul className="flex flex-col">
              <li className="relative">
                <button
                  onClick={openFirstSidebarMenu}
                  className="outline-none cursor-pointer group flex items-center justify-start text-white w-full font-medium py-[10px] bg-transparent font-open-sans"
                >
                  <span className="text-[22px]">{t("About us")}</span>
                  <Icon
                    icon="fe:arrow-right"
                    width="22"
                    height="22"
                    style={{ color: "#fff" }}
                    className="duration-200"
                  />
                </button>
                <ul
                  className={`absolute ${
                    showSidebarMenu.first
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  } rounded-xl z-[9999999999] py-[10px] px-[5px] duration-500 !bg-[#EDEDED] flex flex-col !w-[280px] text-white top-full transition-all`}
                >
                  <li className="hover:bg-[#DFDFDF] mb-[10px] px-[10px] rounded-lg overflow-hidden duration-200 flex gap-5 items-center justify-between dropdown-link cursor-pointer">
                    <Link
                      to="/who-we-are"
                      onClick={closeMobileMenu}
                      className="!text-black text-[19px] w-full h-full px-4 py-2 flex items-center justify-between"
                    >
                      {t("Who we are")}
                    </Link>
                    <Icon
                      icon="fe:arrow-right"
                      width="30"
                      height="30"
                      style={{ color: "#000" }}
                      className="opacity-0 invinsible transition-opacity group-hover:visible duration-200 icon"
                    />
                  </li>
                  <li className="hover:bg-[#DFDFDF] text-[19px] mb-[10px] px-[10px] rounded-lg overflow-hidden duration-200 flex gap-5 items-center justify-between dropdown-link cursor-pointer">
                    <Link
                      to="/mission-vision"
                      onClick={closeMobileMenu}
                      className="!text-black w-full h-full px-4 py-2 flex items-center justify-between"
                    >
                      {t("Mission / Vision")}
                    </Link>
                    <Icon
                      icon="fe:arrow-right"
                      width="30"
                      height="30"
                      style={{ color: "#000" }}
                      className="opacity-0 invinsible transition-opacity group-hover:visible duration-200 icon"
                    />
                  </li>
                  <li className="hover:bg-[#DFDFDF] text-[19px] mb-[10px] px-[10px] rounded-lg overflow-hidden duration-200 flex gap-5 items-center justify-between dropdown-link cursor-pointer">
                    <Link
                      to="/history"
                      onClick={closeMobileMenu}
                      className="!text-black w-full h-full px-4 py-2 flex items-center justify-between"
                    >
                      {t("History")}
                    </Link>
                    <Icon
                      icon="fe:arrow-right"
                      width="30"
                      height="30"
                      style={{ color: "#000" }}
                      className="opacity-0 invinsible transition-opacity group-hover:visible duration-200 icon"
                    />
                  </li>
                </ul>
              </li>
              <li className="relative">
                <button
                  onClick={openLastSidebarMenu}
                  className="outline-none cursor-pointer flex items-center justify-start text-white w-full font-medium py-[10px] bg-transparent font-open-sans"
                >
                  <span className="text-[22px]">{t("Companies")}</span>
                  <Icon
                    icon="fe:arrow-right"
                    width="22"
                    height="22"
                    style={{ color: "#fff" }}
                    className="duration-200"
                  />
                </button>
                <ul
                  className={`absolute ${
                    showSidebarMenu.last
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  } rounded-xl duration-200 !bg-[#EDEDED] !w-[280px] text-white top-full left-0`}
                >
                  <li className="hover:bg-[#DFDFDF] rounded-lg overflow-hidden duration-200 px-4">
                    <Link
                      to="/companies/amo-trade"
                      onClick={closeMobileMenu}
                      className="!text-black w-full h-full px-4 py-2 flex items-center justify-between"
                    >
                      Amotrade (amofresh)
                      <i className="fa-solid fa-angle-right opacity-0 invisible duration-200"></i>
                    </Link>
                  </li>
                  <li className="hover:bg-[#DFDFDF] rounded-lg overflow-hidden duration-200 px-4">
                    <Link
                      to="/companies/amo-grow"
                      onClick={closeMobileMenu}
                      className="!text-black flex w-full h-full px-4 py-2 items-center justify-between"
                    >
                      Amogrow (amofresh)
                      <i className="fa-solid fa-angle-right opacity-0 invisible duration-200"></i>
                    </Link>
                  </li>
                  <li className="hover:bg-[#DFDFDF] rounded-lg overflow-hidden duration-200 px-4">
                    <Link
                      to="/companies/amo-do"
                      onClick={closeMobileMenu}
                      className="!text-black w-full h-full px-4 py-2 flex items-center justify-between"
                    >
                      Amo D.O (amofresh)
                      <i className="fa-solid fa-angle-right opacity-0 invisible duration-200"></i>
                    </Link>
                  </li>
                  <li className="hover:bg-[#DFDFDF] rounded-lg overflow-hidden duration-200 px-4">
                    <Link
                      to="/companies/amo-transport"
                      onClick={closeMobileMenu}
                      className="!text-black w-full h-full px-4 py-2 flex items-center justify-between"
                    >
                      Amotransport
                      <i className="fa-solid fa-angle-right opacity-0 invisible duration-200"></i>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  onClick={closeMobileMenu}
                  className="font-open-sans font-medium text-[22px] w-full text-white py-[10px] block"
                  to="/news"
                >
                  {t("Media Center")}
                </Link>
              </li>
              <li>
                <Link
                  onClick={closeMobileMenu}
                  className="font-open-sans font-medium text-[22px] w-full text-white py-[10px] block"
                  to="./career"
                >
                  {t("Career")}
                </Link>
              </li>
              <li className="w-full">
                <Link
                  onClick={closeMobileMenu}
                  className="font-open-sans font-medium text-[22px] w-full text-white py-[10px] block"
                  to="/contact"
                >
                  {t("Contact us")}
                </Link>
              </li>
            </ul>
            <button
              onClick={closeMobileMenu}
              className="absolute top-[20px] right-[20px] cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </motion.section>
        )}
      </AnimatePresence>

      {open && (
        <BasicModal open={open} handleOpen={handleOpen} setOpen={setOpen} />
      )}
    </section>
  );
};

export default Header;
