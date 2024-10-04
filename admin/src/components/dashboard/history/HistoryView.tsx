import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { useGetAllHistory } from 'src/api/backendServies';
import { Divider } from '@mui/material';
import TimeLineCards from './TimeLineCards';
import HeadingSection from './HeadingSection';

export default function HistoryView() {
  const { history, historyLoading, mutate } = useGetAllHistory();

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Tarixçə"
        links={[{ name: 'Saytın aktivliyi', href: paths.dashboard.root }, { name: 'Tarixçə' }]}
      />

      {!historyLoading && <HeadingSection mutate={mutate} initialData={history[0]} />}

      <Divider className="!my-6" />

      <TimeLineCards />
      
    </DashboardContent>
  );
}
