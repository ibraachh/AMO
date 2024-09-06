import { AmodoCardList } from 'src/components/cards/amodo-card-list';

const data = [
  {
    id: '1',
    title: 'Amotrade',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ante leo, vehicula ac tempor ac, mattis et nisi. Donec eu libero sit amet eros posuere tincidunt. Vivamus nisi nulla, sagittis commodo turpis eget, pretium vestibulum lacus.',
  },
  {
    id: '2',
    title: 'Amogrow',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ante leo, vehicula ac tempor ac, mattis et nisi. Donec eu libero sit amet eros posuere tincidunt. Vivamus nisi nulla, sagittis commodo turpis eget, pretium vestibulum lacus.',
  },
  {
    id: '3',
    title: 'Amo D.O',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ante leo, vehicula ac tempor ac, mattis et nisi. Donec eu libero sit amet eros posuere tincidunt. Vivamus nisi nulla, sagittis commodo turpis eget, pretium vestibulum lacus.',
  },
];
export default function AmodoCards() {
  return <AmodoCardList data={data} />;
}
