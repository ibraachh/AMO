import { Helmet } from 'react-helmet-async';
import MediaCenterView from 'src/components/dashboard/media-center/MediaCenterView';

const metaData = {
  title: 'Medya Mərkəzi',
};

export default function MediaCenter() {
  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
      </Helmet>

      <MediaCenterView />
    </>
  );
}
