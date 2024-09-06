import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, Stack, Button, Typography, Divider } from '@mui/material';

import { Form, Field } from 'src/components/hook-form';

import { toast } from 'sonner';
import { getLanguages } from 'src/utils/data';
import CustomTimeline from 'src/components/timeline/CustomTimeline';
import { DashboardContent } from 'src/layouts/dashboard';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';

export type NewProductSchemaType = zod.infer<typeof NewProductSchema>;

export const NewProductSchema = zod.object({
  description: zod.string().min(1, { message: 'Açıqlama tələb olunur!' }),
});

interface Translation {
  language: string;

  description: string;
}

interface ProductData {
  description: string;
  translation: Translation[];
}

export interface Language {
  id: string;
  name: string;
  code: string;
}
export default function AmoTradeEditView() {
  const [step, setStep] = useState(0);
  const [productData, setProductData] = useState<ProductData>({
    description: '',
    translation: [],
  });

  const languages: Language[] = getLanguages;

  const defaultValues = useMemo(
    () => ({
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
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (step === 0) {
      reset({
        description: productData.description,
      });
    } else {
      const currentTranslation = productData.translation.find(
        (trans) => trans.language === languages[step].code
      );

      if (currentTranslation) {
        reset({
          description: currentTranslation.description,
        });
      }
    }
  }, [step, productData, languages, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (step === 0) {
        setProductData((prevData) => ({
          ...prevData,
          description: data.description,
        }));
      } else {
        setProductData((prevData) => ({
          ...prevData,
          translation: [
            ...prevData.translation.filter((trans) => trans.language !== languages[step].code),
            {
              language: languages[step].code,
              description: data.description,
            },
          ],
        }));
      }

      if (step === languages.length - 1) {
        console.log('Final Product Data:', productData);
        setProductData({
          description: '',
          translation: [],
        });
        reset(defaultValues);
        toast.success('Başlıq əlavə olundu');
      } else {
        setStep((prev) => prev + 1);
        reset({
          description: '',
        });
      }
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Amo Trade"
        links={[
          { name: 'Saytın aktivliyi', href: paths.dashboard.root },
          { name: 'Amotrade redaktə et' },
        ]}
      />

      <div className="flex w-full mx-auto">
        <Card className="w-full" sx={{ my: 3 }}>
          <Typography variant="h6" className="!text-sm" sx={{ p: 3 }}>
            Zəhmət olmasa aşağıdakı məlumatları {languages[step].name} dilində daxil edin.
          </Typography>
          <Divider />
          <Form methods={methods} className="!w-full" onSubmit={onSubmit}>
            <Stack spacing={3} className="w-full" sx={{ p: 3 }}>
              <Field.Text
                className="!w-full"
                name="description"
                label="Açıqlama"
                error={!!errors.description}
                helperText={errors.description?.message}
              />
              <div className={`flex ${step === 0 ? 'justify-end' : 'justify-between'} mt-3`}>
                {step > 0 && (
                  <Button
                    type="button"
                    className="!bg-[#1C252E] !w-max !px-4 !py-3 gap-2 !text-white !rounded-xl"
                    onClick={() => {
                      setStep((prev) => prev - 1);
                      reset();
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
