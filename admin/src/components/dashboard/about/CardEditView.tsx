import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, Card, Stack, Button, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { Form, Field } from 'src/components/hook-form';

import { toast } from 'sonner';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { getLanguages } from 'src/utils/data';
import CustomTimeline from 'src/components/timeline/CustomTimeline';

export type NewProductSchemaType = zod.infer<typeof NewProductSchema>;

export const NewProductSchema = zod.object({
  title: zod.string().min(1, { message: 'Başlıq tələb olunur!' }),
  description: zod.string().min(1, { message: 'Açıqlama tələb olunur!' }),
  image: zod.instanceof(File).optional(),
});

interface Translation {
  language: string;
  title: string;
  description: string;
  image?: File;
}

interface ProductData {
  title: string;
  description: string;
  image?: File;
  translation: Translation[];
}

export interface Language {
  id: string;
  name: string;
  code: string;
}

export default function CardEditView() {
  const [step, setStep] = useState(0);
  const [productData, setProductData] = useState<ProductData>({
    title: '',
    description: '',
    image: undefined,
    translation: [],
  });

  const languages: Language[] = getLanguages;

  const defaultValues = useMemo(
    () => ({
      title: '',
      description: '',
      image: undefined,
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
    if (step === 0) {
      reset({
        title: productData.title,
        description: productData.description,
        image: productData.image,
      });
    } else {
      const currentTranslation = productData.translation.find(
        (trans) => trans.language === languages[step].code
      );

      if (currentTranslation) {
        reset({
          title: currentTranslation.title,
          description: currentTranslation.description,
          image: currentTranslation.image,
        });
      }
    }
  }, [step, productData, languages, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (step === 0) {
        setProductData((prevData) => ({
          ...prevData,
          title: data.title,
          description: data.description,
          image: data.image,
        }));
      } else {
        setProductData((prevData) => ({
          ...prevData,
          translation: [
            ...prevData.translation.filter((trans) => trans.language !== languages[step].code),
            {
              language: languages[step].code,
              title: data.title,
              description: data.description,
              image: data.image,
            },
          ],
        }));
      }

      if (step === languages.length - 1) {
        console.log('Final Product Data:', productData);
        setProductData({
          title: '',
          description: '',
          image: undefined,
          translation: [],
        });
        reset(defaultValues);
        toast.success('Kart əlavə olundu');
      } else {
        setStep((prev) => prev + 1);
        reset(defaultValues);
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Haqqımızda"
        links={[
          { name: 'Saytın aktivliyi', href: paths.dashboard.root },
          { name: 'Haqqımızda', href: paths.dashboard.about.root },
          { name: 'Kart redaktə et' },
        ]}
      />
      <div className="flex w-2/3 mx-auto">
        <Card className="w-full" sx={{ my: 3 }}>
          <Typography variant="h6" className="!text-sm" sx={{ p: 3 }}>
            Zəhmət olmasa aşağıdakı məlumatları {languages[step].name} dilində daxil edin.
          </Typography>
          <Form methods={methods} onSubmit={onSubmit}>
            <Stack spacing={3} sx={{ p: 3 }}>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' }}
              >
                <Field.Text
                  className="!w-full"
                  name="title"
                  label="Başlıq"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
                <Field.Text
                  multiline
                  rows={3}
                  className="!w-full"
                  name="description"
                  label="Açıqlama"
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />

                <Field.Upload
                  disabled={step !== 0}
                  name="image"
                  onDelete={() => setValue('image', undefined)}
                />

                <div className={`flex ${step === 0 ? 'justify-end' : 'justify-between'} mt-3`}>
                  {step > 0 && (
                    <Button
                      type="button"
                      className="!bg-[#1C252E] !w-max !px-4 !py-3 gap-2 !text-white !rounded-xl"
                      onClick={() => {
                        setStep((prev) => prev - 1);
                        reset(defaultValues);
                      }}
                    >
                      Geriyə
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className="!bg-[#1C252E] !w-max !px-4 !py-3 gap-2 !text-white !rounded-xl"
                    variant="contained"
                  >
                    {step === languages.length - 1 ? 'Yadda saxla' : 'Növbəti'}
                  </Button>
                </div>
              </Box>
            </Stack>
          </Form>
        </Card>
        <CustomTimeline step={step} />
      </div>
    </DashboardContent>
  );
}
