import { Button, Card, Stack, TextField } from '@mui/material';
import { useGetContactList } from 'src/api/backendServies';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

export default function ContactView() {
  const { contacts, contactsEmpty } = useGetContactList();

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Əlaqə"
        links={[{ name: 'Saytın aktivliyi', href: paths.dashboard.root }, { name: 'Əlaqə' }]}
        action={
          <Button
            variant="contained"
            component={RouterLink}
            href={paths.dashboard.contact.edit}
            state={{
              contacts: {
                id: contacts[0]?.id,
                phoneNumber: contacts[0]?.phoneNumber,
                email: contacts[0]?.email,
                fax: contacts[0]?.fax,
                city: contacts[0]?.city,
                location: contacts[0]?.location,
                socials: contacts[0]?.socials,
              },
            }}
          >
            Düzəliş et
          </Button>
        }
      />

      <Card className="p-6 mt-4">
        <Stack spacing={3}>
          {!contactsEmpty && (
            <>
              <TextField
                value={contacts[0]?.phoneNumber || ''}
                disabled
                name="phoneNumber"
                label="Telefon"
              />
              <TextField value={contacts[0]?.email || ''} disabled name="email" label="E-mail" />
              <TextField value={contacts[0]?.fax || ''} disabled name="fax" label="Fax" />
              <TextField value={contacts[0]?.city || ''} disabled name="city" label="Şəhər" />
              <TextField
                value={contacts[0]?.location || ''}
                disabled
                name="location"
                label="Lokasiya"
              />

              {contacts[0]?.socials && (
                <>
                  {Object.entries(contacts[0]?.socials)?.map(([key, value]) => (
                    <TextField key={key} value={value || ''} disabled name={key} label={key} />
                  ))}
                </>
              )}
            </>
          )}
        </Stack>
      </Card>
    </DashboardContent>
  );
}
