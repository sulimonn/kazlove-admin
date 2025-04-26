import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const ProfilePage = lazy(() => import('src/pages/profile'));
export const FiltersPage = lazy(() => import('src/pages/filters'));
export const TariffsPage = lazy(() => import('src/pages/tariffs'));
export const UserPage = lazy(() => import('src/pages/user'));
export const UserDataPage = lazy(() => import('src/pages/user-page'));
export const AdminForm = lazy(() => import('src/pages/add-admin'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProfilesPage = lazy(() => import('src/pages/profiles'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <UserPage />, index: true },
        { path: 'users', element: <UserPage /> },
        { path: 'users/:id', element: <UserDataPage /> },
        { path: 'users/add', element: <AdminForm /> },
        { path: 'profiles', element: <ProfilesPage /> },
        { path: 'profiles/:type', element: <ProfilesPage /> },
        { path: 'profiles/:type/:id', element: <ProfilePage /> },
        { path: 'filters', element: <FiltersPage /> },
        { path: 'tarifs', element: <TariffsPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
