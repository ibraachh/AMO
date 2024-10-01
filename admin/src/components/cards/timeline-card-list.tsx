import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { TimeLineItem } from './timeline-item';
import { Value } from 'src/utils/types';
import { deleteChronologyById } from 'src/api/backendServies';
import { toast } from 'sonner';

// ----------------------------------------------------------------------

export type ITimeLine = {
  id: string;
  title: string;
  description: string;
};

export function TimeLineList({ data, mutate }: { data: Value[]; mutate: () => void }) {
  const router = useRouter();

  const handleEdit = useCallback(
    (id: string) => {
      router.push(paths.dashboard.about.timeLineCardEdit(id));
    },
    [router]
  );

  const handleDelete = useCallback(async (id: string) => {
    const res = await deleteChronologyById(id);
    if (res && mutate) {
      toast.success('Tarixcə ugurla silindi!');
      mutate();
    }
  }, []);

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
      >
        {data.map((item) => (
          <TimeLineItem
            key={item.id}
            item={item}
            onEdit={() => handleEdit(item.id || '')}
            onDelete={() => handleDelete(item.id || '')}
          />
        ))}
      </Box>

      {data.length > 8 && (
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
