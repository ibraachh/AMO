import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import HeadingSection from '../history/HeadingSection';
import { useGetAllMessage } from 'src/api/backendServies';

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
