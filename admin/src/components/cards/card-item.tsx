import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import type { Value } from 'src/utils/types';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  item: Value;
  onEdit: () => void;
  index: number;
  type?: string;
};

export function CardItem({ item, type, index, onEdit }: Props) {
  const popover = usePopover();

  return (
    <>
      <Card>
        <Stack sx={{ p: 3, pb: 1 }}>
          <img
            src={`/assets/icons/card/${type ? `${type}-` : ''}card-icon${index + 1}.svg`}
            alt=""
            className="w-[50px] h-[50px]"
          />
        </Stack>
        <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>

        <Stack sx={{ p: 3, pb: 1 }}>
          <span className="font-bold">{item?.title}</span>
        </Stack>

        <Typography
          variant="subtitle2"
          sx={{ p: 3, pt: 0 }}
          dangerouslySetInnerHTML={{ __html: item?.description }}
        />
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
        </MenuList>
      </CustomPopover>
    </>
  );
}
