import { Button, Card, Stack, TextField } from '@mui/material';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

export default function ContactView() {
  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Əlaqə"
        links={[{ name: 'Saytın aktivliyi', href: paths.dashboard.root }, { name: 'Əlaqə' }]}
        action={
          <Button component={RouterLink} href={paths.dashboard.contact.edit} variant="contained">
            Redaktə et
          </Button>
        }
      />

      <Card className="p-6 mt-4">
        <Stack spacing={3}>
          <TextField label="Əlaqə" className="w-full" value="+994 50 123 45 67" disabled />
          <TextField label="Email" className="w-full" value="Email@example.com" disabled />
          <TextField label="Fax" className="w-full" value="Fax: +994 50 123 45 67" disabled />
          <TextField label="Location" className="w-full" value="Baku, Azerbaijan" disabled />
          <TextField label="Instagram" className="w-full" value="instagram.com" disabled />
        </Stack>
      </Card>
    </DashboardContent>
  );
}
