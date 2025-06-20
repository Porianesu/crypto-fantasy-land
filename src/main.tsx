import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { ROOT_PATH } from '@/navigation/routes.tsx'
import PageContainer from '@/components/PageContainer.tsx'
import { StoreProvider } from '@/stores/StoreProvider.tsx'

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
        element: <App />,
      },
    ],
  },
])
createRoot(document.getElementById('root')!).render(
  <StoreProvider initialState={null}>
    <RouterProvider router={router}></RouterProvider>
  </StoreProvider>,
)
