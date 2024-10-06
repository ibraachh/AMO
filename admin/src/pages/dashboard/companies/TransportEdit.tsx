import { Helmet } from 'react-helmet-async';
import TransportEditView from 'src/components/dashboard/companies/TransportEditView';

const metaData = {
  title: 'Amodo redaktə et',
};

export default function TransportEdit() {
  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
      </Helmet>

      <TransportEditView />
    </>
  );
}
