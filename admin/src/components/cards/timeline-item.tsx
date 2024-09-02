import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import { ITimeLine } from './timeline-card-list';

// ----------------------------------------------------------------------

type Props = {
  item: ITimeLine;
  onEdit: () => void;
  onDelete: () => void;
};

export function TimeLineItem({ item, onEdit, onDelete }: Props) {
  const popover = usePopover();

  return (
    <>
      <Card>
        <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>

        <Stack sx={{ p: 3, pb: 1 }}>
          <span className="font-bold">{item.title}</span>
        </Stack>

        <Box sx={{ p: 3, pt: 0 }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius voluptatibus consequuntur
          alias molestiae dolores! Minus facilis non quae distinctio fugit? Veritatis adipisci
          eveniet perspiciatis laborum quas cum soluta accusamus inventore.
        </Box>
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
