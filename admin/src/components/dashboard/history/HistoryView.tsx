import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import HeadingSection from './HeadingSection';
import TimeLineCards from './TimeLineCards';
import { Divider } from '@mui/material';
import HistoryMeta from './HistoryMeta';

export default function HistoryView() {
  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Tarixçə"
        links={[{ name: 'Saytın aktivliyi', href: paths.dashboard.root }, { name: 'Tarixçə' }]}
      />

      <HeadingSection />

      <Divider className="!my-6" />

      <TimeLineCards />

      <HistoryMeta />
    </DashboardContent>
  );
}
