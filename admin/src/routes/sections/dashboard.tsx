import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/index-page/OverView'));
const Home = lazy(() => import('src/pages/dashboard/home/Home'));

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
      { path: 'home', element: <Home /> },
      {
        path: 'about',
        children: [
          { path: 'root', element: <About /> },
          { path: 'card-edit/:id', element: <CardEdit /> },
          { path: 'second-card-edit/:id', element: <SecondCardEdit /> },
          { path: 'history', element: <History /> },
          { path: 'history/timeline-card-edit/:id', element: <TimeLineCardEdit /> },
          { path: 'history/timeline-card-create', element: <TimeLineCardCreate /> },
          { path: 'founder-message', element: <FounderMessage /> },
        ],
      },
    ],
  },
];
