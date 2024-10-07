import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, Stack, Button, Typography } from '@mui/material';

import { Form, Field } from 'src/components/hook-form';

import { toast } from 'sonner';
import CustomTimeline from 'src/components/timeline/CustomTimeline';
import { getLanguages } from 'src/utils/data';
import { DashboardContent } from 'src/layouts/dashboard';
import { updateCareer, useGetCareerById } from 'src/api/backendServies';
import { useParams, useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

export type NewProductSchemaType = zod.infer<typeof NewProductSchema>;

export const NewProductSchema = zod.object({
  title: zod.string().min(1, { message: 'Başlıq tələb olunur!' }),
  description: zod.string().min(1, { message: 'Açıqlama tələb olunur!' }),
  expiredDate: zod.string().optional(),
  languageCode: zod.string().optional(),
});

export interface Language {
  id: string;
  name: string;
  code: string;
}

export default function CareerEditView() {
  const { id } = useParams();
  const { career, careerLoading } = useGetCareerById(id ?? '');
  const { translations } = career || { translations: [] };
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<NewProductSchemaType[]>([]);
  const languages: Language[] = getLanguages;

  const defaultValues = useMemo(
    () => ({
      title: '',
      description: '',
      expiredDate: undefined,
    }),
    []
  );

  const methods = useForm<NewProductSchemaType>({
    resolver: zodResolver(NewProductSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const {
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (career) {
      const translation = (translations && translations[step]) || {};
      reset({
        title: formData[step]?.title || translation?.title,
        description: formData[step]?.description || translation?.description,
        expiredDate: career?.date ? new Date(career?.date).toISOString() : undefined,
      });
    }
  }, [career, step, reset, formData, translations]);

  const handleNext = () => {
    const currentData = getValues();
    setFormData((prev) => {
      const updatedData = [...prev];
      updatedData[step] = { ...currentData, languageCode: languages[step].code };
      return updatedData;
    });
    if (step < languages.length - 1) {
      setStep((prev) => prev + 1);
      reset(formData[step + 1] || defaultValues);
    }
  };

  // Geri butonuna tıklama
  const handlePrevious = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
      reset(formData[step - 1] || defaultValues);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    const finalData = [...formData].map((item) => ({
      ...item,
      languageCode: item.languageCode || '',
    }));

    finalData[step] = { ...data, languageCode: languages[step].code };

    const res = await updateCareer(id ?? '', finalData[0].expiredDate ?? '', finalData);
    if (res) {
      toast.success('Məlumatlar yeniləndi');
      setTimeout(() => {
        router.push(paths.dashboard.career.root);
        router.refresh();
      }, 800);
    }
  });
  if (careerLoading) {
    return <div>Loading...</div>;
  }

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
                    onClick={handlePrevious}
                  >
                    Geri
                  </Button>
                )}
                <Button
                  type="button"
                  className="!bg-[#1C252E] !w-max !px-4 !py-3 gap-2 !text-white !rounded-xl"
                  onClick={step === languages.length - 1 ? onSubmit : handleNext}
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
