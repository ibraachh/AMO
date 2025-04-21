import { isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { endpoints, useFetch } from "../../utils/useApi";
import { createSearchParams, useNavigate } from "react-router-dom";
import Loader from "../general/Loader";
import Heading from "../general/Heading";
import { motion } from "framer-motion";
import { opacityVariant } from "../../utils/Animation";
import { useAppSelector } from "../../hooks/hooks";
import { useTranslation } from "react-i18next";

export interface NewsDataType {
  description: string;
  id: string;
  image: string;
  title: string;
}

const News: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsDataType[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const language = useAppSelector((state) => state.langSlice.lang);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getNewsData = async () => {
    try {
      const headers = {
        "x-api-key": "aebddf40-4255-4a9a-8bdb-3eea84c28bb9",
        "accept-language": language,
      };
      const res = await useFetch(endpoints.news.list, headers);
      setNewsData(res);
      setLoading(false);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
        throw error;
      }
    }
  };

  useEffect(() => {
    getNewsData();
  }, [language]);

  return (
    <section className="news pb-[50px] mx-auto">
      {loading ? (
        <Loader />
      ) : (
        <div className="container max-sm:!p-0 max-w-[70%] min-h-[70vh] mx-auto flex justify-start flex-col">
          <Heading text={t("Media Center")} />
          <div className="news-grid grid grid-cols-4 !gap-12 my-8 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
            {newsData && newsData.length > 0
              ? newsData?.map((news: NewsDataType) => (
                  <div
                    key={news.id}
                    onClick={() =>
                      navigate({
                        pathname: "/newsDetail",
                        search: `${createSearchParams({
                          id: news.id,
                        })}`,
                      })
                    }
                    className="relative z-[99] bg-transparent cursor-pointer"
                  >
                    <div className="h-[200px] w-full">
                      <img
                        src={`https://api.studentall.az:9851/api/file/getFile/${news.image}`}
                        alt={news.title}
                        loading="lazy"
                        className="h-full w-min object-cover rounded-lg"
                      />
                    </div>
                    <motion.p
                      variants={opacityVariant}
                      initial="initial"
                      animate="animate"
                      transition={{ duration: 0.5 }}
                      className="text-[22px] text-white pt-5 font-[400] leading-7 tracking-[-0.017em]"
                    >
                      {news.title}
                    </motion.p>
                  </div>
                ))
              : null}
          </div>
        </div>
      )}
    </section>
  );
};

export default News;
