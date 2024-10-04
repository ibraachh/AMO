import type { CompanyCard, Language } from 'src/utils/types';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, Card, Stack, Button, Typography, Divider } from '@mui/material';

import { Form, Field } from 'src/components/hook-form';

import { getLanguages } from 'src/utils/data';
import CustomTimeline from 'src/components/timeline/CustomTimeline';
import { paths } from 'src/routes/paths';
import { blobToFile, updateCompany, uploadFile, useCreateCompany } from 'src/api/backendServies';
import { toast } from 'sonner';
import { useRouter } from 'src/routes/hooks';
import AmogrowCards from './AmogrowCards';

export type ITranslation = {
  title: string;
  description: string;
  languageCode: string;
};

export type ITag = {
  keys: string[];
  title: string;
  description: string;
};

export type IPostItem = {
  id?: string;
  title: string;
  description: string;
  imageUrls?: string[];
  coverImage?: string;
  translations: ITranslation[];
  companyCards?: CompanyCard[];
};

export type NewProductSchemaType = zod.infer<typeof NewProductSchema>;

export const NewProductSchema = zod.object({
  title: zod.string().min(1, { message: 'Başlıq tələb olunur!' }),
  description: zod.string().min(1, { message: 'Açıqlama tələb olunur!' }),
  image: zod.instanceof(File, { message: 'Şəkil tələb olunur!' }),
});

export default function Amogrow({ post, file }: { post: IPostItem; file: File }) {
  const router = useRouter();
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
      coverImage: '',
      translations: [],
    }
  );

  const languages: Language[] = getLanguages;

  const defaultValues = useMemo(
    () => ({
      title: productData?.translations[step]?.title || '',
      description: productData?.translations[step]?.description || '',
      image: image || undefined,
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
        description: currentTranslation.description || '',
        image: image || undefined,
      });
    } else {
      reset({
        title: '',
        description: '',
        image: image || undefined,
      });
    }
  }, [step, productData, languages, reset, image]);

  const handleNext = (data: NewProductSchemaType) => {
    const updatedTranslations = [
      ...productData.translations.filter((trans) => trans.languageCode !== languages[step].code),
      {
        languageCode: languages[step].code,
        title: data.title,
        description: data.description,
      },
    ];

    reset({
      title: '',
      description: '',
      image: image || undefined,
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
        description: currentData.description,
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
      image: image || undefined,
    });

    setStep(step - 1);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (step === 0 && data.image) {
        setIsLoading(true);
        const [name, ext] = data.image.name.split('.');
        const fileName = `${name}${new Date().toISOString()}.${ext}`;

        const uploadResponse = await uploadFile(data.image, fileName, false);
        setUploadedFileName(uploadResponse.message);

        setImage(data.image);
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
              description: data.description,
              languageCode: languages[step].code,
            },
          ],
          coverImage: uploadedFileName,
        };
        console.log(finalData);

        const response = !productData.id
          ? await useCreateCompany(finalData)
          : await updateCompany(productData.id || '', finalData);

        if (response.data) {
          toast.success('Media redaktə olundu');

          setTimeout(() => {
            router.push(paths.dashboard.companies.root);
            router.refresh();
          }, 800);
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

                <Field.Editor
                  name="description"
                  key={languages[step].code || step}
                  placeholder="Zəhmət olmasa məlumatları daxil edin."
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
                <Field.Upload
                  disabled={step !== 0}
                  name="image"
                  onDelete={() => setValue('image', new File([], ''))} // Clear the file field
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

      <Divider className="!my-8" />
      {post?.companyCards && <AmogrowCards cards={post?.companyCards} />}
    </>
  );
}
