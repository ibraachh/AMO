import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { fDate } from 'src/utils/format-time';
import type { Career } from 'src/utils/types';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  job: Career;
  onEdit: () => void;
  onDelete: () => void;
};

export function CareerItem({ job, onEdit, onDelete }: Props) {
  const popover = usePopover();

  return (
    <>
      <Card>
        <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>

        <Stack sx={{ p: 3, pb: 2 }}>
          <ListItemText
            sx={{ mb: 1 }}
            primary={job.title}
            secondary={`Bitmə tarixi: ${fDate(job.date)}`}
            primaryTypographyProps={{ typography: 'subtitle1' }}
            secondaryTypographyProps={{
              mt: 1,
              component: 'span',
              typography: 'caption',
              color: 'text.disabled',
            }}
          />

          <Typography dangerouslySetInnerHTML={{ __html: job.description }} />
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
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
              onEdit();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

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
