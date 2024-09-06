import { Helmet } from 'react-helmet-async';
import CareerEditView from 'src/components/dashboard/career/CareerEditView';

const metadata = {
  title: 'Karyera redaktə et',
};

export default function CareerEdit() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <CareerEditView />
    </>
  );
}
