import { Button, Grid } from '@mui/material';
import { _appFeatured } from 'src/_mock';
import SeoIllustration from 'src/assets/illustrations/seo-illustration';
import { DashboardContent } from 'src/layouts/dashboard';
import { AppAreaInstalled } from 'src/sections/dashboard/app-area-installed';
import { AppCurrentDownload } from 'src/sections/dashboard/app-current-download';
import { AppFeatured } from 'src/sections/dashboard/app-featured';
import { AppWelcome } from 'src/sections/dashboard/app-welcome';
import { AppWidgetSummary } from 'src/sections/dashboard/app-widget-summary';

export default function StatisticView() {
  return (
    <DashboardContent maxWidth="xl">
      <Grid className="p-3 !mt-4" container spacing={3}>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <AppWelcome
              title={`Welcome back 👋 \n Admin`}
              description="If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything."
              img={<SeoIllustration hideBackground />}
              action={
                <Button variant="contained" color="primary">
                  Go now
                </Button>
              }
            />
          </div>

          <div className="col-span-1">
            <AppFeatured list={_appFeatured} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 my-4 w-full">
          <div className="!w-full">
            <AppWidgetSummary
              title="Total active users"
              percent={2.6}
              total={18765}
              chart={{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                series: [15, 18, 12, 51, 68, 11, 39, 37],
              }}
            />
          </div>
          <div className="!w-full">
            <AppWidgetSummary
              title="Total installed"
              percent={0.2}
              total={4876}
              chart={{
                // colors: [theme.vars.palette.info.main],
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                series: [20, 41, 63, 33, 28, 35, 50, 46],
              }}
            />
          </div>
          <div className="!w-full">
            <AppWidgetSummary
              title="Total downloads"
              percent={-0.1}
              total={678}
              chart={{
                // colors: [theme.vars.palette.error.main],
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                series: [18, 19, 31, 8, 16, 37, 12, 33],
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1 !w-full ">
          <div className="col-span-1 !w-full">
            <AppCurrentDownload
              title="Current download"
              subheader="Downloaded by operating system"
              chart={{
                series: [
                  { label: 'Mac', value: 12244 },
                  { label: 'Window', value: 53345 },
                  { label: 'iOS', value: 44313 },
                  { label: 'Android', value: 78343 },
                ],
              }}
            />
          </div>

          <div className="md:col-span-2">
            <AppAreaInstalled
              title="Area installed"
              subheader="(+43%) than last year"
              chart={{
                categories: [
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ],
                series: [
                  {
                    name: '2022',
                    data: [
                      { name: 'Asia', data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16] },
                      { name: 'Europe', data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16] },
                      { name: 'Americas', data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16] },
                    ],
                  },
                  {
                    name: '2023',
                    data: [
                      { name: 'Asia', data: [6, 18, 14, 9, 20, 6, 22, 19, 8, 22, 8, 17] },
                      { name: 'Europe', data: [6, 18, 14, 9, 20, 6, 22, 19, 8, 22, 8, 17] },
                      { name: 'Americas', data: [6, 18, 14, 9, 20, 6, 22, 19, 8, 22, 8, 17] },
                    ],
                  },
                  {
                    name: '2024',
                    data: [
                      { name: 'Asia', data: [6, 20, 15, 18, 7, 24, 6, 10, 12, 17, 18, 10] },
                      { name: 'Europe', data: [6, 20, 15, 18, 7, 24, 6, 10, 12, 17, 18, 10] },
                      { name: 'Americas', data: [6, 20, 15, 18, 7, 24, 6, 10, 12, 17, 18, 10] },
                    ],
                  },
                ],
              }}
            />
          </div>
        </div>
      </Grid>
    </DashboardContent>
  );
}
