import type { CompanyCard } from 'src/utils/types';

import { AmotradeCardList } from 'src/components/cards/amotrade-card-list';

export default function AmotradeCards({ cards }: { cards: CompanyCard[] }) {
  return <AmotradeCardList data={cards} />;
}
