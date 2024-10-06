import { Helmet } from 'react-helmet-async';
import MediaEditView from 'src/components/dashboard/media-center/MediaEditView';

const metaData = {
  title: 'Medya redaktə et',
};

export default function MediaEdit() {
  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
      </Helmet>

      <MediaEditView />
    </>
  );
}
