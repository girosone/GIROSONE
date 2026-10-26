import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Loader from '@/components/Loader'
import MainLayout from '@/layouts/MainLayout'
import AboutPage from '@/pages/AboutPage'
import CategoryPage from '@/pages/CategoryPage'
import ContactPage from '@/pages/ContactPage'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'
import ProductPage from '@/pages/ProductPage'
import WholesalePage from '@/pages/WholesalePage'

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
      { path: 'category/:categoryName', element: <CategoryPage /> },
      { path: 'product/:productName', element: <ProductPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'wholesale', element: <WholesalePage /> },
      { path: 'contact', element: <ContactPage /> },
      ...devRoutes,
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

const App = () => <RouterProvider router={router} />

export default App
