import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Field, Form } from 'src/components/hook-form';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { Button } from '@mui/material';
import { useAddVideo } from 'src/api/backendServies';
import { toast } from 'sonner';
import { useRouter } from 'src/routes/hooks';

export const NewProductSchema = zod.object({
  video: zod.instanceof(File, { message: 'Video tələb olunur' }),
});

type NewProductSchemaType = zod.infer<typeof NewProductSchema>;

export default function CreateSliderVideoView() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const defaultValues = useMemo(
    () => ({
      video: undefined,
    }),
    []
  );

  const methods = useForm<NewProductSchemaType>({
    resolver: zodResolver(NewProductSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const { handleSubmit, watch, setValue } = methods;

  const video = watch('video');

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      const response = await useAddVideo(data);
      setIsLoading(false);
      if (response) {
        toast.success('Video əlavə edildi!');
        setInterval(() => {
          router.push(paths.dashboard.home.list);
          router.refresh();
        }, 1000);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  });

  const handleRemove = () => {
    setValue('video', new File([], ''), { shouldValidate: true });
  };

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Slider video yarat"
        links={[
          { name: 'Ana səhifə', href: paths.dashboard.root },
          { name: 'Slayder videoları', href: paths.dashboard.home.list },
          { name: 'Slayder video yarat' },
        ]}
      />
      <Form methods={methods} onSubmit={onSubmit} className="py-8">
        <div className="max-h-[500px] overflow-hidden">
          <Field.UploadVideo name="video" onDelete={handleRemove} />
        </div>

        <div className="flex justify-end">
          <Button
            variant="contained"
            type="submit"
            className="!mt-4"
            disabled={!video || isLoading}
          >
            {isLoading ? 'Yüklənir...' : 'Əlavə et'}
          </Button>
        </div>
      </Form>
    </DashboardContent>
  );
}
