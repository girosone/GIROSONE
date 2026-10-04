import { Outlet, ScrollRestoration } from 'react-router'
import Header from '@/components/Header'

const MainLayout = () => (
  <div className="flex min-h-dvh flex-col bg-surface">
    <Header />
    <main className="flex-1">
      <Outlet />
    </main>
    <ScrollRestoration />
  </div>
)

export default MainLayout
