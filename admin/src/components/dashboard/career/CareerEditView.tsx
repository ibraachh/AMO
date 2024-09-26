import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, Stack, Button, Typography } from '@mui/material';

import { Form, Field } from 'src/components/hook-form';

import { toast } from 'sonner';
import CustomTimeline from 'src/components/timeline/CustomTimeline';
import { getLanguages } from 'src/utils/data';
import type { Translation } from 'src/utils/types';
import { DashboardContent } from 'src/layouts/dashboard';
import { useGetCareerById } from 'src/api/backendServies';
import { useParams, useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

export type NewProductSchemaType = zod.infer<typeof NewProductSchema>;

export const NewProductSchema = zod.object({
  title: zod.string().min(1, { message: 'Başlıq tələb olunur!' }),
  description: zod.string().min(1, { message: 'Açıqlama tələb olunur!' }),
  expiredDate: zod.string().optional(), // ISO string olarak ayarlandı
});

interface ProductData {
  translations: Translation[];
}

export interface Language {
  id: string;
  name: string;
  code: string;
}

export default function CareerEditView() {
  const { id } = useParams();
  const { career } = useGetCareerById(id ?? '');
  const { translations } = career || { translations: [] };
  const router = useRouter();
  const [step, setStep] = useState(0);

  const languages: Language[] = getLanguages;

  const defaultValues = useMemo(() => {
    const translation = translations.find((t) => t.languageCode === languages[step].code);
    return {
      title: translation?.title || '',
      description: translation?.description || '',
      expiredDate: translation?.expiredDate
        ? new Date(translation.expiredDate).toISOString()
        : undefined,
    };
  }, [translations, step, languages]);

  const methods = useForm<NewProductSchemaType>({
    resolver: zodResolver(NewProductSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const onSubmit = handleSubmit(async (data) => {
    const newTranslation = {
      languageCode: languages[step].code,
      title: data.title,
      description: data.description,
      expiredDate: data.expiredDate,
    };

    const updatedProductData: ProductData = {
      translations: [
        ...translations.filter((t) => t.languageCode !== languages[step].code),
        newTranslation,
      ],
    };

    if (step < languages.length - 1) {
      setStep((prev) => prev + 1);
      const nextTranslation = translations.find((t) => t.languageCode === languages[step + 1].code);
      reset({
        title: nextTranslation?.title || '',
        description: nextTranslation?.description || '',
        expiredDate: nextTranslation?.expiredDate
          ? new Date(nextTranslation.expiredDate).toISOString()
          : undefined,
      });
    } else {
      console.log(updatedProductData);
      toast.success('Məlumatlar uğurla yeniləndi!');
      setTimeout(() => {
        router.push(paths.dashboard.career.root);
        router.refresh();
      }, 800);
    }
  });

  return (
    <DashboardContent maxWidth="xl">
      <div className="flex w-full mx-auto">
        <Card className="w-full" sx={{ my: 3 }}>
          <Typography variant="h6" className="!text-sm" sx={{ p: 3 }}>
            Zəhmət olmasa aşağıdakı məlumatları {languages[step].name} dilində daxil edin.
          </Typography>
          <Form methods={methods} className="!w-full" onSubmit={onSubmit}>
            <Stack spacing={3} className="w-full" sx={{ p: 3 }}>
              <Field.Text
                className="!w-full"
                name="title"
                label="Başlıq"
                error={!!errors.title}
                helperText={errors.title?.message}
              />
              <Field.Editor
                key={languages[step].code}
                name="description"
                error={!!errors.description}
                helperText={errors.description?.message}
              />
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Bitmə tarixi</Typography>
                <Field.DatePicker
                  disabled={step !== 0}
                  onChange={(date) => {
                    if (date) {
                      const isoString = date.toISOString();
                      setValue('expiredDate', isoString);
                    }
                  }}
                  name="expiredDate"
                />
              </Stack>

              <div className={`flex ${step === 0 ? 'justify-end' : 'justify-between'} mt-3`}>
                {step > 0 && (
                  <Button
                    type="button"
                    className="!bg-[#1C252E] !w-max !px-4 !py-3 gap-2 !text-white !rounded-xl"
                    onClick={() => {
                      const previousLanguageCode = languages[step - 1].code;
                      const previousTranslation = translations.find(
                        (t) => t.languageCode === previousLanguageCode
                      );
                      if (previousTranslation) {
                        setValue('title', previousTranslation.title);
                        setValue('description', previousTranslation.description);
                        setValue(
                          'expiredDate',
                          previousTranslation.expiredDate
                            ? new Date(previousTranslation.expiredDate).toISOString()
                            : undefined
                        );
                      } else {
                        reset(defaultValues);
                      }
                      setStep((prev) => prev - 1);
                    }}
                  >
                    Geri
                  </Button>
                )}
                <Button
                  type="submit"
                  className="!bg-[#1C252E] !w-max !px-4 !py-3 gap-2 !text-white !rounded-xl"
                >
                  {step === languages.length - 1 ? 'Yadda saxla' : 'Davam et'}
                </Button>
              </div>
            </Stack>
          </Form>
        </Card>
        <CustomTimeline step={step} />
      </div>
    </DashboardContent>
  );
}
