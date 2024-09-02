import SectionTop from './SectionTop';
import SectionCenter from './SectionCenter';
import { Divider } from '@mui/material';
import SectionBottom from './SectionBottom';
import AboutMeta from './AboutMeta';
import { DashboardContent } from 'src/layouts/dashboard';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';

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
