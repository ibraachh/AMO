import { isAxiosError } from "axios";
import { endpoints, useFetch } from "../..//utils/useApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AmoTradeLogo from "../../assets/image/amo-grow-logo.svg";
import Loader from "../general/Loader";
import { useAppSelector } from "../../hooks/hooks";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslation } from "react-i18next";

export type CompanyCardType = {
  id: string;
  title: string;
  description: string;
  category: string;
};

export interface CompanyDataType {
  id: string;
  logo: string;
  title: string;
  description: string;
  companyCards: CompanyCardType[];
}

const AmoGrow = () => {
  const [companyData, setCompanyData] = useState<CompanyDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const language = useAppSelector((state) => state.langSlice.lang);

  const getList = async () => {
    try {
      const headers = {
        "x-api-key": "aebddf40-4255-4a9a-8bdb-3eea84c28bb9",
        "accept-language": language || "az",
      };
      const res = await useFetch(
        endpoints.company.getAllByName + "amogrow",
        headers
      );
      setLoading(false);
      setCompanyData(res);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error("Xeta", error.response?.data.message);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getList();
  }, [language]);
  return (
    <section className="relative z-[999]" id="amotrade">
      {loading ? (
        <Loader />
      ) : (
        <div className="container max-sm:!p-0 max-w-[70%] min-h-[70vh] mx-auto flex justify-start flex-col">
          <div className="mt-12 md:mt-16 flex flex-col justify-between">
            <div>
              <img src={AmoTradeLogo} alt="" />
            </div>
            <h4 className="text-[46px] w-max !text-white !font-semibold headingTitle max-sm:!text-[30px]">
              {companyData?.title}
            </h4>
            <p
              className="text-white mt-6 text-[16px] description-part1 text-left"
              dangerouslySetInnerHTML={{
                __html: `${companyData?.description || ""}`,
              }}
            />
            <div className="w-full flex items-center justify-start gap-4 text-center mt-20">
              <Link
                to="http://amofresh.az/"
                className="flex gap-1 items-center group"
                target="_blank"
              >
                <button className="bg-[#2A9650] w-[200px] h-[56px] rounded-[48px] text-white text-[20px] cursor-pointer">
                  {t("Daha çox...")}
                </button>
                <div className="w-12 h-12 rounded-full bg-[#2A9650] flex items-center justify-center">
                  <Icon
                    icon="fluent:arrow-up-right-32-regular"
                    width="24"
                    height="24"
                    style={{ color: "#fff" }}
                    className="group-hover:rotate-45 duration-300 cursor-pointer"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AmoGrow;
