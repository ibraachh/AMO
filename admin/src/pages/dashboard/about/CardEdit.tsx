import { Helmet } from 'react-helmet-async';
import { useGetValueById } from 'src/api/backendServies';
import CardEditView from 'src/components/dashboard/about/CardEditView';
import { useParams } from 'src/routes/hooks';

const metaData = {
  title: 'Kart redaktə et',
};

export default function CardEdit() {
  const { id } = useParams();

  const { value } = useGetValueById(id ?? '');

  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
      </Helmet>

      {value?.translations && <CardEditView initialData={value} />}
    </>
  );
}
