import { Helmet } from 'react-helmet-async';
import ContactEditView from 'src/components/dashboard/contact/ContactEditView';

const metaData = {
  title: 'Əlaqə redaktə et',
};

export default function ContactEdit() {
  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
      </Helmet>

      <ContactEditView />
    </>
  );
}
