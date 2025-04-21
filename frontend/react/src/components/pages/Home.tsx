import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import React from "react";
import HomeContent from "../home/HomeContent";
import { useAppSelector } from "../../hooks/hooks";
import Loader from "../general/Loader";
import Slider from "../home/Swiper";

export interface AboutDataType {
  id: string;
  title: string;
  description: string;
}

export interface VideoUrlType {
  id: string;
  videoUrl: string;
}

const Home: React.FC = () => {
  const [content, setContent] = useState<AboutDataType[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState<VideoUrlType[] | []>([]);
  const language = useAppSelector((state) => state.langSlice.lang);

  const fetchVideoUrl = async () => {
    try {
      const headers = {
        "x-api-key": "aebddf40-4255-4a9a-8bdb-3eea84c28bb9",
        "accept-language": ["ru", "az", "en"],
      };
      const res = await axios.get(
        "https://api.studentall.az:9851/api/video/list",
        { headers }
      );
      if (res.status !== 200) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      setVideoUrl(res.data);
    } catch (error) {
      if (isAxiosError(error))
        toast.error("Xeta", error.response?.data.message);
    }
  };

  const fetchAboutList = async () => {
    try {
      const headers = {
        "x-api-key": "aebddf40-4255-4a9a-8bdb-3eea84c28bb9",
        "accept-language": language,
      };
      const res = await axios.get(
        "https://api.studentall.az:9851/api/about/list",
        { headers }
      );
      setContent(res.data);
      setLoading(false);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error("Xeta", error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    fetchVideoUrl();
  }, []);

  useEffect(() => {
    fetchAboutList();
  }, [language]);

  return (
    <main>
      {loading ? (
        <Loader />
      ) : (
        <div className="container max-sm:!p-0 max-w-[70%] overflow-x-hidden overflow-y-hidden mx-auto flex justify-start flex-col z-[999999999999]">
          <Slider videoURL={videoUrl} />
          <HomeContent content={content} />
        </div>
      )}
    </main>
  );
};

export default Home;
