import { Helmet } from 'react-helmet-async';
import AmoTradeEditView from 'src/components/dashboard/companies/AmoTradeEditView';

const metaData = {
  title: 'Amotrade redaktə et',
};

export default function AmoTradeEdit() {
  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
      </Helmet>

      <AmoTradeEditView />
    </>
  );
}
