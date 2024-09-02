import { Divider, Typography } from '@mui/material';
import { SecondCardList } from 'src/components/cards/second-card-list';

const data = [
  {
    id: '1',
    title: 'Mission',
    description:
      'The whole lot we create from manufacturing to delivery to documentation has been carefully and thoughtfully built to the very maximum standards.',
    icon: '/assets/icons/card/card-icon5.svg',
  },
  {
    id: '2',
    title: 'Vision',
    description:
      'The whole lot we create from manufacturing to delivery to documentation has been carefully and thoughtfully built to the very maximum standards.',
    icon: '/assets/icons/card/card-icon6.svg',
  },
];

export default function SectionBottom() {
  return (
    <div>
      <Typography variant="h5" sx={{ mb: 5 }}>
        Section №3
      </Typography>
      <Divider />

      <SecondCardList data={data} />
    </div>
  );
}
