import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Loader from '@/components/Loader'
import MainLayout from '@/layouts/MainLayout'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'

// Dev-only component showcase. The branch is dropped from production builds.
const ComponentShowcase = import.meta.env.DEV
  ? lazy(() => import('@/pages/ComponentShowcase'))
  : null

const devRoutes = ComponentShowcase
  ? [
      {
        path: 'dev/components',
        element: (
          <Suspense fallback={<Loader />}>
            <ComponentShowcase />
          </Suspense>
        ),
      },
    ]
  : []

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage />, handle: { transparentHeader: true } },
      ...devRoutes,
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

const App = () => <RouterProvider router={router} />

export default App
