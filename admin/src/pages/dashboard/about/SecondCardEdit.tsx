import { Helmet } from 'react-helmet-async';
import SecondCardEditView from 'src/components/dashboard/about/SecondCardEditView';

const metaData = {
  title: 'Kart redaktə et',
};

export default function SecondCardEdit() {
  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
      </Helmet>

      <SecondCardEditView />
    </>
  );
}
