import { Helmet } from 'react-helmet-async';
import HomeView from 'src/components/dashboard/home/HomeView';

const metaData = {
  title: 'Home',
};
export default function Home() {
  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
      </Helmet>

      <HomeView />
    </>
  );
}
