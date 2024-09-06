import { Helmet } from 'react-helmet-async';
import CareerCreateView from 'src/components/dashboard/career/CareerCreateView';

const metaData = {
  title: 'Karyera yarat',
};

export default function CareerCreate() {
  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
      </Helmet>

      <CareerCreateView />
    </>
  );
}
