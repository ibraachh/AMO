import { CardList } from 'src/components/cards/card-list';
import type { Value } from 'src/utils/types';

export default function ValueCards({ values }: { values: Value[] }) {
  return (
    <div>
      <CardList data={values} />
    </div>
  );
}
