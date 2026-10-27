import { Outlet, ScrollRestoration, useMatches } from 'react-router'
import AnnouncementBar from '@/components/AnnouncementBar'
import BackToTop from '@/components/BackToTop'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { announcement } from '@/data/navigation'

// A route opts in to the transparent navbar with `handle: { transparentHeader: true }`.
const MainLayout = () => {
  const transparentHeader = useMatches().some((match) => match.handle?.transparentHeader)

  return (
    <div className="flex min-h-dvh flex-col bg-bg">
      <AnnouncementBar {...announcement} />
      <Header overlay={transparentHeader} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <ScrollRestoration />
    </div>
  )
}

export default MainLayout
