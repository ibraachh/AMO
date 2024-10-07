import { DashboardContent } from 'src/layouts/dashboard';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { Button, Card } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import { Iconify } from 'src/components/iconify';
import { useGetVideos } from 'src/api/backendServies';
import { SliderList } from './slider/slider-list';

export default function HomeView() {
  const { videos, mutate } = useGetVideos();
  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Ana səhifə"
        links={[{ name: 'Ana səhifə', href: paths.dashboard.root }, { name: 'Slayder videoları' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.home.createSliderVideo}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Yeni video əlavə et
          </Button>
        }
      />
      <div className="flex w-full mx-auto">
        <Card className="p-6 mt-4 w-full">
          <SliderList mutate={mutate} data={videos} />
        </Card>
      </div>
    </DashboardContent>
  );
}
