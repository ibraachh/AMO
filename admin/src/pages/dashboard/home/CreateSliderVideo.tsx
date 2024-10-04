import { Helmet } from 'react-helmet-async';
import CreateSliderVideoView from 'src/components/dashboard/home/CreateSliderVideoView';

const metaData = {
  title: 'Yeni video əlavə et',
};

export default function CreateSliderVideo() {
  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
      </Helmet>
      
      <CreateSliderVideoView />
    </>
  );
}
