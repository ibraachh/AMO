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
import { useCreateChronology } from 'src/api/backendServies';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

export type NewProductSchemaType = zod.infer<typeof NewProductSchema>;

export const NewProductSchema = zod.object({
  title: zod.string().min(1, { message: 'Başlıq tələb olunur!' }),
  description: zod.string().min(1, { message: 'Açıqlama tələb olunur!' }),
});

interface ProductData {
  translations: Translation[];
}
export interface Language {
  id: string;
  name: string;
  code: string;
}

export default function TimeLineCardCreateView() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [productData, setProductData] = useState<ProductData>({
    translations: [],
  });

  const languages: Language[] = getLanguages;

  const defaultValues = useMemo(
    () => ({
      title: '',
      description: '',
    }),
    []
  );

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
    };
    const updatedProductData: ProductData = {
      translations: [
        ...productData.translations.filter((t) => t.languageCode !== languages[step].code),
        newTranslation,
      ],
    };

    setProductData(updatedProductData);

    if (step < languages.length - 1) {
      setStep((prev) => prev + 1);
      reset({
        title: '',
        description: '',
      });
    } else {
      const res = await useCreateChronology(updatedProductData);

      if (!res) {
        toast.error('Xəta baş verdi!');
        return;
      }

      toast.success('Əlavə olundu!');
      setTimeout(() => {
        router.push(paths.dashboard.about.history);
        router.refresh();
      }, 800);
      setProductData({ translations: [] });
      setStep(0);
      reset(defaultValues);
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
              <Field.Text
                key={languages[step].code}
                placeholder="Açıqlama"
                name="description"
                error={!!errors.description}
                helperText={errors.description?.message}
              />

              <div className={`flex ${step === 0 ? 'justify-end' : 'justify-between'} mt-3`}>
                {step > 0 && (
                  <Button
                    type="button"
                    className="!bg-[#1C252E] !w-max !px-4 !py-3 gap-2 !text-white !rounded-xl"
                    onClick={() => {
                      const previousLanguageCode = languages[step - 1].code;
                      const previousTranslation = productData.translations.find(
                        (t) => t.languageCode === previousLanguageCode
                      );

                      if (previousTranslation) {
                        setValue('title', previousTranslation.title);
                        setValue('description', previousTranslation?.description || '');
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
