import type { IJobItem } from 'src/types/job';

import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { useRouter } from 'src/routes/hooks';

import { paths } from 'src/routes/paths';
import { CareerItem } from './career-item';

// ----------------------------------------------------------------------

type Props = {
  jobs: IJobItem[];
};

export function CareerList({ jobs }: Props) {
  const router = useRouter();

  const handleEdit = useCallback(
    (id: string) => {
      router.push(paths.dashboard.career.edit(id));
    },
    [router]
  );

  const handleDelete = useCallback((id: string) => {
    console.info('DELETE', id);
  }, []);

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
