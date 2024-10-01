import { Helmet } from 'react-helmet-async';
import { getFile, useGetMediaById } from 'src/api/backendServies';
import MediaEditView from 'src/components/dashboard/media-center/MediaEditView';
import { useParams } from 'src/routes/hooks';

const metaData = {
  title: 'Medya redaktə et',
};

export default function MediaEdit() {
  const { id } = useParams();

  const { media } = useGetMediaById(id ?? '');

  const { file } = getFile(media?.image || '');

  console.log(media);

  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
      </Helmet>

      <MediaEditView />
    </>
  );
}
