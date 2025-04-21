import React, { useEffect, useState } from "react";
import Heading from "../general/Heading";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { endpoints, useFetch } from "../../utils/useApi";
import { Link } from "react-router-dom";
import Loader from "../general/Loader";
import ShortenedText from "../general/ShortenedText";
import { useTranslation } from "react-i18next";

type CareerDataType = {
  id: string;
  title: string;
  date: string;
  description: string;
};

const Career: React.FC = () => {
  const [career, setCareer] = useState<CareerDataType[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const { t } = useTranslation();
  const language = localStorage.getItem("i18nextLng");
  const itemsPerPage = 5;

  const sliceCareer = career.slice(0, page * itemsPerPage);

  const loadData = () => {
    setPage((prev) => prev + 1);
  };

  const getCareeerData = async () => {
    try {
      const headers = {
        "x-api-key": "aebddf40-4255-4a9a-8bdb-3eea84c28bb9",
        "accept-language": language,
      };
      const res = await useFetch(endpoints.career.list, headers);
      setCareer(res);
      setLoading(false);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error("Xeta bas verdi");
      }
    }
  };

  useEffect(() => {
    getCareeerData();
  }, [language]);
  return (
    <section className="relative z-[9999]" id="career">
      {loading ? (
        <Loader />
      ) : (
        <div className="container max-sm:!p-0 max-w-[70%] min-h-[70vh] mx-auto flex justify-start flex-col">
          <Heading text={t("Career")} />
          <div className="flex flex-1 flex-col">
            {career && career.length > 0
              ? sliceCareer.map((career: CareerDataType) => {
                  return (
                    <div
                      key={career.id}
                      className="w-full mt-10 flex flex-col gap-8"
                    >
                      <Link
                        to={`/careerDetail?id=${career.id}`}
                        className="block pb-8 text-white border-b-2 border-b-[#FFFFFF80]"
                      >
                        <div className="carrer-item flex justify-between">
                          <div className="left">
                            <div>
                              <span className="text-[32px] max-sm:text-[22px]">
                                {career.title}
                              </span>
                              <p className="max-sm:text-[14px] text-[17px]">
                                <ShortenedText text={career.description} />
                              </p>
                            </div>
                          </div>
                          <div className="right flex flex-col gap-4 items-end max-sm:gap-1">
                            <span className="current-time">
                              {new Date(career.date).toLocaleDateString()}
                            </span>
                            <span className="past-time text-[12px] opacity-50">
                              {new Date(career.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })
              : null}
          </div>
          {sliceCareer.length < career.length && (
            <div className="flex justify-center mt-8" onClick={loadData}>
              <button className="text-white text-[14px]">Load more ...</button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Career;
