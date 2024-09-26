import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { useRouter } from 'src/routes/hooks';

import { paths } from 'src/routes/paths';
import { toast } from 'sonner';
import type { Career } from 'src/utils/types';
import { deleteCareerById } from 'src/api/backendServies';
import { CareerItem } from './career-item';

// ----------------------------------------------------------------------

type Props = {
  jobs: Career[];
  mutate: () => void;
};

export function CareerList({ jobs, mutate }: Props) {
  const router = useRouter();

  const handleEdit = useCallback(
    (id: string) => {
      router.push(paths.dashboard.career.edit(id));
    },
    [router]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      const res = await deleteCareerById(id);

      if (!res) {
        toast.error('Xəta baş verdi!');
        return;
      }
      toast.success('Vakansiya ugurla silindi!');
      mutate();
    },
    [mutate]
  );

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
      >
        {jobs.map((job) => (
          <CareerItem
            key={job.id}
            job={job}
            onEdit={() => handleEdit(job.id)}
            onDelete={() => handleDelete(job.id)}
          />
        ))}
      </Box>

      {jobs.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: { xs: 8, md: 8 },
            [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
          }}
        />
      )}
    </>
  );
}
