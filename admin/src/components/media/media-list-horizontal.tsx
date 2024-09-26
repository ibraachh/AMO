import type { Media } from 'src/utils/types';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import { MediaItemSkeleton } from './media-skeleton';
import { MediaItemHorizontal } from './media-item-horizontal';

// ----------------------------------------------------------------------

type Props = {
  posts: Media[];
  loading?: boolean;
  mutate?: () => void;
};

export function MediaListHorizontal({ posts, loading, mutate }: Props) {
  const [page, setPage] = useState(1);
  const perPage = 4; 

  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Sayfa numaralarına göre slice işlemi
  const paginatedPosts = posts.slice((page - 1) * perPage, page * perPage);

  const renderLoading = Array.from({ length: perPage }, (_, index) => (
    <MediaItemSkeleton key={index} variant="horizontal" />
  ));

  const renderList = paginatedPosts.map((post) => (
    <MediaItemHorizontal mutate={mutate} key={post.id} post={post} />
  ));

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      >
        {loading ? renderLoading : renderList}
      </Box>

      {/* Pagination sadece toplam post sayısı sayfa başına gösterimden fazla ise gösterilsin */}
      {posts.length > perPage && (
        <Pagination
          count={Math.ceil(posts.length / perPage)} // Dinamik sayfa sayısı
          page={page}
          onChange={handleChangePage} // Sayfa değişikliği
          sx={{
            mt: { xs: 5, md: 8 },
            [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
          }}
        />
      )}
    </>
  );
}
