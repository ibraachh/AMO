import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, Stack, Button, Typography, Chip } from '@mui/material';

import { Form, Field } from 'src/components/hook-form';

import { toast } from 'sonner';
import CustomTimeline from 'src/components/timeline/CustomTimeline';
import { getLanguages } from 'src/utils/data';
import { _tags } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

export type NewProductSchemaType = zod.infer<typeof NewProductSchema>;

export const NewProductSchema = zod.object({
  title: zod.string().min(1, { message: 'Başlıq tələb olunur!' }),
  description: zod.string().min(1, { message: 'Açıqlama tələb olunur!' }),
  expiredDate: zod.date().optional(),
  tags: zod.array(zod.string()).optional(),
  metaTitle: zod.string().optional(),
  metaDescription: zod.string().optional(),
});

interface Translation {
  language: string;
  title: string;
  description: string;
}

interface ProductData {
  title: string;
  description: string;
  expiredDate?: Date;
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  translation: Translation[];
}

export interface Language {
  id: string;
  name: string;
  code: string;
}

export default function CareerEditView() {
  const [step, setStep] = useState(0);
  const [productData, setProductData] = useState<ProductData>({
    title: '',
    description: '',
    tags: [],
    metaTitle: '',
    metaDescription: '',
    translation: [],
  });

  const languages: Language[] = getLanguages;

  const defaultValues = useMemo(
    () => ({
      title: '',
      description: '',
      expiredDate: undefined,
      tags: [],
      metaTitle: '',
      metaDescription: '',
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
        expiredDate: productData.expiredDate,
        tags: productData.tags,
        metaTitle: productData.metaTitle,
        metaDescription: productData.metaDescription,
      });
    } else {
      const currentTranslation = productData.translation.find(
        (trans) => trans.language === languages[step].code
      );

      if (currentTranslation) {
        reset({
          title: currentTranslation.title,
          description: currentTranslation.description,
          expiredDate: undefined,
          tags: [],
          metaTitle: '',
          metaDescription: '',
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
          expiredDate: data.expiredDate,
          tags: data.tags ?? [], // provide a default value of an empty array if data.tags is undefined
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
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
        console.log('Final Product Data:', productData);
        setProductData({
          title: '',
          description: '',
          tags: [],
          metaTitle: '',
          metaDescription: '',
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
          expiredDate: undefined,
          tags: [],
          metaTitle: '',
          metaDescription: '',
        });
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <DashboardContent maxWidth="xl">
      <div className="flex w-full mx-auto">
        <Card className="w-full" sx={{ my: 3 }}>
          <Typography variant="h6" className="!text-sm" sx={{ p: 3 }}>
            Zəhmət olmasa aşağıdakı məlumatları {languages[step].name} dilində daxil edin.
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
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Bitmə tarixi</Typography>
                <Field.DatePicker name="expiredDate" />
              </Stack>
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Axtarış optimizasiyası</Typography>
                <Field.Autocomplete
                  name="tags"
                  label="Tags"
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
                <Field.Text placeholder="Meta Title" name="metaTitle" />
                <Field.Text placeholder="Meta Description" name="metaDescription" />
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
