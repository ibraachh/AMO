import type { CompanyCard } from 'src/utils/types';

import { useCallback } from 'react';

import Box from '@mui/material/Box';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { CompanyCardItem } from './company-card-item';

// ----------------------------------------------------------------------

export function AmotradeCardList({ data }: { data: CompanyCard[] }) {
  const router = useRouter();

  const handleEdit = useCallback(
    (id: string) => {
      router.push(paths.dashboard.companies.editAmoCard(id));
    },
    [router]
  );

  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
    >
      {data?.map((item) => (
        <CompanyCardItem key={item.id} item={item} onEdit={() => handleEdit(item.id)} />
      ))}
    </Box>
  );
}
