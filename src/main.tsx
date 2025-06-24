import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'
import { ENTRANCE_PATH, HOME_PATH, homePageLoader, ROOT_PATH } from '@/navigation/routes.tsx'
import PageContainer from '@/components/PageContainer.tsx'
import { StoreProvider } from '@/stores/StoreProvider.tsx'
import EntrancePage from '@/pages/EntrancePage.tsx'
import HomePage from '@/pages/HomePage/HomePage.tsx'

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
        element: <HomePage></HomePage>,
      },
    ],
  },
])
createRoot(document.getElementById('root')!).render(
  <StoreProvider initialState={null}>
    <RouterProvider router={router}></RouterProvider>
  </StoreProvider>,
)
