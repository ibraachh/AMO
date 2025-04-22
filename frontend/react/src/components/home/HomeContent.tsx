import { Link } from "react-router-dom";
import { AboutDataType } from "../pages/Home";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslation } from "react-i18next";
// import { useTranslation } from "react-i18next";

interface ContentType {
  content: AboutDataType[];
}

const HomeContent: React.FC<ContentType> = ({ content }) => {
  const { t } = useTranslation();

  return (
    <div className="container max-md:mx-auto h-full flex flex-col justify-center max-md:max-w-[85%] text-white fixed z-[20] select-none">
      <div className="flex flex-col h-full justify-between mb-8 mt-[60px] max-md:mt-[120px] max-sm:mt-[100px]">
        {content &&
          content.length > 0 &&
          content.map((item: AboutDataType) => (
            <div className="flex flex-col gap-6" key={item.id}>
              <div className="text-[68px] max-xl:text-[42px] max-sm:text-[32px]">
                {item.title}
              </div>
              <div>
                <p
                  className="text-[20px] max-xl:text-[18px] max-sm:text-[14px] md:max-w-[60%]"
                  dangerouslySetInnerHTML={{ __html: `${item.description}` }}
                />
              </div>
              <span className="border-b-2 block w-[40%] mt-8"></span>
            </div>
          ))}

        <div className="flex items-center justify-between w-full max-sm:flex-col mt-80 max-sm:gap-4 h-full">
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
      </div>
    </div>
  );
};

export default HomeContent;
