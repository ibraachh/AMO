import { Helmet } from 'react-helmet-async';
import HistoryView from 'src/components/dashboard/history/HistoryView';

const metaData = {
  title: 'Tarixçə',
};

export default function History() {
  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
      </Helmet>

      <HistoryView />
    </>
  );
}
