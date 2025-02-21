import type { Contact } from 'src/utils/types';

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
import { createContact, updateContact } from 'src/api/backendServies';
import { useRouter } from 'src/routes/hooks';
import { CustomBreadcrumbs } from '../../custom-breadcrumbs';

export const ContactSchema = zod.object({
  phoneNumber: zod.string().min(1, { message: 'Telefon tələb olunur!' }),
  email: zod.string().min(1, { message: 'Email tələb olunur!' }),
  fax: zod.string().min(1, { message: 'Fax tələb olunur!' }),
  city: zod.string().min(1, { message: 'Şəhər tələb olunur!' }),
  socials: zod.record(zod.string().nullable()), // socials as an object with key-value pairs
  location: zod.string().min(1, { message: 'Lokasiya tələb olunur!' }),
});

export interface IContactInfo {
  id?: string;
  phoneNumber?: string;
  email?: string;
  fax?: string;
  city?: string;
  socials?: Record<string, string | null | undefined>;
  location?: string;
}

export default function ContactEditView() {
  const location = useLocation();
  const router = useRouter();
  const { contacts } = location.state || {};

  const [open, setOpen] = useState(false);
  const [socialName, setSocialName] = useState('');
  const [socialLink, setSocialLink] = useState('');
  const [changedValues, setChangedValues] = useState<Contact>(contacts || { socials: {} });

  const methods = useForm<IContactInfo>({
    resolver: zodResolver(ContactSchema),
    defaultValues: contacts || {},
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    if (contacts) {
      // Initialize additional socials with contact socials if present
      setChangedValues((prev) => ({
        ...prev,
        socials: { ...contacts.socials },
      }));
    }
  }, [contacts]);

  const onSubmit = async () => {
    try {
      const response =
        contacts === undefined || contacts === null
          ? await createContact(changedValues)
          : await updateContact(contacts.id, changedValues);
      if (response.data) {
        toast.success('Əlaqə məlumatları dəyişdirildi');

        setTimeout(() => {
          router.push(paths.dashboard.contact.root);
          router.refresh();
        }, 1000);
      }
    } catch (error) {
      toast.error('Xəta baş verdi');
    }
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
              name="fax"
              label="Fax"
              value={methods.watch('fax')}
              onChange={(e) => handleFieldChange('fax', e.target.value)}
            />

            <Field.Text
              name="city"
              label="Şəhər"
              value={methods.watch('city')}
              onChange={(e) => handleFieldChange('city', e.target.value)}
            />
            <Field.Text
              name="location"
              label="Lokasiya"
              value={methods.watch('location')}
              onChange={(e) => handleFieldChange('location', e.target.value)}
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
              + Sosial Medya Əlavə Et
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
        <DialogTitle>Sosial Medya Əlavə Et</DialogTitle>
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
