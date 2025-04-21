import axios, { isAxiosError } from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import Loader from "../general/Loader";
import Heading from "../general/Heading";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppSelector } from "../../hooks/hooks";
import { useTranslation } from "react-i18next";

type CareerDataType = {
  id: string;
  title: string;
  date: string;
  description: string;
};

type FormDataType = {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  file: FormData | string;
};

const CareerDetail = () => {
  const [career, setCareer] = useState<CareerDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    file: "",
  });
  const [fileName, setFileName] = useState<string>("");
  const [searchParam, _] = useSearchParams();
  const { t } = useTranslation();
  const lang = useAppSelector((state) => state.langSlice.lang);

  const getCareerDataById = async () => {
    try {
      const headers = {
        "x-api-key": "aebddf40-4255-4a9a-8bdb-3eea84c28bb9",
        "accept-language": lang,
      };
      const res = await axios.get(
        `https://api.studentall.az:9851/api/career/get/${searchParam.get(
          "id"
        )}`,
        { headers }
      );
      setCareer(res.data);
      setLoading(false);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error("Xeta", error.response?.data.message);
      }
    }
  };

  const handleChangeFormData = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.file
    ) {
      toast.error("Zəhmət olmasa bütün xanaları doldurun");
      return;
    }

    const emailReg = new RegExp(
      "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}"
    );

    if (!emailReg.test(formData.email)) {
      toast.error("Email doğru yazın");
      return;
    }

    try {
      setDataLoading(true);
      const headers = {
        "x-api-key": "aebddf40-4255-4a9a-8bdb-3eea84c28bb9",
      };
      const response = await axios.post(
        "https://api.studentall.az:9851/api/file/uploadFile",
        formData.file,
        { headers }
      );
      if (response && response.data.message) {
        const applyResponse = await axios.post(
          "https://api.studentall.az:9851/api/join-us/create",
          {
            email: formData.email,
            lastName: formData.lastName,
            phoneNumber: formData.phoneNumber,
            file: response.data.message,
            name: formData.name,
          },
          {
            headers,
          }
        );
        if (applyResponse) {
          toast.success("Mesajınız uğurla gönderildi!");
          setLoading(false);
        }
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error("Xeta", error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    getCareerDataById();
  }, [lang]);

  return (
    <section className="relative z-[9999]" id="career">
      {loading ? (
        <Loader />
      ) : (
        <div className="container max-sm:!p-0 max-w-[70%] min-h-[70vh] mx-auto flex justify-start flex-col">
          <Heading text={t("Career")} />
          {career ? (
            <div className="w-full mt-10 flex flex-col gap-8">
              <div className="carrer-item flex justify-between pb-8 text-white border-b-2 border-b-[#FFFFFF80]">
                <div className="left">
                  <div>
                    <span className="text-[32px] max-sm:text-[22px]">
                      {career.title}
                    </span>
                    <p className="max-sm:text-[14px] text-[17px]">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: career.description || "",
                        }}
                      />
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
            </div>
          ) : null}
          <div className="w-full mt-[90px]">
            <h4 className="text-[49px] relative w-max !text-white !font-semibold max-sm:!text-[30px]">
              {t("Join us")}
            </h4>

            <div className="my-8">
              <form
                className="p-16 apply-form bg-[#dcdcdc66] rounded-xl max-md:p-12 max-sm:p-10 flex-col gap-10 w-2/3 max-lg:w-full"
                action=""
                onSubmit={handleSubmit}
              >
                <div className="inputRow max-md:flex-col w-full gap-10 flex">
                  <div className="flex w-1/2 max-md:w-full h-max flex-col gap-3">
                    <label className="text-[#fff] text-[14px]" htmlFor="name">
                      {t("First Name")}
                    </label>
                    <input
                      name="name"
                      className="border-0 outline-none bg-transparent text-[#fff] !border-b-2 !border-b-[#fff] placeholder:text-white py-2"
                      type="text"
                      placeholder="John"
                      value={formData.name}
                      id="name"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChangeFormData(e)
                      }
                    />
                  </div>
                  <div className="flex w-1/2 max-md:w-full h-max flex-col gap-3">
                    <label
                      className="text-[#fff] text-[14px]"
                      htmlFor="lastName"
                    >
                      {t("Last Name")}
                    </label>
                    <input
                      name="lastName"
                      className="border-0 outline-none bg-transparent text-[#fff] !border-b-2 !border-b-[#fff] placeholder:text-white py-2"
                      type="text"
                      placeholder="Doe"
                      id="name"
                      value={formData.lastName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChangeFormData(e)
                      }
                    />
                  </div>
                </div>
                <div className="inputRow max-md:flex-col w-full gap-10 flex">
                  <div className="flex w-1/2 max-md:w-full h-max flex-col gap-3">
                    <label className="text-[#fff] text-[14px]" htmlFor="email">
                      {t("Email")}
                    </label>
                    <input
                      name="email"
                      className="border-0 outline-none bg-transparent text-[#fff] !border-b-2 !border-b-[#fff] placeholder:text-white py-2"
                      type="text"
                      placeholder="John@example.com"
                      id="name"
                      value={formData.email}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChangeFormData(e)
                      }
                    />
                  </div>
                  <div className="flex w-1/2 max-md:w-full h-max flex-col gap-3">
                    <label
                      className="text-[#fff] text-[14px]"
                      htmlFor="phoneNumber"
                    >
                      {t("Phone Number")}
                    </label>
                    <input
                      name="phoneNumber"
                      className="border-0 outline-none bg-transparent text-[#fff] !border-b-2 !border-b-[#fff] placeholder:text-white py-2"
                      type="text"
                      placeholder="+1 012 3456 789"
                      id="name"
                      value={formData.phoneNumber}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChangeFormData(e)
                      }
                    />
                  </div>
                </div>
                <div className="inputRow max-md:flex-col w-full gap-10 flex mt-2">
                  <div className="flex w-full pb-2 max-md:w-full h-max flex-col gap-3 border-b-2 border-b-[#fff]">
                    <label className="text-[#fff] text-[14px]" htmlFor="file">
                      {t("Upload your CV")}
                    </label>
                    <label
                      htmlFor="file"
                      className="text-[#FFFFFF80] cursor-pointer flex justify-between items-center pr-2"
                    >
                      {fileName ? fileName : "Upload your CV"}
                      <Icon
                        icon="simple-line-icons:paper-clip"
                        width="24"
                        height="24"
                        style={{ color: "#fff" }}
                      />
                    </label>
                    <input
                      type="file"
                      name="file"
                      id="file"
                      className="hidden"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files && e.target.files[0]) {
                          const fileData = new FormData();
                          fileData.append("file", e.target.files[0]);
                          fileData.append("fileName", e.target.files[0].name);
                          setFormData((prev) => ({
                            ...prev,
                            file: fileData,
                          }));
                          setFileName(e.target.files[0].name);
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="cursor-pointer px-8 py-4 max-sm:!px-6 max-md:!text-[16px] max-sm:!w-max max-sm:!py-3 bg-white rounded-xl font-semibold"
                  >
                    {dataLoading ? t("Sending...") : t("Send Message")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CareerDetail;
