import { Helmet } from 'react-helmet-async';
import ContactView from 'src/components/dashboard/contact/ContactView';

const metaData = {
  title: 'Əlaqə',
};

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
      </Helmet>

      <ContactView />
    </>
  );
}
