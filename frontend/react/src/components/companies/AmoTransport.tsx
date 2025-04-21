import { isAxiosError } from "axios";
import { endpoints, useFetch } from "../..//utils/useApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAppSelector } from "../../hooks/hooks";
import Frame4 from "../../assets/image/frame-4.svg";
import Frame5 from "../../assets/image/frame-5.svg";
import Frame7 from "../../assets/image/frame-6.png";
import Loader from "../general/Loader";

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

const AmoTransport = () => {
  const [companyData, setCompanyData] = useState<CompanyDataType | null>(null);
  const imgArr = [Frame4, Frame5, Frame7];
  const [loading, setLoading] = useState(true);
  const language = useAppSelector((state) => state.langSlice.lang);

  const getList = async () => {
    try {
      const headers = {
        "x-api-key": "aebddf40-4255-4a9a-8bdb-3eea84c28bb9",
        "accept-language": language,
      };
      const res = await useFetch(
        endpoints.company.getAllByName + "amoTransport",
        headers
      );
      setCompanyData(res);
      setLoading(false);
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
          <div className="w-full flex items-start justify-center flex-col gap-4 text-center my-16 h-[200px]">
            <img
              loading="lazy"
              src={`https://api.studentall.az:9851/api/file/getFile/${companyData?.logo}`}
              alt="logo"
              className="h-[280px] object-contain"
            />
          </div>
          <div className="mt-12 md:mt-16">
            <h4 className="text-[46px] w-max !text-white !font-semibold headingTitle max-sm:!text-[30px]">
              {companyData?.title}
            </h4>
            <p
              className="text-white mt-6 text-[16px] description-part1 text-left"
              dangerouslySetInnerHTML={{
                __html: `${companyData?.description || ""}`,
              }}
            />
          </div>
          <div className="flex items-center justify-between max-md:gap-6 max-lg:flex-wrap my-8 w-full">
            {companyData &&
              companyData?.companyCards.map((company, index) => {
                return (
                  <div
                    key={company.id}
                    style={{
                      borderWidth: "15px",
                      borderStyle: "solid",
                      borderImage: `url(${imgArr[index]}) ${
                        index === 2 ? "70" : "20"
                      } fill`,
                    }}
                    className="md:w-[340px] min-h-[240px] custom-border-image-1 flex items-center justify-center card-1 text-white"
                    dangerouslySetInnerHTML={{ __html: `${company.title}` }}
                  />
                );
              })}
          </div>
        </div>
      )}
    </section>
  );
};

export default AmoTransport;
