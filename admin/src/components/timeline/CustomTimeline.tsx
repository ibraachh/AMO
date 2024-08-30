import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { getLanguages } from 'src/utils/data';

export default function CustomTimeline({ step }: { step: number }) {
  const languages = getLanguages;

  return (
    <div className="flex align-center justify-center mt-2">
      <Timeline className="timeline" sx={{ width: '100px' }}>
        {languages.map((language, index) => (
          <TimelineItem key={language.id}>
            <TimelineSeparator>
              <TimelineDot color={step >= index ? 'success' : 'grey'} />
              {index < languages.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>{language.code.toUpperCase()}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}
