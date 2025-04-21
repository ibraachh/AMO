import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState, useRef } from "react";
import { NewsDataType } from "../pages/News";
import { endpoints, useFetch } from "../../utils/useApi";
import { isAxiosError } from "axios";
import { motion } from "framer-motion";
import { opacityVariant } from "../../utils/Animation";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../../assets/css/newsswiper.css";

const NewsSwiper = () => {
  const [newsData, setNewsData] = useState<NewsDataType[] | []>([]);
  const swiperRef = useRef<any>(null);

  const getNewsData = async () => {
    try {
      const headers = {
        "x-api-key": "aebddf40-4255-4a9a-8bdb-3eea84c28bb9",
        "accept-language": "az",
      };
      const res = await useFetch(endpoints.news.list, headers);
      setNewsData(res);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
        throw error;
      }
    }
  };

  useEffect(() => {
    getNewsData();
  }, []);

  return (
    <div className="relative min-h-[300px]">
      <Swiper
        ref={swiperRef}
        spaceBetween={50}
        slidesPerView={4}
        modules={[Pagination]}
        pagination={{ clickable: true }}
      >
        {newsData.map((news) => (
          <SwiperSlide key={news.id}>
            <div className="relative z-[99999] bg-transparent cursor-pointer md:w-[280px] w-full">
              <div className="md:h-[200px] md:w-[280px] w-full h-full">
                <img
                  src={`https://api.studentall.az:9851/api/file/getFile/${news.image}`}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover rounded-lg"
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewsSwiper;
