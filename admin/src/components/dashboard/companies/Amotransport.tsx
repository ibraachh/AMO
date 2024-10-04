import type { Language } from 'src/utils/types';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, Card, Stack, Button, Typography } from '@mui/material';

import { Form, Field } from 'src/components/hook-form';

import { getLanguages } from 'src/utils/data';
import CustomTimeline from 'src/components/timeline/CustomTimeline';
import { blobToFile, updateCompany, uploadFile, useCreateCompany } from 'src/api/backendServies';
import { toast } from 'sonner';
import AmoTransportCards from './AmoTransportCards';

export type ITranslation = {
  title: string;
  languageCode: string;
};

export type IPostItem = {
  id?: string;
  title: string;
  imageUrls?: string[];
  logo?: string;
  translations: ITranslation[];
};

export type NewProductSchemaType = zod.infer<typeof NewProductSchema>;

export const NewProductSchema = zod.object({
  title: zod.string().min(1, { message: 'Başlıq tələb olunur!' }),
  logo: zod.instanceof(File, { message: 'Şəkil tələb olunur!' }),
});

export default function Amotransport({ post, file }: { post: IPostItem; file?: File }) {
  const [step, setStep] = useState(0);
  const imageFile = blobToFile(
    (file as Blob) || new Blob([], { type: 'image/jpeg' }),
    'image.jpeg'
  );

  const [image, setImage] = useState<File>(imageFile);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState<IPostItem>(
    post || {
      logo: '',
      translations: [],
    }
  );

  const languages: Language[] = getLanguages;

  const defaultValues = useMemo(
    () => ({
      title: productData?.translations[step]?.title || '',
      logo: image || undefined,
    }),
    [productData, image, step]
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
    const currentTranslation = productData.translations.find(
      (trans) => trans.languageCode === languages[step]?.code
    );

    if (currentTranslation) {
      reset({
        title: currentTranslation.title || '',
        logo: image || undefined,
      });
    } else {
      reset({
        title: '',
        logo: image || undefined,
      });
    }
  }, [step, productData, languages, reset, image]);

  const handleNext = (data: NewProductSchemaType) => {
    const updatedTranslations = [
      ...productData.translations.filter((trans) => trans.languageCode !== languages[step].code),
      {
        languageCode: languages[step].code,
        title: data.title,
      },
    ];

    reset({
      title: '',
      logo: image || undefined,
    });

    setProductData((prevData) => ({
      ...prevData,
      translations: updatedTranslations,
    }));
  };

  const handleBack = () => {
    const currentData = methods.getValues();

    const updatedTranslations = [
      ...productData.translations.filter((trans) => trans.languageCode !== languages[step].code),
      {
        languageCode: languages[step].code,
        title: currentData.title,
      },
    ];

    setProductData((prevData) => ({
      ...prevData,
      translations: updatedTranslations,
    }));

    const updatedValues =
      step > 0
        ? productData.translations.find(
            (trans) => trans.languageCode === languages[step - 1].code
          ) || defaultValues
        : defaultValues;

    reset({
      ...updatedValues,
      logo: image || undefined,
    });

    setStep(step - 1);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (step === 0 && data.logo) {
        setIsLoading(true);
        const [name, ext] = data.logo.name.split('.');
        const fileName = `${name}${new Date().toISOString()}.${ext}`;

        const uploadResponse = await uploadFile(data.logo, fileName, false);
        setUploadedFileName(uploadResponse.message);

        setImage(data.logo);
        setIsLoading(false);
      }

      handleNext(data);
      if (step === languages.length - 1) {
        const finalData = {
          ...productData,
          translations: [
            ...productData.translations.filter(
              (trans) => trans.languageCode !== languages[step].code
            ),
            {
              title: data.title,
              languageCode: languages[step].code,
            },
          ],
          logo: uploadedFileName,
        };
        console.log(finalData);

        const response = !productData.id
          ? await useCreateCompany(finalData)
          : await updateCompany(productData.id || '', finalData);

        if (response.data) {
          toast.success('Redaktə olundu');

          // setTimeout(() => {
          //   router.push(paths.dashboard.companies.root);
          //   router.refresh();
          // }, 800);
        }
      } else {
        setStep((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
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

                <Field.Upload
                  disabled={step !== 0}
                  name="logo"
                  onDelete={() => setValue('logo', new File([], ''))} // Clear the file field
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
      <AmoTransportCards />
    </>
  );
}
