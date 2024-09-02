import { Helmet } from 'react-helmet-async';
import TimeLineCardCreateView from 'src/components/dashboard/history/TimeLineCardCreateView';

const metaData = {
  title: 'Kart əlavə et',
};

export default function TimeLineCardCreate() {
  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
      </Helmet>

      <TimeLineCardCreateView />
    </>
  );
}
