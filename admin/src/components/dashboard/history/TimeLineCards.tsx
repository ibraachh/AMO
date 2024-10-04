import { Button } from '@mui/material';
import { useGetAllChronology } from 'src/api/backendServies';
import { TimeLineList } from 'src/components/cards/timeline-card-list';
import { Iconify } from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

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
