import { Helmet } from 'react-helmet-async';
import CompaniesView from 'src/components/dashboard/companies/CompaniesView';

const metaData = {
  title: 'Şirkətlər',
};

export default function Companies() {
  return (
    <>
      <Helmet>
        <title> {metaData.title}</title>
      </Helmet>

      <CompaniesView />
    </>
  );
}
