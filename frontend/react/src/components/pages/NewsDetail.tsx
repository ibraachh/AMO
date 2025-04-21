import { useSearchParams } from "react-router-dom";
import Heading from "../general/Heading";
import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { NewsDataType } from "./News";
import Loader from "../general/Loader";
import { motion } from "framer-motion";
import { opacityVariant } from "../../utils/Animation";
import NewsSwiper from "../ui/NewsSwiper";
import { useAppSelector } from "../../hooks/hooks";
import { useTranslation } from "react-i18next";

const NewsDetail = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams, _] = useSearchParams();
  const [newsDataDetail, setNewsDataDetail] = useState<NewsDataType | null>(
    null
  );
  const language = useAppSelector((state) => state.langSlice.lang);
  const { t } = useTranslation();

  const getNewsDataById = async () => {
    try {
      const headers = {
        "x-api-key": "aebddf40-4255-4a9a-8bdb-3eea84c28bb9",
        "accept-language": language,
      };
      const res = await axios.get(
        `https://api.studentall.az:9851/api/news/get/${searchParams.get("id")}`,
        { headers }
      );
      const data = res.data;
      setNewsDataDetail(data);
      setLoading(false);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
        throw error;
      }
    }
  };

  useEffect(() => {
    getNewsDataById();
  }, [language]);

  return (
    <section>
      {loading ? (
        <Loader />
      ) : (
        <div className="container max-sm:!p-0 max-w-[70%] min-h-[70vh] mx-auto flex justify-start flex-col z-[9999]">
          <Heading text={t("Media Center")} />
          <div className="z-[9999] relative">
            <div className="w-full flex justify-between items-start gap-8 max-lg:flex-wrap">
              <div className="lg:w-2/5 w-full h-full">
                <img
                  className="w-full h-full rounded-lg object-cover max-h-[300px]"
                  src={`https://api.studentall.az:9851/api/file/getFile/${newsDataDetail?.image}`}
                  alt={newsDataDetail?.title}
                  loading="lazy"
                />
              </div>
              <motion.div
                variants={opacityVariant}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5 }}
                className="lg:w-3/5 w-full font-open-sans"
              >
                <h3 className="text-white text-[50px] max-sm:text-[30px]">
                  {newsDataDetail?.title}
                </h3>
                <div
                  className="text-white text-[16px]"
                  dangerouslySetInnerHTML={{
                    __html: newsDataDetail?.description || "",
                  }}
                />
              </motion.div>
            </div>
            <div className="text-[32px] text-white font-open-sans my-14 swiper-box">
              <h1>{t("Other news")}</h1>
              <NewsSwiper />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default NewsDetail;
