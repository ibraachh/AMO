import { TransportCardList } from 'src/components/cards/transport-card-list';

const data = [
  {
    id: '1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ante leo, vehicula ac tempor ac, mattis et nisi. Donec eu libero sit amet eros posuere tincidunt. Vivamus nisi nulla, sagittis commodo turpis eget, pretium vestibulum lacus.',
  },
  {
    id: '2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ante leo, vehicula ac tempor ac, mattis et nisi. Donec eu libero sit amet eros posuere tincidunt. Vivamus nisi nulla, sagittis commodo turpis eget, pretium vestibulum lacus.',
  },
  {
    id: '3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ante leo, vehicula ac tempor ac, mattis et nisi. Donec eu libero sit amet eros posuere tincidunt. Vivamus nisi nulla, sagittis commodo turpis eget, pretium vestibulum lacus.',
  },
];
export default function AmoTransportCards() {
  return <TransportCardList data={data} />;
}
