import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import type { SliderVideo } from 'src/utils/types';
import { BASE_URL } from 'src/utils/axios';
import { endpoints } from 'src/utils/endpoints';

// ----------------------------------------------------------------------

type Props = {
  tour: SliderVideo;
  onDelete: () => void;
};

export function SliderItem({ tour, onDelete }: Props) {
  const popover = usePopover();


  const renderImages = (
    <Box gap={0.5} display="flex" sx={{ p: 1 }}>
      <Box flexGrow={1} sx={{ position: 'relative' }}>
        <video
          // alt={tour.videoUrl}
          src={`${BASE_URL}${endpoints.getFile.getByFileName}${tour.videoUrl}`}
          // sx={{ width: 1, height: 164, borderRadius: 1 }}
        />
      </Box>
    </Box>
  );

  const renderInfo = (
    <Stack
      spacing={1.5}
      sx={{ position: 'relative', p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5), mt: 4 }}
    >
      <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', bottom: 20, right: 8 }}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    </Stack>
  );

  return (
    <>
      <Card>
        {renderImages}

        {renderInfo}
      </Card>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              popover.onClose();
              onDelete();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
