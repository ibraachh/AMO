import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, Stack, Button, Typography, Divider } from '@mui/material';

import { Form, Field } from 'src/components/hook-form';

import { toast } from 'sonner';
import { getLanguages } from 'src/utils/data';
import CustomTimeline from 'src/components/timeline/CustomTimeline';
import AmoTransportCards from './AmoTransportCards';

export type NewProductSchemaType = zod.infer<typeof NewProductSchema>;

export const NewProductSchema = zod.object({
  title: zod.string().min(1, { message: 'Başlıq tələb olunur!' }),
  image: zod.any().optional(),
});

interface Translation {
  language: string;
  title: string;
}

interface ProductData {
  title: string;
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
    translation: [],
    image: null,
  });

  const languages: Language[] = getLanguages;

  const defaultValues = useMemo(
    () => ({
      title: '',
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
        image: productData.image,
      });
    } else {
      const currentTranslation = productData.translation.find(
        (trans) => trans.language === languages[step].code
      );

      if (currentTranslation) {
        reset({
          title: currentTranslation.title,
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
            },
          ],
        }));
      }

      if (step === languages.length - 1) {
        console.log('Final Product Data:', productData);
        setProductData({
          title: '',
          translation: [],
          image: null,
        });
        reset(defaultValues);
        toast.success('Başlıq əlavə olundu');
      } else {
        setStep((prev) => prev + 1);
        reset({
          title: '',
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
              <Field.Upload
                disabled={step !== 0}
                name="image"
                multiple={false}
                onDelete={() => setProductData((prev) => ({ ...prev, image: null }))}
                error={!!errors.image}
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

      <AmoTransportCards />
    </>
  );
}
