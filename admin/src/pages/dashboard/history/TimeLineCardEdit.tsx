import { Helmet } from 'react-helmet-async';
import TimeLineCardEditView from 'src/components/dashboard/history/TimeLineCardEditView';

const metaData = {
  title: 'Kart redaktə et',
};

export default function TimeLineCardEdit() {
  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
      </Helmet>

      <TimeLineCardEditView />
    </>
  );
}
