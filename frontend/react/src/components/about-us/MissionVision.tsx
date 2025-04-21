import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CartIcon5 from "../../assets/image/Group 1000001916.svg";
import CartIcon6 from "../../assets/image/Group 1000001917.svg";
import Loader from "../general/Loader";
import { motion } from "framer-motion";
import { useAppSelector } from "../..//hooks/hooks";
import { useTranslation } from "react-i18next";
import "../../assets/css/mission.css";

type MissionType = {
  id: string;
  title: string;
  description: string;
};

const MissionVision = () => {
  const [mission, setMission] = useState<MissionType[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const language = useAppSelector((state) => state.langSlice.lang);
  const { t } = useTranslation();

  const getMissionData = async () => {
    try {
      const headers = {
        "x-api-key": "aebddf40-4255-4a9a-8bdb-3eea84c28bb9",
        "accept-language": language,
      };
      const res = await axios.get(
        "https://api.studentall.az:9851/api/mission/list",
        { headers }
      );
      setMission(res.data);
      setLoading(false);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error("Xeta", error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    getMissionData();
  }, [language]);

  const imgArr = [CartIcon5, CartIcon6];

  return (
    <section className="relative z-[9999]" id="mission">
      {loading ? (
        <Loader />
      ) : (
        <div className="container max-sm:!p-0 max-w-[70%] min-h-[70vh] mx-auto flex justify-start flex-col">
          <div className="grid grid-cols-1 gap-8 text-white mt-12">
            <div>
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="uppercase title !text-[48px] !tracking-widest !mb-4 !font-semibold !leading-[85px]"
              >
                {t("Mission")}
              </motion.h3>
              {mission &&
                mission.length > 0 &&
                mission.slice(0, 1).map((item, index) => (
                  <div
                    key={item.id}
                    className="flex gap-4 items-center rounded-3xl bg-white py-[43px] px-[32px]"
                  >
                    <div className="">
                      <img
                        src={imgArr[index]}
                        alt="cart-icon"
                        className="!max-w-[88px] !max-sm:max-w-[70px] !max-md:max-w-[80px]"
                      />
                    </div>
                    <p
                      className="!text-[18px] !font-[400] title !text-[#033641]"
                      dangerouslySetInnerHTML={{
                        __html: item.description || "",
                      }}
                    />
                  </div>
                ))}
            </div>
            <div>
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="uppercase title !text-[48px] !tracking-widest !mb-4 !font-semibold !leading-[85px]"
              >
                {t("Vision")}
              </motion.h3>
              {mission &&
                mission.length > 0 &&
                mission.slice(1, 2).map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 items-center rounded-3xl bg-white py-[43px] px-[32px]"
                  >
                    <div className="">
                      <img
                        src={imgArr[1]}
                        alt="cart-icon"
                        className="!max-w-[88px] !max-sm:max-w-[70px] !max-md:max-w-[80px]"
                      />
                    </div>
                    <p
                      className="!text-[18px] !font-[400] !title !text-[#033641]"
                      dangerouslySetInnerHTML={{
                        __html: item.description || "",
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MissionVision;
