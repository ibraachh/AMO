import { Helmet } from 'react-helmet-async';
import AboutView from 'src/components/dashboard/about/AboutView';

const metaData = {
  title: 'Haqqımızda',
};

export default function About() {
  return (
    <>
      <Helmet>
        <title> {metaData.title}</title>
      </Helmet>

      <AboutView />
    </>
  );
}
