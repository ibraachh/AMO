import { useGetCompany } from 'src/api/backendServies';
import { TransportCardList } from 'src/components/cards/transport-card-list';
import { CompanyEnum } from 'src/utils/enum';

export default function AmoTransportCards() {
  const { company } = useGetCompany(CompanyEnum.amoTransport);

  return <TransportCardList data={company} />;
}
