import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { Iconify } from 'src/components/iconify';
import { Button } from '@mui/material';
import { CareerListView } from './CareerListView';

export default function CareerView() {
  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Kariyer"
        links={[{ name: 'Saytın aktivliyi', href: paths.dashboard.root }, { name: 'Kariyer' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.career.create}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Yeni iş əlavə et
          </Button>
        }
      />

      <CareerListView />
    </DashboardContent>
  );
}
