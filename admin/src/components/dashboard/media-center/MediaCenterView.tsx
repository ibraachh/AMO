import { Button } from '@mui/material';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import { MediaListView } from 'src/components/media/view';
import { DashboardContent } from 'src/layouts/dashboard';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

export default function MediaCenterView() {
  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Medya mərkəzi"
        links={[
          { name: 'Saytın aktivliyi', href: paths.dashboard.root },
          { name: 'Medya mərkəzi' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.mediaCenter.create}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Yeni medya əlavə et
          </Button>
        }
      />

      <MediaListView />
    </DashboardContent>
  );
}
