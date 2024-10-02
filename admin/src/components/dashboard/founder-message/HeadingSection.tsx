import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { Button, Card, Stack, Typography } from '@mui/material';

import { Field, Form } from 'src/components/hook-form';

import CustomTimeline from 'src/components/timeline/CustomTimeline';
import type { Info } from 'src/utils/types';
import { getLanguages } from 'src/utils/data';
import { updateChronology, updateValue, useCreateValue } from 'src/api/backendServies';
import { toast } from 'sonner';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

export type NewProductSchemaType = zod.infer<typeof NewProductSchema>;

export const NewProductSchema = zod.object({
  title: zod.string().optional(),
  description: zod.string().optional(),
});

type Props = {
  initialData: Info;
};

export default function HeadingSection({ initialData }: Props) {
  if (!initialData) return null;
  const [currentStep, setCurrentStep] = useState(0);
  const [currectDescription, setCurrectDescription] = useState(
    initialData?.translations[currentStep].description || ''
  );
  const [currentTitle, setCurrentTitle] = useState(
    initialData?.translations[currentStep].title || ''
  );
  const [translations, setTranslations] = useState(initialData?.translations || []);

  const languages = getLanguages; // Fetch language data

  const router = useRouter();
  const methods = useForm<NewProductSchemaType>({
    resolver: zodResolver(NewProductSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleEditorChange = (value: string) => {
    // console.log('Editor value changing to:', value);
    setCurrectDescription(value);
    const updatedTranslations = [...translations];
    updatedTranslations[currentStep] = {
      ...updatedTranslations[currentStep],
      description: value,
      languageCode: languages[currentStep].code,
    };
    setTranslations(updatedTranslations);
  };

  const handleTitleChange = (value: string) => {
    setCurrentTitle(value);
    const updatedTranslations = [...translations];
    updatedTranslations[currentStep] = {
      ...updatedTranslations[currentStep],
      title: value,
      languageCode: languages[currentStep].code,
    };
    setTranslations(updatedTranslations);
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      const nextStep = prevStep + 1;
      return nextStep;
    });
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const onSubmit = handleSubmit(async () => {
    if (currentStep === languages.length - 1) {
      try {
        const finalData: Info = {
          translations,
        };
        console.log('finalData', finalData);

        const response = await updateChronology(initialData?.id || '', finalData);

        if (response.data) {
          toast.success('Data successfully saved');
          setCurrentStep(0);
          setTimeout(() => {
            router.push(paths.dashboard.about.history);
            router.refresh();
          }, 800);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      handleNext();
    }
  });

  const getCurrentDescription = () => {
    if (currentStep === 0) {
      return currectDescription || '';
    }
    return translations[currentStep]?.description || '';
  };

  const getCurrentTitle = () => {
    if (currentStep === 0) {
      return currentTitle || '';
    }
    return translations[currentStep]?.title || '';
  };

  return (
    <div className="flex w-full mx-auto">
      <Card className="w-full" sx={{ my: 3 }}>
        <Typography variant="h6" className="!text-sm" sx={{ p: 3 }}>
          Zəhmət olmasa aşağıdakı məlumatları {languages[currentStep].name} dilində daxil edin.
        </Typography>
        <Form methods={methods} className="!w-full" onSubmit={onSubmit}>
          <Stack spacing={3} className="w-full" sx={{ p: 3 }}>
            <Field.Text
              className="!w-full"
              name="title"
              value={getCurrentTitle()}
              onChange={(e) => handleTitleChange(e.target.value)}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <Field.Text
              key={languages[currentStep].code} // Force re-render on step change
              value={getCurrentDescription()}
              name="description"
              onChange={(e) => handleEditorChange(e.target.value)}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <div className={`flex ${currentStep === 0 ? 'justify-end' : 'justify-between'} mt-3`}>
              {currentStep > 0 && (
                <Button
                  type="button"
                  className="!bg-[#1C252E] !w-max !px-4 !py-3 gap-2 !text-white !rounded-xl"
                  onClick={handleBack}
                >
                  Geri
                </Button>
              )}
              <Button
                type="submit"
                className="!bg-[#1C252E] !w-max !px-4 !py-3 gap-2 !text-white !rounded-xl"
              >
                {currentStep === languages.length - 1 ? 'Yadda saxla' : 'Davam et'}
              </Button>
            </div>
          </Stack>
        </Form>
      </Card>
      <CustomTimeline step={currentStep} />
    </div>
  );
}
