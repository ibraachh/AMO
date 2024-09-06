import { CardList } from 'src/components/cards/card-list';

const data = [
  {
    id: '1',
    title: 'Quality',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius voluptatibus consequuntur alias molestiae dolores! Minus facilis non quae distinctio fugit? Veritatis adipisci eveniet perspiciatis laborum quas cum soluta accusamus inventore.',
    icon: '/assets/icons/card/card-icon1.svg',
  },
  {
    id: '2',
    title: 'Collaboration',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius voluptatibus consequuntur alias molestiae dolores! Minus facilis non quae distinctio fugit? Veritatis adipisci eveniet perspiciatis laborum quas cum soluta accusamus inventore.',
    icon: '/assets/icons/card/card-icon2.svg',
  },
  {
    id: '3',
    title: 'Innovation',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius voluptatibus consequuntur alias molestiae dolores! Minus facilis non quae distinctio fugit? Veritatis adipisci eveniet perspiciatis laborum quas cum soluta accusamus inventore.',
    icon: '/assets/icons/card/card-icon3.svg',
  },
  {
    id: '4',
    title: 'Integrity',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius voluptatibus consequuntur alias molestiae dolores! Minus facilis non quae distinctio fugit? Veritatis adipisci eveniet perspiciatis laborum quas cum soluta accusamus inventore.',
    icon: '/assets/icons/card/card-icon4.svg',
  },
];

export default function ValueCards() {
  return (
    <div>
      <CardList data={data} />
    </div>
  );
}
