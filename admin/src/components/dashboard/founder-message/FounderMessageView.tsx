import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import HeadingSection from './HeadingSection';
import FounderMessageMeta from './FounderMessageMeta';

export default function FounderMessageView() {
  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Qurucu mesajı"
        links={[{ name: 'Saytın aktivliyi', href: '/dashboard' }, { name: 'Qurucu mesajı' }]}
      />

      <HeadingSection />

      <FounderMessageMeta />
    </DashboardContent>
  );
}
