import { Helmet } from 'react-helmet-async';
import MediaCreateView from 'src/components/dashboard/media-center/MediaCreateView';

const metaData = {
  title: 'Medya əlavə et',
};

export default function MediaCreate() {
  return (
    <>
      <Helmet>
        <title> {metaData.title}</title>
      </Helmet>

      <MediaCreateView />
    </>
  );
}
