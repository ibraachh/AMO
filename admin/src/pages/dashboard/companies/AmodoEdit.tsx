import { Helmet } from 'react-helmet-async';
import AmodoEditView from 'src/components/dashboard/companies/AmodoEditView';

const metaData = {
  title: 'Amodo redaktə et',
};

export default function AmodoEdit() {
  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
      </Helmet>

      <AmodoEditView />
    </>
  );
}
