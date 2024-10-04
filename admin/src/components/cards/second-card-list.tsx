import type { Value } from 'src/utils/types';

import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { CardItem } from './card-item';

// ----------------------------------------------------------------------

export type ICard = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export function SecondCardList({ data }: { data: Value[] }) {
  const router = useRouter();

  const handleEdit = useCallback(
    (id: string) => {
      router.push(paths.dashboard.about.secondCardEdit(id));
    },
    [router]
  );

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
      >
        {data.map((item, index) => (
          <CardItem
            type="section"
            index={index}
            key={item.id}
            item={item}
            onEdit={() => handleEdit(item.id || '')}
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
