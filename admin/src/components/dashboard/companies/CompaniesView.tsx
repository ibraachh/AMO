import { Card, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import Amotrade from './Amotrade';
import Amogrow from './Amogrow';
import Amodo from './Amodo';
import Amotransport from './Amotransport';

export default function CompaniesView() {
  const [activeTab, setActiveTab] = useState(1);
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

        {activeTab === 1 && <Amotrade />}
        {activeTab === 2 && <Amogrow />}
        {activeTab === 3 && <Amodo />}
        {activeTab === 4 && <Amotransport />}
      </Card>
    </DashboardContent>
  );
}
