import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import type { SliderVideo } from 'src/utils/types';
import { deleteVideo } from 'src/api/backendServies';
import { toast } from 'sonner';
import { SliderItem } from './slider-item';

// ----------------------------------------------------------------------

export function SliderList({ data, mutate }: { data: SliderVideo[]; mutate: () => void }) {
  const handleDeleteVideo = async (videoId: string) => {
    const response = await deleteVideo(videoId);
    if (response) {
      toast.success('Xəbər uğurla silindi!');
    } else {
      toast.error('Xəta baş verdi!');
    }
    mutate();
  };

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
      >
        {data.map((item) => (
          <SliderItem key={item.id} tour={item} onDelete={() => handleDeleteVideo(item.id)} />
        ))}
      </Box>

      {data.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: { xs: 5, md: 8 },
            [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
          }}
        />
      )}
    </>
  );
}
