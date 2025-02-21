import { Card, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { getFile, useGetCompanyAllByName } from 'src/api/backendServies';
import { CompanyEnum } from 'src/utils/enum';
import Amotrade from './Amotrade';
import Amogrow from './Amogrow';
import Amodo from './Amodo';
import Amotransport from './Amotransport';

export default function CompaniesView() {
  const [activeTab, setActiveTab] = useState(1);
  const { company, companyLoading } = useGetCompanyAllByName(CompanyEnum.amoTransport);
  const { company: amodo, companyLoading: amodoLoading } = useGetCompanyAllByName(
    CompanyEnum.amoDo
  );
  const { company: amogrow, companyLoading: amogrowLoading } = useGetCompanyAllByName(
    CompanyEnum.amoGrow
  );

  const { company: amotrade, companyLoading: amotradeLoading } = useGetCompanyAllByName(
    CompanyEnum.amoTrade
  );

  const { file } = getFile(company?.logo);
  const { file: amodoFile } = getFile(amodo?.logo);
  const { file: amogrowFile } = getFile(amogrow?.logo);
  const { file: amotradeFile } = getFile(amotrade?.logo);

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Şirkətlər"
        links={[{ name: 'Saytın aktivliyi', href: paths.dashboard.root }, { name: 'Şirkətlər' }]}
      />

      <Card className="p-6 mt-4">
        <Tabs value={activeTab} onChange={(event, newValue) => setActiveTab(newValue)}>
          <Tab value={1} label="Amotrade" />
          <Tab value={2} label="Amogrow" />
          <Tab value={3} label="Amo D.O" />
          <Tab value={4} label="Amotransport" />
        </Tabs>

        {activeTab === 1 && !amotradeLoading && amotradeFile && (
          <Amotrade file={amotradeFile} post={amotrade} />
        )}
        {activeTab === 2 && !amogrowLoading && amogrowFile && (
          <Amogrow file={amogrowFile} post={amogrow} />
        )}
        {activeTab === 3 && !amodoLoading && amodoFile && <Amodo file={amodoFile} post={amodo} />}
        {activeTab === 4 && !companyLoading && file && <Amotransport file={file} post={company} />}
      </Card>
    </DashboardContent>
  );
}
