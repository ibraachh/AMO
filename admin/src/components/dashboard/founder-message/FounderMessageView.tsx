import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { useGetAllMessage } from 'src/api/backendServies';
import HeadingSection from '../history/HeadingSection';

export default function FounderMessageView() {
  const { message, messageLoading, mutate } = useGetAllMessage();

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Qurucu mesajı"
        links={[{ name: 'Saytın aktivliyi', href: '/dashboard' }, { name: 'Qurucu mesajı' }]}
      />

      {!messageLoading && <HeadingSection mutate={mutate} initialData={message[0]} />}
    </DashboardContent>
  );
}
