import { Helmet } from 'react-helmet-async';
import CardEditView from 'src/components/dashboard/about/CardEditView';

const metaData = {
  title: 'Kart redaktə et',
};

export default function CardEdit() {
  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
      </Helmet>

      <CardEditView />
    </>
  );
}
