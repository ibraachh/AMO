import { Helmet } from 'react-helmet-async';
import { useGetCompanyCardDetail } from 'src/api/backendServies';
import AmodoEditView from 'src/components/dashboard/companies/AmodoEditView';
import { useParams } from 'src/routes/hooks';

const metaData = {
  title: 'Amodo redaktə et',
};

export default function AmodoEdit() {
  const { id } = useParams();
  const { data, dataLoading } = useGetCompanyCardDetail(id ?? '');
  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
      </Helmet>

      {!dataLoading && <AmodoEditView initialData={data} />}
    </>
  );
}
