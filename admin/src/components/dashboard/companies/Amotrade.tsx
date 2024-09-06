import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, Stack, Button, Typography, Divider } from '@mui/material';

import { Form, Field } from 'src/components/hook-form';

import { toast } from 'sonner';
import { getLanguages } from 'src/utils/data';
import CustomTimeline from 'src/components/timeline/CustomTimeline';
import AmotradeCards from './AmotradeCards';

export type NewProductSchemaType = zod.infer<typeof NewProductSchema>;

export const NewProductSchema = zod.object({
  title: zod.string().min(1, { message: 'Başlıq tələb olunur!' }),
  subtitle: zod.string().optional(), 
  description: zod.string().min(1, { message: 'Açıqlama tələb olunur!' }),
  image: zod.any().optional(), 
});

interface Translation {
  language: string;
  title: string;
  subtitle?: string; 
  description: string;
}

interface ProductData {
  title: string;
  subtitle?: string; 
  description: string;
  translation: Translation[];
  image?: File | null;
}

export interface Language {
  id: string;
  name: string;
  code: string;
}

export default function Amotrade() {
  const [step, setStep] = useState(0);
  const [productData, setProductData] = useState<ProductData>({
    title: '',
    subtitle: '', 
    description: '',
    translation: [],
    image: null,
  });

  const languages: Language[] = getLanguages;

  const defaultValues = useMemo(
    () => ({
      title: '',
      subtitle: '', 
      description: '',
      image: null,
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
        subtitle: productData.subtitle, 
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
          subtitle: currentTranslation.subtitle, 
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
          subtitle: data.subtitle, 
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
              subtitle: data.subtitle, 
              description: data.description,
            },
          ],
        }));
      }

      if (step === languages.length - 1) {
        console.log('Final Product Data:', productData);
        setProductData({
          title: '',
          subtitle: '', 
          description: '',
          translation: [],
          image: null,
        });
        reset(defaultValues);
        toast.success('Başlıq əlavə olundu');
      } else {
        setStep((prev) => prev + 1);
        reset({
          title: '',
          subtitle: '', 
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
              <Field.Editor
                key={languages[step].code}
                placeholder="Açıqlama"
                name="description"
                error={!!errors.description}
                helperText={errors.description?.message}
              />
              <Field.Upload
                disabled={step !== 0}
                name="image"
                multiple={false}
                onDelete={() => setProductData((prev) => ({ ...prev, image: null }))}
                error={!!errors.image}
              />
              <Field.Text
                className="!w-full"
                name="subtitle"
                label="Alt başlıq"
                error={!!errors.subtitle}
                helperText={errors.subtitle?.message}
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
      <Divider className="!my-8" />
      <AmotradeCards />
    </>
  );
}
