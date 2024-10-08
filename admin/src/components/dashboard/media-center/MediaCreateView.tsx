import type { Language } from 'src/utils/types';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, Card, Stack, Button, Typography } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { Form, Field } from 'src/components/hook-form';

import { getLanguages } from 'src/utils/data';
import CustomTimeline from 'src/components/timeline/CustomTimeline';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { createMedia, useAddFile } from 'src/api/backendServies';
import { toast } from 'sonner';
import { useRouter } from 'src/routes/hooks';

export type ITranslation = {
  title: string;
  description: string;
  languageCode: string;
};

export type IPostItem = {
  id?: string;
  coverImage?: File;
  translations: ITranslation[];
};

export type NewProductSchemaType = zod.infer<typeof NewProductSchema>;

export const NewProductSchema = zod.object({
  title: zod.string().min(1, { message: 'Başlıq tələb olunur!' }),
  description: zod.string().min(1, { message: 'Məzmun tələb olunur!' }),
  coverImage: zod
    .instanceof(File)
    .refine((file) => file.size > 0, { message: 'Şəkil tələb olunur!' }),
});

export default function MediaCreateView() {
  const [step, setStep] = useState(0);
  const [image, setImage] = useState<File>();
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState<IPostItem>({
    coverImage: image || undefined,
    translations: [],
  });

  const languages: Language[] = getLanguages;

  const defaultValues = useMemo(
    () => ({
      title: '',
      description: '',
      coverImage: image || undefined,
    }),
    [image]
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
      reset(defaultValues);
    } else {
      const currentTranslation = productData.translations.find(
        (trans) => trans.languageCode === languages[step].code
      );

      if (currentTranslation) {
        reset({
          title: currentTranslation.title || '',
          description: currentTranslation.description || '',
          coverImage: image || undefined,
        });
      } else {
        reset({
          title: '',
          description: '',
          coverImage: image || undefined,
        });
      }
    }
  }, [step, productData, languages, reset, defaultValues, image]);

  const handleBack = () => {
    const currentData = methods.getValues();
    reset(defaultValues);
    handleNext(currentData);

    setStep((prev) => prev - 1);

    const updatedValues =
      step > 0
        ? productData.translations.find(
            (trans) => trans.languageCode === languages[step - 1].code
          ) || defaultValues
        : defaultValues;

    reset(updatedValues);
  };

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (step === 0 && data.coverImage) {
        setIsLoading(true);
        setImage(data.coverImage);
        setProductData((prevData) => ({
          ...prevData,
          coverImage: data.coverImage,
        }));

        const res: any = await useAddFile({ image: data.coverImage });

        if (res.statusCode === 'OK') {
          setUploadedFileName(res?.message);
        }
        setIsLoading(false);
      }

      const newTranslation = {
        languageCode: languages[step].code,
        title: data.title,
        description: data.description,
      };
      const updatedProductData: IPostItem = {
        coverImage: productData.coverImage,
        translations: [
          ...productData.translations.filter((t) => t.languageCode !== languages[step].code),
          newTranslation,
        ],
      };

      setProductData(updatedProductData);

      if (step === languages.length - 1) {
        const res = await createMedia({
          image: uploadedFileName,
          translations: updatedProductData.translations,
        });

        if (!res) {
          toast.error('Xəta bas verdi');
          return;
        }

        reset(defaultValues);

        toast.success('Əlavə edildi');
        setTimeout(() => {
          router.push(paths.dashboard.mediaCenter.list);
          router.refresh();
        }, 800);
      } else {
        setStep((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
    }
  });

  const handleNext = (data: NewProductSchemaType) => {
    const updatedTranslation = {
      languageCode: languages[step].code,
      title: data.title,
      description: data.description,
    };

    const updatedTranslations = [
      ...productData.translations.filter((trans) => trans.languageCode !== languages[step].code),
      updatedTranslation,
    ];

    setProductData((prevData) => ({
      ...prevData,
      translations: updatedTranslations,
    }));
  };
  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Medya əlavə et"
        links={[
          { name: 'Saytın aktivliyi', href: paths.dashboard.root },
          { name: 'Medya əlavə et' },
        ]}
      />
      <div className="flex mx-auto">
        <Card className="w-full" sx={{ my: 3 }}>
          <Typography variant="h6" className="!text-sm" sx={{ p: 3 }}>
            Zəhmət olmasa aşağıdakı məlumatları {languages[step].name} dilində daxil edin.
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
                <Field.Editor
                  name="description"
                  key={languages[step].code}
                  placeholder="Zəhmət olmasa məlumatları daxil edin."
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
                <Field.Upload
                  disabled={step !== 0}
                  name="coverImage"
                  onDelete={() => setValue('coverImage', new File([], ''))} // Clear the file field
                />

                <div className={`flex ${step === 0 ? 'justify-end' : 'justify-between'} mt-3`}>
                  {step > 0 && (
                    <Button
                      type="button"
                      className="!bg-[#1C252E] !w-max !px-4 !py-3 gap-2 !text-white !rounded-xl"
                      onClick={handleBack}
                    >
                      Geriyə
                    </Button>
                  )}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="!bg-[#1C252E] !w-max !px-4 !py-3 gap-2 !text-white !rounded-xl disabled:!bg-gray-300"
                    variant="contained"
                  >
                    {step === languages.length - 1
                      ? 'Yadda saxla'
                      : isLoading
                        ? 'Şəkil yüklənir'
                        : 'İrəli'}
                  </Button>
                </div>
              </Box>
            </Stack>
          </Form>
        </Card>
        <Box className="mx-3 h-[630px] flex items-center">
          <CustomTimeline step={step} />
        </Box>
      </div>
    </DashboardContent>
  );
}
