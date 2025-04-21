import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Heading from "../general/Heading";
import { isAxiosError } from "axios";
import { endpoints, useFetch, usePost } from "../../utils/useApi";
import "../../assets/css/contact.css";
import { toast } from "sonner";
import Loader from "../general/Loader";
import { useTranslation } from "react-i18next";

type FormDataType = {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
};

type ContactDataType = {
  id: string;
  phoneNumber: string;
  email: string;
  city: string;
  location: string;
};

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [contact, setContact] = useState<ContactDataType[] | []>([]);
  const [sendMessage, setSendMessage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { t } = useTranslation();
  const language = localStorage.getItem("i18nextLng");

  const getContactList = async () => {
    try {
      const header = {
        "x-api-key": "aebddf40-4255-4a9a-8bdb-3eea84c28bb9",
        "accept-language": language,
      };
      const res = await useFetch(endpoints.contact.list, header);
      setContact(res);
      setLoading(false);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
        throw error;
      }
    }
  };

  const changeFormData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hadnleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.lastName ||
      !formData.email ||
      !formData.message ||
      !formData.phoneNumber
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
      setSendMessage(true);
      const res = await usePost(endpoints.contact.create, formData);
      toast.success("Your message has been sent successfully");
      setFormData({
        name: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
      setSendMessage(false);
      return res;
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error("Göndərmək olmadı", error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    getContactList();
  }, []);

  return (
    <section className="relative z-[9999]" id="contact">
      {loading ? (
        <Loader />
      ) : (
        <div className="container max-sm:!p-0 max-w-[70%] min-h-[70vh] mx-auto flex justify-start flex-col">
          <Heading text={t("Contact us")} />
          <div className="contactForm gap-8 my-8 max-lg:flex-col max-lg:!items-start">
            <form
              className="p-20 max-md:p-16 max-sm:p-6 flex-col gap-10 w-2/3 max-lg:w-full contact-us-form"
              action=""
              onSubmit={hadnleSubmit}
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
                    id="name"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      changeFormData(e)
                    }
                  />
                </div>
                <div className="flex w-1/2 max-md:w-full h-max flex-col gap-3">
                  <label className="text-[#fff] text-[14px]" htmlFor="lastName">
                    {t("Last Name")}
                  </label>
                  <input
                    name="lastName"
                    className="border-0 outline-none bg-transparent text-[#fff] !border-b-2 !border-b-[#fff] placeholder:text-white py-2"
                    type="text"
                    placeholder="Doe"
                    id="lastName"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      changeFormData(e)
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
                    type="email"
                    placeholder="John@example.com"
                    id="email"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      changeFormData(e)
                    }
                  />
                </div>
                <div className="flex w-1/2 max-md:w-full h-max flex-col gap-3">
                  <label
                    className="text-[#fff] text-[14px]"
                    htmlFor="phonenumber"
                  >
                    {t("Phone Number")}
                  </label>
                  <input
                    name="phoneNumber"
                    className="border-0 outline-none bg-transparent text-[#fff] !border-b-2 !border-b-[#fff] placeholder:text-white py-2"
                    type="text"
                    placeholder="+1 012 3456 789"
                    id="phonenumber"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      changeFormData(e)
                    }
                  />
                </div>
              </div>
              <div className="inputRow w-full gap-10 flex">
                <div className="flex w-full h-max flex-col gap-3">
                  <label className="text-[#fff] text-[14px]" htmlFor="message">
                    {t("Message")}
                  </label>
                  <textarea
                    name="message"
                    className="border-0 resize-none outline-none bg-transparent text-[#fff] !border-b-2 !border-b-[#fff] placeholder:text-white py-2"
                    placeholder="Write your message.."
                    id="message"
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      changeFormData(e)
                    }
                  ></textarea>
                </div>
              </div>
              <div className="alert"></div>
              <div className="flex justify-end">
                <button
                  onClick={hadnleSubmit}
                  type="submit"
                  className="px-8 cursor-pointer py-4 max-sm:!px-6 max-md:!text-[16px] max-sm:!w-max max-sm:!py-3 bg-white rounded-xl font-semibold submitButton"
                >
                  {sendMessage ? t("Sending...") : t("Send Message")}
                </button>
              </div>
            </form>
            <div className="text-white flex flex-col gap-3">
              {contact &&
                contact.length > 0 &&
                contact?.map((contact: ContactDataType) => (
                  <div key={contact.id}>
                    {" "}
                    <div className="flex flex-col gap-1 text-[16px]">
                      <span>
                        Tel:{" "}
                        <span className="phone">{contact.phoneNumber}</span>
                      </span>
                      <span>
                        E-mail: <span className="email">{contact.email}</span>
                      </span>
                    </div>
                    <div className="text-[16px]">
                      <h4 className="text-[24px] font-semibold">
                        <span className="city">{contact.city}</span>
                      </h4>
                      <address className="max-w-[300px]">
                        <span className="location">{contact.location}</span>
                      </address>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactUs;
