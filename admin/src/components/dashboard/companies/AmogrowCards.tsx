import type { CompanyCard } from 'src/utils/types';

import { AmogrowCardList } from 'src/components/cards/amogrow-card-list';

export default function AmogrowCards({ cards }: { cards: CompanyCard[] }) {
  return <AmogrowCardList data={cards} />;
}
