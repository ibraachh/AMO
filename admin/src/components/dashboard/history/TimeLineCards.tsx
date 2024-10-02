import { Button } from '@mui/material';
import { useGetAllChronology } from 'src/api/backendServies';
import { TimeLineList } from 'src/components/cards/timeline-card-list';
import { Iconify } from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

const data = [
  {
    id: '1',
    title: '1995',
    description:
      'The whole lot we create from manufacturing to delivery to documentation has been carefully and thoughtfully built to the very maximum standards.',
  },
  {
    id: '2',
    title: '2006',
    description:
      'The whole lot we create from manufacturing to delivery to documentation has been carefully and thoughtfully built to the very maximum standards.',
  },
  {
    id: '3',
    title: '1999',
    description:
      'The whole lot we create from manufacturing to delivery to documentation has been carefully and thoughtfully built to the very maximum standards.',
  },
];

export default function TimeLineCards() {
  const { chronology, mutate } = useGetAllChronology();

  return (
    <div className="my-8">
      <TimeLineList mutate={mutate} data={chronology} />
      <div className="my-6 flex justify-end">
        <Button
          variant="contained"
          component={RouterLink}
          href={paths.dashboard.about.timeLineCardCreate}
          startIcon={<Iconify icon="mingcute:add-line" />}
          className="!h-max !mt-auto"
        >
          Yeni kart əlavə edin
        </Button>
      </div>
    </div>
  );
}
