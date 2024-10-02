import { Typography } from '@mui/material';
import { SecondCardList } from 'src/components/cards/second-card-list';
import type { Value } from 'src/utils/types';

export default function SectionBottom({ missions }: { missions: Value[] }) {
  return (
    <div className="mt-4">
      <Typography variant="h5" sx={{ mb: 5 }}>
        Section №3
      </Typography>

      <SecondCardList data={missions} />
    </div>
  );
}
