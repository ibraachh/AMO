import { Helmet } from 'react-helmet-async';
import FounderMessageView from 'src/components/dashboard/founder-message/FounderMessageView';

const metaData = {
  title: 'Qurucu mesajı',
};

export default function FounderMessage() {
  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
      </Helmet>

      <FounderMessageView />
    </>
  );
}
