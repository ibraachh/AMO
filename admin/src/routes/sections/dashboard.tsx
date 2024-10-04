import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/index-page/OverView'));
const Home = lazy(() => import('src/pages/dashboard/home/Home'));
const CreateSliderVideo = lazy(() => import('src/pages/dashboard/home/CreateSliderVideo'));

// About
const About = lazy(() => import('src/pages/dashboard/about/About'));
const CardEdit = lazy(() => import('src/pages/dashboard/about/CardEdit'));
const SecondCardEdit = lazy(() => import('src/pages/dashboard/about/SecondCardEdit'));

// About history
const History = lazy(() => import('src/pages/dashboard/history/History'));
const TimeLineCardEdit = lazy(() => import('src/pages/dashboard/history/TimeLineCardEdit'));
const TimeLineCardCreate = lazy(() => import('src/pages/dashboard/history/TimeLineCardCreate'));

// Founder message
const FounderMessage = lazy(() => import('src/pages/dashboard/founder-message/FounderMessage'));

// Companies
const Companies = lazy(() => import('src/pages/dashboard/companies/Companies'));
// const AmoTradeEdit = lazy(() => import('src/pages/dashboard/companies/AmoTradeEdit'));
// const AmoGrowEdit = lazy(() => import('src/pages/dashboard/companies/AmoGrowEdit'));
const AmoCardEdit = lazy(() => import('src/pages/dashboard/companies/AmodoEdit'));
const TransportEdit = lazy(() => import('src/pages/dashboard/companies/TransportEdit'));

// Media Center
const MediaCenter = lazy(() => import('src/pages/dashboard/media-center/MediaCenter'));
const MediaCreate = lazy(() => import('src/pages/dashboard/media-center/MediaCreate'));
const MediaEdit = lazy(() => import('src/pages/dashboard/media-center/MediaEdit'));

// Career
const Career = lazy(() => import('src/pages/dashboard/career/Career'));
const CareerEdit = lazy(() => import('src/pages/dashboard/career/CareerEdit'));
const CareerCreate = lazy(() => import('src/pages/dashboard/career/CareerCreate'));

// Contact
const Contact = lazy(() => import('src/pages/dashboard/contact/Contact'));
const ContactEditView = lazy(() => import('src/pages/dashboard/contact/ContactEdit'));
// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'home',
        children: [
          { element: <Home />, index: true },
          { path: 'list', element: <Home /> },
          { path: 'create-slider-video', element: <CreateSliderVideo /> },
        ],
      },
      {
        path: 'about',
        children: [
          { path: 'main', element: <About /> },
          { path: 'card-edit/:id', element: <CardEdit /> },
          { path: 'second-card-edit/:id', element: <SecondCardEdit /> },
          { path: 'history', element: <History /> },
          { path: 'history/timeline-card-edit/:id', element: <TimeLineCardEdit /> },
          { path: 'history/timeline-card-create', element: <TimeLineCardCreate /> },
          { path: 'founder-message', element: <FounderMessage /> },
        ],
      },
      {
        path: 'companies',
        children: [
          {
            index: true,
            element: <Companies />,
          },
          // {
          //   path: 'edit-card/:id',
          //   // element: <AmoTradeEdit />,
          // },
          // {
          //   path: 'edit-grow-card/:id',
          //   // element: <AmoGrowEdit />,
          // },
          {
            path: 'edit-amo-card/:id',
            element: <AmoCardEdit />,
          },
          {
            path: 'amo-transport-edit/:id',
            element: <TransportEdit />,
          },
        ],
      },
      {
        path: 'media-center',
        children: [
          { path: 'list', element: <MediaCenter />, index: true },
          { path: 'create', element: <MediaCreate /> },
          { path: 'edit/:id', element: <MediaEdit /> },
        ],
      },
      {
        path: 'career',
        children: [
          { path: 'list', element: <Career />, index: true },
          { path: 'create', element: <CareerCreate /> },
          { path: 'edit/:id', element: <CareerEdit /> },
        ],
      },
      {
        path: 'contact',
        children: [
          { path: 'list', element: <Contact /> },
          { path: 'edit', element: <ContactEditView /> },
        ],
      },
    ],
  },
];
