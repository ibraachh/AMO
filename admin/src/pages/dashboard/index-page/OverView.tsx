import { Helmet } from 'react-helmet-async';
import StatisticView from 'src/components/dashboard/overview/StatisticView';

const metaData = {
  title: 'Statistika',
};

export default function OverView() {
  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
      </Helmet>

      <StatisticView />
    </>
  );
}
