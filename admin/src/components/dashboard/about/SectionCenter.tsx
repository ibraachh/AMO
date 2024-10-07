import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, Stack, Button, Typography, Divider } from '@mui/material';

import { Form, Field } from 'src/components/hook-form';

import { toast } from 'sonner';
import CustomTimeline from 'src/components/timeline/CustomTimeline';
import { getLanguages } from 'src/utils/data';
import ValueCards from './ValueCards';

export type NewProductSchemaType = zod.infer<typeof NewProductSchema>;

export const NewProductSchema = zod.object({
  title: zod.string().min(1, { message: 'Başlıq tələb olunur!' }),
  description: zod.string().min(1, { message: 'Açıqlama tələb olunur!' }),
});

interface Translation {
  language: string;
  title: string;
  description: string;
}

interface ProductData {
  title: string;
  description: string;
  translation: Translation[];
}

export interface Language {
  id: string;
  name: string;
  code: string;
}

export default function SectionCenter() {
  const [step, setStep] = useState(0);
  const [productData, setProductData] = useState<ProductData>({
    title: '',
    description: '',
    translation: [],
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
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (step === 0) {
      reset({
        title: productData.title,
        description: productData.description,
      });
    } else {
      const currentTranslation = productData.translation.find(
        (trans) => trans.language === languages[step].code
      );

      if (currentTranslation) {
        reset({
          title: currentTranslation.title,
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
          title: data.title,
          description: data.description,
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
            },
          ],
        }));
      }

      if (step === languages.length - 1) {
        setProductData({
          title: '',
          description: '',
          translation: [],
        });
        reset(defaultValues);
        toast.success('Başlıq əlavə olundu');
      } else {
        setStep((prev) => prev + 1);
        reset({
          title: '',
          description: '',
        });
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <div className="flex w-full mx-auto">
        <Card className="w-full" sx={{ my: 3 }}>
          <Typography variant="h5" sx={{ p: 3, py: 2 }}>
            Section №2 (Our Approach)
          </Typography>
          <Typography variant="h6" className="!text-sm" sx={{ p: 3 }}>
            Zəhmət olmasa aşağıdakı məlumatları {languages[step].name} dilində daxil edin.
          </Typography>
          <Divider />
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
                className="!w-full"
                name="description"
                label="Açıqlama"
                error={!!errors.title}
                helperText={errors.title?.message}
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

      <ValueCards values={[]} />
    </>
  );
}
