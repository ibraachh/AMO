import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, Card, Chip, Stack, Button, Typography } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';
import { _tags } from 'src/_mock';

import { Form, Field } from 'src/components/hook-form';

import { useLocation } from 'react-router';
import { getLanguages } from 'src/utils/data';
import CustomTimeline from 'src/components/timeline/CustomTimeline';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import type { Language } from '../home/HomeView';

export type ITranslation = {
  title: string;
  content: string;
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
  content: string;
  coverImage?: string;
  date?: Date;
  type: string;
  translations: ITranslation[];
  displayInHomePage?: boolean; // Optional
  tag: ITag;
};

export type NewProductSchemaType = zod.infer<typeof NewProductSchema>;

export const NewProductSchema = zod.object({
  title: zod.string().min(1, { message: 'Başlıq tələb olunur!' }),
  description: zod.string().min(1, { message: 'Açıqlama tələb olunur!' }),
  content: zod.string().min(1, { message: 'Məzmun tələb olunur!' }),
  image: zod.instanceof(File, { message: 'Şəkil tələb olunur!' }),
  tag: zod
    .object({
      keys: zod.string().array().optional(),
      title: zod.string().optional(),
      description: zod.string().optional(),
    })
    .optional(),
});

export default function MediaCreateView() {
  const location = useLocation();

  const type = location.state?.type || '';
  const [step, setStep] = useState(0);
  const [image, setImage] = useState<File>();
  // const [uploadedFileName, setUploadedFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState<IPostItem>({
    title: '',
    description: '',
    content: '',
    coverImage: '',
    type,
    tag: {
      keys: [],
      title: '',
      description: '',
    },
    translations: [],
    displayInHomePage: false,
  });

  const languages: Language[] = getLanguages;

  const defaultValues = useMemo(
    () => ({
      title: productData.title || '',
      description: productData.description || '',
      content: productData.content || '',
      image: image || undefined,
      tag: {
        keys: productData.tag?.keys ?? [],
        title: productData.tag?.title ?? '',
        description: productData.tag?.description ?? '',
      },
      displayInHomePage: productData.displayInHomePage,
    }),
    [productData, image]
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
          content: currentTranslation.description || '',
          image: image || undefined,
          tag: {
            keys: productData.tag?.keys ?? [],
            title: productData.tag?.title ?? '',
            description: productData.tag?.description ?? '',
          },
        });
      }
    }
  }, [step, productData, languages, reset, defaultValues, image]);

  const handleNext = (data: NewProductSchemaType) => {
    if (step === 0) {
      const def = {
        title: '',
        content: '',
        description: '',
        image: data.image || productData?.coverImage,
        tag: {
          keys: data.tag?.keys ?? productData.tag?.keys ?? [],
          title: data.tag?.title ?? productData.tag?.title,
          description: data.tag?.description ?? data.tag?.description,
        },
      };
      reset(def);
      setProductData((prevData) => ({
        ...prevData,
        title: data.title,
        description: data.description,
        content: data.content,
        coverImage: image?.name || prevData.coverImage,
        type,
        tag: {
          keys: data.tag?.keys ?? [],
          title: data.tag?.title ?? '',
          description: data.tag?.description ?? '',
        },
        displayInHomePage: false,
      }));
    } else {
      const updatedTranslations = [
        ...productData.translations.filter((trans) => trans.languageCode !== languages[step].code),
        {
          languageCode: languages[step].code,
          title: data.title,
          description: data.description,
          content: data.content,
        },
      ];

      setProductData((prevData) => ({
        ...prevData,
        translations: updatedTranslations,
      }));
    }
  };

  const handleBack = () => {
    const currentData = methods.getValues();
    reset(defaultValues);
    // Update the product data based on the current step
    handleNext(currentData);

    // Move to the previous step
    setStep((prev) => prev - 1);

    // Update form values based on the new step
    const updatedValues =
      step > 0
        ? productData.translations.find(
            (trans) => trans.languageCode === languages[step - 1].code
          ) || defaultValues
        : defaultValues;

    reset(updatedValues);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (step === 0 && data.image) {
        setIsLoading(true);
        // const [name, ext] = data.image.name.split('.');
        // const fileName = `${name}${new Date().toISOString()}.${ext}`;

        // Upload file
        // const uploadResponse = await uploadFile(data.image, fileName, false);
        // setUploadedFileName(uploadResponse.fileName); // Store file name
        setImage(data.image); // Keep the file in state
        setIsLoading(false);
      } else {
        // setUploadedFileName(productData.coverImage || ''); // Use existing file name if no new file
      }

      // Perform next step logic
      handleNext(data);
      if (step === languages.length - 1) {
        // Prepare the final data
        // const finalData = {
        //   ...productData,
        //   translations: [
        //     ...productData.translations.filter(
        //       (trans) => trans.languageCode !== languages[step].code
        //     ),
        //     {
        //       title: data.title,
        //       description: data.description,
        //       cotent: data.content,
        //       languageCode: languages[step].code,
        //     },
        //   ],
        //   coverImage: uploadedFileName,
        // };

        // Create news with the final data
        // const response = await useCreateNews(finalData);

        // if (response.data) {
        //   setProductData({
        //     title: '',
        // description: '',
        //     content: '',
        //     coverImage: '',
        //     type,
        //     tag: {
        //       keys: [],
        //       title: '',
        //       description: '',
        //     },
        //     displayInHomePage: false,
        //     translations: [],
        //   });

        //   setImage(undefined);
        //   reset(defaultValues);
        //   setStep(0);
        //   toast.success('Kart əlavə olundu');
        // }
      } else {
        setStep((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Media əlavə et"
        links={[
          { name: 'Saytın aktivliyi', href: paths.dashboard.root },
          { name: 'Media əlavə et' },
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
                <Field.Text
                  className="!w-full"
                  name="description"
                  label="Məzmun"
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
                <Field.Editor
                  name="content"
                  key={languages[step].code}
                  placeholder="Zəhmət olmasa məlumatları daxil edin."
                  error={!!errors.content}
                  helperText={errors.content?.message}
                />
                <Field.Upload
                  disabled={step !== 0}
                  name="image"
                  onDelete={() => setValue('image', new File([], ''))} // Clear the file field
                />

                <Stack>
                  <Field.Autocomplete
                    name="tag.keys"
                    label="Meta Keys"
                    placeholder="+ Tags"
                    multiple
                    freeSolo
                    disableCloseOnSelect
                    options={_tags.map((option) => option)}
                    getOptionLabel={(option) => option}
                    disabled={step !== 0}
                    renderTags={(selected, getTagProps) =>
                      selected.map((option, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          key={option}
                          label={option}
                          size="small"
                          color="info"
                          variant="soft"
                        />
                      ))
                    }
                  />
                </Stack>
                <Stack>
                  <Field.Text
                    disabled={step !== 0}
                    className="!w-full"
                    name="tag.title"
                    label="Meta title"
                    value={methods.watch('tag.title') || ''} // Ensure value is controlled
                    error={!!errors.tag?.title}
                    helperText={errors.tag?.title?.message}
                  />
                </Stack>
                <Stack>
                  <Field.Text
                    disabled={step !== 0}
                    className="!w-full"
                    name="tag.description"
                    label="Meta Description"
                    value={methods.watch('tag.description') || ''} // Ensure value is controlled
                    error={!!errors.tag?.description}
                    helperText={errors.tag?.description?.message}
                  />
                </Stack>
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
