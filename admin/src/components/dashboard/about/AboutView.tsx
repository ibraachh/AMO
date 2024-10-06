import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Divider } from '@mui/material';
import SectionTop from './SectionTop';
import SectionCenter from './SectionCenter';
import SectionBottom from './SectionBottom';
import AboutMeta from './AboutMeta';

export default function AboutView() {
  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Haqqımızda"
        links={[{ name: 'Saytın aktivliyi', href: paths.dashboard.root }, { name: 'Haqqımızda' }]}
      />

      <SectionTop />

      <Divider className="!my-6" />

      <SectionCenter />

      <Divider className="!my-6" />

      <SectionBottom />

      <AboutMeta />
    </DashboardContent>
  );
}
