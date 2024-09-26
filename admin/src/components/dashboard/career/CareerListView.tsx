import { useCallback } from 'react';

import Stack from '@mui/material/Stack';

import { useSetState } from 'src/hooks/use-set-state';

import { EmptyContent } from 'src/components/empty-content';
import { useGetCareerList } from 'src/api/backendServies';
import type { Career } from 'src/utils/types';
import { CareerSearch } from './view/career-search';
import { CareerList } from './view/career-list';

// ----------------------------------------------------------------------

export function CareerListView() {
  const search = useSetState<{
    query: string;
    results: Career[];
  }>({ query: '', results: [] });

  const { careers, mutate } = useGetCareerList();

  const notFound = !careers.length;

  const handleSearch = useCallback(
    (inputValue: string) => {
      search.setState({ query: inputValue });

      if (inputValue) {
        const results = careers.filter(
          (job: Career) => job.title.toLowerCase().indexOf(search.state.query.toLowerCase()) !== -1
        );

        search.setState({ results });
      }
    },
    [search, careers]
  );

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
    >
      <CareerSearch search={search} onSearch={handleSearch} />
    </Stack>
  );

  return (
    <div className="my-4">
      <Stack spacing={2.5} sx={{ mb: { xs: 3, md: 5 } }}>
        {renderFilters}
      </Stack>

      {notFound && <EmptyContent filled sx={{ py: 10 }} />}

      <CareerList mutate={mutate} jobs={careers} />
    </div>
  );
}

// ----------------------------------------------------------------------
