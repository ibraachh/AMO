import { Helmet } from 'react-helmet-async';
import { useGetChronologyById } from 'src/api/backendServies';
import TimeLineCardEditView from 'src/components/dashboard/history/TimeLineCardEditView';
import { useParams } from 'src/routes/hooks';

const metaData = {
  title: 'Kart redaktə et',
};

export default function TimeLineCardEdit() {
  const { id } = useParams();

  const { chronology, chronologyLoading } = useGetChronologyById(id ?? '');

  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
      </Helmet>

      {!chronologyLoading && <TimeLineCardEditView initialData={chronology} />}
    </>
  );
}
