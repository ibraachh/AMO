import { Helmet } from 'react-helmet-async';
import { useGetMissionById } from 'src/api/backendServies';
import SecondCardEditView from 'src/components/dashboard/about/SecondCardEditView';
import { useParams } from 'src/routes/hooks';

const metaData = {
  title: 'Kart redaktə et',
};

export default function SecondCardEdit() {
  const { id } = useParams();
  const { mission } = useGetMissionById(id ?? '');

  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
      </Helmet>

      {mission?.translations && <SecondCardEditView initialData={mission} />}
    </>
  );
}
