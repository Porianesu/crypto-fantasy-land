import React, { type PropsWithChildren, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'
import { ENTRANCE_PATH, HOME_PATH, homePageLoader, ROOT_PATH } from '@/navigation/routes.tsx'
import PageContainer from '@/components/PageContainer.tsx'
import { StoreProvider } from '@/stores/StoreProvider.tsx'
import EntrancePage from '@/pages/EntrancePage.tsx'
const HomePage = React.lazy(() => import('@/pages/HomePage/HomePage.tsx'))

const CommonPageSuspense: React.FC<PropsWithChildren> = ({ children }) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
}
const router = createBrowserRouter([
  {
    path: ROOT_PATH,
    errorElement: null,
    element: (
      <PageContainer>
        <Outlet></Outlet>
      </PageContainer>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={ENTRANCE_PATH}></Navigate>,
      },
      {
        path: ENTRANCE_PATH,
        element: <EntrancePage></EntrancePage>,
      },
      {
        path: HOME_PATH,
        loader: homePageLoader,
        element: (
          <CommonPageSuspense>
            <HomePage></HomePage>
          </CommonPageSuspense>
        ),
      },
    ],
  },
])
createRoot(document.getElementById('root')!).render(
  <StoreProvider initialState={null}>
    <RouterProvider router={router}></RouterProvider>
  </StoreProvider>,
)
