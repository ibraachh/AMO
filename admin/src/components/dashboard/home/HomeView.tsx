import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, Stack, Button, Typography, Chip } from '@mui/material';

import { Form, Field } from 'src/components/hook-form';

import { toast } from 'sonner';
import CustomTimeline from 'src/components/timeline/CustomTimeline';
import { getLanguages } from 'src/utils/data';
import { DashboardContent } from 'src/layouts/dashboard';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { _tags } from 'src/_mock';

export type NewProductSchemaType = zod.infer<typeof NewProductSchema>;

export const NewProductSchema = zod.object({
  title: zod.string().min(1, { message: 'Başlıq tələb olunur!' }),
  description: zod.string().min(1, { message: 'Açıqlama tələb olunur!' }),
  metaTitle: zod.string().optional(),
  metaDescription: zod.string().optional(),
  tags: zod.array(zod.string()).optional(),
});

interface Translation {
  language: string;
  title: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
}

interface ProductData {
  title: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
  translation: Translation[];
}

export interface Language {
  id: string;
  name: string;
  code: string;
}

export default function HomeView() {
  const [step, setStep] = useState(0);
  const [productData, setProductData] = useState<ProductData>({
    title: '',
    description: '',
    metaTitle: '',
    metaDescription: '',
    tags: [],
    translation: [],
  });

  const languages: Language[] = getLanguages;

  const defaultValues = useMemo(
    () => ({
      title: '',
      description: '',
      metaTitle: '',
      metaDescription: '',
      tags: [],
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
        metaTitle: productData.metaTitle,
        metaDescription: productData.metaDescription,
        tags: productData.tags,
      });
    } else {
      const currentTranslation = productData.translation.find(
        (trans) => trans.language === languages[step].code
      );

      if (currentTranslation) {
        reset({
          title: currentTranslation.title,
          description: currentTranslation.description,
          metaTitle: currentTranslation.metaTitle,
          metaDescription: currentTranslation.metaDescription,
          tags: currentTranslation.tags || [],
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
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
          tags: data.tags,
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
              metaTitle: data.metaTitle,
              metaDescription: data.metaDescription,
              tags: data.tags,
            },
          ],
        }));
      }

      if (step === languages.length - 1) {
        console.log('Final Product Data:', productData);
        setProductData({
          title: '',
          description: '',
          metaTitle: '',
          metaDescription: '',
          tags: [],
          translation: [],
        });
        reset(defaultValues);
        toast.success('Başlıq əlavə olundu');
        setStep(0);
      } else {
        setStep((prev) => prev + 1);
        reset({
          title: '',
          description: '',
          metaTitle: '',
          metaDescription: '',
          tags: [],
        });
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Ana səhifə"
        links={[{ name: 'Saytın aktivliyi', href: paths.dashboard.root }, { name: 'Ana səhifə' }]}
      />
      <div className="flex w-full mx-auto">
        <Card className="w-full" sx={{ my: 3 }}>
          <Typography variant="h6" className="!text-sm" sx={{ p: 3 }}>
            Zəhmət olmasa aşağıdakı məlumatları {languages[step].name} dilində daxil edin.
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
              <Field.Editor
                key={languages[step].code}
                name="description"
                error={!!errors.description}
                helperText={errors.description?.message}
              />

              <Stack spacing={2} className="w-full mt-3">
                <Typography variant="h6">Axtarış Optimizasiyası</Typography>
                <Field.Autocomplete
                  disabled={step !== 0}
                  name="tags"
                  label="Meta taglari"
                  placeholder="+ Tags"
                  multiple
                  freeSolo
                  disableCloseOnSelect
                  options={_tags.map((option) => option)}
                  getOptionLabel={(option) => option}
                  renderOption={(props, option) => (
                    <li {...props} key={option}>
                      {option}
                    </li>
                  )}
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

                <Field.Text
                  disabled={step !== 0}
                  className="!w-full"
                  name="metaTitle"
                  label="Meta title"
                  error={!!errors.metaTitle}
                  helperText={errors.metaTitle?.message}
                />
                <Field.Text
                  disabled={step !== 0}
                  className="!w-full"
                  name="metaDescription"
                  label="Meta description"
                  error={!!errors.metaDescription}
                  helperText={errors.metaDescription?.message}
                />
              </Stack>

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
