import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Heading from "../general/Heading";
import Timeline from "../ui/Timeline";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../hooks/hooks";
import Loader from "../general/Loader";

export type TimelineType = {
  id: string;
  description: string;
  title: string;
};

const History = () => {
  const [timeline, setTimeline] = useState<TimelineType[] | []>([]);
  const [loading, setLoading] = useState(true);
  const language = useAppSelector((state) => state.langSlice.lang);
  const { t } = useTranslation();

  const fetchChronologyList = async () => {
    try {
      const headers = {
        "x-api-key": "aebddf40-4255-4a9a-8bdb-3eea84c28bb9",
        "accept-language": language,
      };

      const res = await axios.get(
        "https://api.studentall.az:9851/api/chronology/list",
        { headers }
      );
      setTimeline(res.data);
      setLoading(false);
    } catch (error) {
      if (isAxiosError(error))
        toast.error("Xeta", error.response?.data.message);
    }
  };

  useEffect(() => {
    fetchChronologyList();
  }, [language]);

  return (
    <section className="relative z-[9999]" id="history">
      {loading ? (
        <Loader />
      ) : (
        <div className="container max-sm:!p-0 max-w-[70%] min-h-[70vh] mx-auto flex justify-start flex-col">
          <Heading
            text={`"AMO CORPORATE GROUP"`}
            paragraph={t(
              "1995-ci ildən kənd təsərrüfatı məhsulları, onların idxalı və ixracı, HORECA çatdırılma üsulu və beynəlxalq daşıma sahəsində fəaliyyət göstərən korporativ şirkətlər qrupudur."
            )}
          />
          <Timeline timeline={timeline} />
        </div>
      )}
    </section>
  );
};

export default History;
