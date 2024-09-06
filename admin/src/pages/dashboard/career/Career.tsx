import { Helmet } from 'react-helmet-async';
import CareerView from 'src/components/dashboard/career/CareerView';

const metaData = {
  title: 'Karyera',
};

export default function Career() {
  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
      </Helmet>

      <CareerView />
    </>
  );
}
