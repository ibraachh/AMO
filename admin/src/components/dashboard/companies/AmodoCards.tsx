import type { CompanyCard } from 'src/utils/types';

import { AmodoCardList } from 'src/components/cards/amodo-card-list';

export default function AmodoCards({ cards }: { cards: CompanyCard[] }) {
  return <AmodoCardList data={cards} />;
}
