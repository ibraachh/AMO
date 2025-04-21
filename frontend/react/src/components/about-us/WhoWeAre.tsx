import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Heading from "../general/Heading";
import Icon1 from "../../assets/image/icon1.png";
import Icon2 from "../../assets/image/icon2.png";
import Icon3 from "../../assets/image/icon3.png";
import Icon4 from "../../assets/image/icon4.png";
import Loader from "../general/Loader";
import { useAppSelector } from "../../hooks/hooks";
import { useTranslation } from "react-i18next";

interface AboutType {
  id: string;
  description: string;
  title: string;
}
interface ValueType {
  id: string;
  description: string;
  title: string;
}

const imgArr = [
  { id: 0, icon: Icon1 },
  { id: 1, icon: Icon2 },
  { id: 2, icon: Icon3 },
  { id: 3, icon: Icon4 },
];

const WhoWeAre = () => {
  const [about, setAbout] = useState<AboutType[] | []>([]);
  const [value, setValue] = useState<ValueType[] | []>([]);
  const [loading, setLoading] = useState(true);
  const language = useAppSelector((state) => state.langSlice.lang);
  const { t } = useTranslation();

  const getAboutData = async () => {
    try {
      const headers = {
        "x-api-key": "aebddf40-4255-4a9a-8bdb-3eea84c28bb9",
        "accept-language": language,
      };
      const res = await axios.get(
        "https://api.studentall.az:9851/api/about/list",
        {
          headers,
        }
      );
      setAbout(res.data);
      const valueRes = await axios.get(
        "https://api.studentall.az:9851/api/value/list",
        { headers }
      );
      setValue(valueRes.data);
      setLoading(false);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error("Xeta", error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    getAboutData();
  }, [language]);

  return (
    <section className="relative z-[9999]" id="about">
      {loading ? (
        <Loader />
      ) : (
        <div className="container max-sm:!p-0 max-w-[70%] min-h-[70vh] mx-auto flex justify-start flex-col">
          {about &&
            about.length > 0 &&
            about.map((about) => (
              <div key={about.id}>
                <Heading text={about.title} />
                <span
                  className="text-white desccc mt-6 text-[16px]"
                  dangerouslySetInnerHTML={{
                    __html: about.description || "",
                  }}
                />
              </div>
            ))}
          <div className="mt-12">
            <div className="rounded-3xl bg-[#ffffffa8] p-6 px-8 max-md:p-4 max-md:px-6 mt-6 w-full">
              <h4 className="titleee text-[46px] relative max-sm:text-3xl w-max text-[#033641] !font-semibold">
                {t("Dəyərlərimiz")}
              </h4>
              <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8 max-md:gap-4 text-[#033641]">
                {value &&
                  value.length > 0 &&
                  value?.map((item: ValueType, index) => (
                    <div
                      key={item.id}
                      className="flex gap-4 max-md:gap-3 items-center max-w-[450px]"
                    >
                      <div className="">
                        <img
                          className="w-[80px] aspect-auto object-cover"
                          src={imgArr[index].icon}
                          alt=""
                        />
                      </div>
                      <div>
                        <h3 className="text-[24px] quaaa font-medium max-sm:text-[18px]">
                          {item.title}
                        </h3>
                        <p
                          className="max-md:text-[14px] tittt max-sm:text-[12px]"
                          dangerouslySetInnerHTML={{
                            __html: item.description || "",
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WhoWeAre;
