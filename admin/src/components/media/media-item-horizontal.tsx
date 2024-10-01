import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import type { Media } from 'src/utils/types';
import { BASE_URL } from 'src/utils/axios';
import { deleteMediaById } from 'src/api/backendServies';
import { toast } from 'sonner';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

type Props = {
  post: Media;
  mutate?: () => void;
};

export function MediaItemHorizontal({ post, mutate }: Props) {
  const theme = useTheme();

  const popover = usePopover();

  const router = useRouter();

  const { image, translations } = post;

  const handleDelete = async () => {
    popover.onClose();
    const res = await deleteMediaById(post?.id ?? '');
    if (res && mutate) {
      toast.success('Media deleted successfully');
      mutate();
    }
  };

  const handleEdit = () => {
    popover.onClose();
    router.push(paths.dashboard.mediaCenter.edit(post?.id ?? ''));
  };

  return (
    <>
      <Card sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
        <Stack spacing={1} sx={{ p: theme.spacing(3, 3, 2, 3) }}>
          <Stack spacing={1} flexGrow={1}>
            {translations[0].title}

            <span dangerouslySetInnerHTML={{ __html: translations[0].description }} />
          </Stack>

          <Box display="flex" alignItems="center">
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-horizontal-fill" />
            </IconButton>
          </Box>
        </Stack>
        <Box
          sx={{
            p: 1,
            width: '100%',
            height: 340,
            flexShrink: 0,
            position: 'relative',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Image
            // alt={title}
            className="w-full"
            src={`${BASE_URL}api/file/getFile/${image}`}
            sx={{ height: 1, borderRadius: 1.5 }}
          />
        </Box>
      </Card>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'bottom-center' } }}
      >
        <MenuList>
          <MenuItem onClick={handleEdit}>
            <Iconify icon="eva:edit-fill" />
            Edit
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
