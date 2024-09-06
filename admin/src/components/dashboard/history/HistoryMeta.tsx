import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, Stack, Button, Typography, Chip } from '@mui/material';

import { Form, Field } from 'src/components/hook-form';

import { toast } from 'sonner';
import { _tags } from 'src/_mock';

export type NewProductSchemaType = zod.infer<typeof NewProductSchema>;

export const NewProductSchema = zod.object({
  metaTitle: zod.string().optional(),
  metaDescription: zod.string().optional(),
  tags: zod.array(zod.string()).optional(),
});

interface ProductData {
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
}

export default function HistoryMeta() {
  const [step, setStep] = useState(0);
  const [productData, setProductData] = useState<ProductData>({
    metaTitle: '',
    metaDescription: '',
    tags: [],
  });

  const defaultValues = useMemo(
    () => ({
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

  const onSubmit = handleSubmit(async (data) => {
    console.log('Final Product Data:', productData);
    setProductData({
      metaTitle: '',
      metaDescription: '',
      tags: [],
    });
    reset(defaultValues);
    toast.success('Başlıq əlavə olundu');
    setStep(0);
  });

  return (
    <div className="flex w-full mx-auto">
      <Card className="w-full" sx={{ my: 3 }}>
        <Form methods={methods} className="!w-full" onSubmit={onSubmit}>
          <Stack spacing={3} className="w-full" sx={{ p: 3 }}>
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
                Yadda saxla
              </Button>
            </div>
          </Stack>
        </Form>
      </Card>
    </div>
  );
}
