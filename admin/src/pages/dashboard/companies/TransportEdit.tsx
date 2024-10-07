import { Helmet } from 'react-helmet-async';
import { useGetCompanyCardDetail } from 'src/api/backendServies';
import TransportEditView from 'src/components/dashboard/companies/TransportEditView';
import { useParams } from 'src/routes/hooks';

const metaData = {
  title: 'Amodo redaktə et',
};

export default function TransportEdit() {
  const { id } = useParams();
  const { data, dataLoading } = useGetCompanyCardDetail(id ?? '');
  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
      </Helmet>

      {!dataLoading && <TransportEditView initialData={data} />}
    </>
  );
}
