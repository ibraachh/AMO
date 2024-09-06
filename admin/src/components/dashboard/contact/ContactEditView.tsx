import { useState, useEffect } from 'react';
import {
  Button,
  Card,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { DashboardContent } from 'src/layouts/dashboard';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { paths } from 'src/routes/paths';

import { Field, Form } from 'src/components/hook-form';
import { ChipDeleteIcon } from 'src/theme/core/components/chip';
import { toast } from 'sonner';
import { z as zod } from 'zod';
import { CustomBreadcrumbs } from '../../custom-breadcrumbs';

export const ContactSchema = zod.object({
  phoneNumber: zod.string().min(1, { message: 'Telefon tələb olunur!' }),
  email: zod.string().min(1, { message: 'Email tələb olunur!' }),
  socials: zod.record(zod.string().nullable()), // socials as an object with key-value pairs
  workingHours: zod.string().min(1, { message: 'İş saatı tələb olunur!' }),
  location: zod.string().min(1, { message: 'Lokasiya tələb olunur!' }),
});

export interface IContactInfo {
  id?: string;
  phoneNumber?: string;
  email?: string;
  socials?: Record<string, string | null | undefined>;
  workingHours?: string;
  location?: string;
}

export default function ContactEditView() {
  const location = useLocation();
  // const navigate = useNavigate();
  const { contact } = location.state || {};

  const [open, setOpen] = useState(false);
  const [socialName, setSocialName] = useState('');
  const [socialLink, setSocialLink] = useState('');
  const [changedValues, setChangedValues] = useState<IContactInfo>(contact || { socials: {} });

  const methods = useForm<IContactInfo>({
    resolver: zodResolver(ContactSchema),
    defaultValues: contact || {},
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    if (contact) {
      // Initialize additional socials with contact socials if present
      setChangedValues((prev) => ({
        ...prev,
        socials: { ...contact.socials },
      }));
    }
  }, [contact]);

  const onSubmit = async () => {
    // try {
    //   const response =
    //     contact === undefined || contact === null
    //       ? await createContact(changedValues)
    //       : await updateContact(contact?.id || '', changedValues);
    //   if (response.data) {
    //     navigate(paths.dashboard.contact.list);
    //     toast.success('Kontakt info dəyişdirildi');
    //   }
    // } catch (error) {
    //   toast.error('Xəta baş verdi');
    // } finally {
    //   if (mutate) {
    //     mutate();
    //   }
    // }
  };

  const handleFieldChange = (field: keyof IContactInfo, value: string) => {
    setChangedValues((prev) => ({
      ...prev,
      [field]: value,
    }));
    setValue(field, value);
  };

  const handleAddSocial = () => {
    if (!socialName || !socialLink) {
      return toast.error('Sosial media adı və link daxil edin!');
    }

    setChangedValues((prev) => ({
      ...prev,
      socials: {
        ...prev.socials,
        [socialName]: socialLink,
      },
    }));

    setValue(`socials.${socialName}`, socialLink);
    setSocialName('');
    setSocialLink('');
    setOpen(false);
    return true;
  };

  const handleDeleteSocial = (name: string) => {
    setChangedValues((prev) => {
      const updatedSocials = { ...prev.socials };
      delete updatedSocials[name];
      return {
        ...prev,
        socials: updatedSocials,
      };
    });

    setValue(`socials.${name}`, '');
  };

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Redaktə et"
        links={[
          { name: 'Saytın aktivliyi', href: paths.dashboard.root },
          { name: 'Əlaqə', href: paths.dashboard.contact.root },
          { name: 'Redaktə et' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card className="p-8">
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack className="space-y-6">
            <Field.Text
              name="phoneNumber"
              label="Telefon"
              value={methods.watch('phoneNumber')}
              onChange={(e) => handleFieldChange('phoneNumber', e.target.value)}
            />
            <Field.Text
              name="email"
              label="Email"
              value={methods.watch('email')}
              onChange={(e) => handleFieldChange('email', e.target.value)}
            />
            <Field.Text
              name="location"
              label="Lokasiya"
              value={methods.watch('location')}
              onChange={(e) => handleFieldChange('location', e.target.value)}
            />
            <Field.Text
              name="workingHours"
              label="İş saatı"
              value={methods.watch('workingHours')}
              onChange={(e) => handleFieldChange('workingHours', e.target.value)}
            />

            {Object.entries(changedValues.socials || {}).map(([key, value]) => (
              <Stack direction="row" alignItems="center" spacing={2} key={key}>
                <Field.Text
                  name={`socials.${key}`}
                  label={`${key[0].toUpperCase() + key.slice(1)} Link`}
                  value={methods.watch(`socials.${key}`)}
                  onChange={(e) => {
                    setChangedValues((prev) => ({
                      ...prev,
                      socials: {
                        ...prev.socials,
                        [key]: e.target.value,
                      },
                    }));
                    setValue(`socials.${key}`, e.target.value);
                  }}
                />
                <IconButton
                  color="secondary"
                  onClick={() => handleDeleteSocial(key)}
                  aria-label={`delete ${key}`}
                >
                  <ChipDeleteIcon />
                </IconButton>
              </Stack>
            ))}

            <Button variant="outlined" onClick={() => setOpen(true)}>
              + Sosial Media Əlavə Et
            </Button>
          </Stack>
          <div className="flex justify-end my-3 mt-8">
            <Button type="submit" variant="contained">
              Yadda saxla
            </Button>
          </div>
        </Form>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Sosial Media Əlavə Et</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Sosial Media Adı"
            fullWidth
            variant="outlined"
            value={socialName}
            onChange={(e) => setSocialName(e.target.value)}
          />

          <TextField
            margin="dense"
            label="Link"
            fullWidth
            variant="outlined"
            value={socialLink}
            onChange={(e) => setSocialLink(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Ləğv et</Button>
          <Button onClick={handleAddSocial}>Əlavə et</Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
