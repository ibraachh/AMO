import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Divider } from '@mui/material';
import { useGetAllInfo, useGetAllMissions, useGetAllValues } from 'src/api/backendServies';
import { LoadingScreen } from 'src/components/loading-screen';
import SectionTop from './SectionTop';
import SectionBottom from './SectionBottom';
import ValueCards from './ValueCards';

export default function AboutView() {
  const { data } = useGetAllInfo();
  const { values } = useGetAllValues();
  const { missions } = useGetAllMissions();

  if (!data || !values || !missions) {
    return <LoadingScreen />;
  }

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Haqqımızda"
        links={[{ name: 'Saytın aktivliyi', href: paths.dashboard.root }, { name: 'Haqqımızda' }]}
      />

      <SectionTop initialData={data[0]} />

      <Divider className="!my-6" />

      <ValueCards values={values} />

      <Divider className="!my-6" />

      <SectionBottom missions={missions} />
    </DashboardContent>
  );
}
