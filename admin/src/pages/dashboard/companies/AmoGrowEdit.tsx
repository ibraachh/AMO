import { Helmet } from 'react-helmet-async';
import AmoGrowEditView from 'src/components/dashboard/companies/AmoGrowEditView';

const metaData = {
  title: 'Amogrow redaktə et',
};

export default function AmoGrowEdit() {
  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
      </Helmet>

      <AmoGrowEditView />
    </>
  );
}
