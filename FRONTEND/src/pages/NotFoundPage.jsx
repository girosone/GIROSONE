import { Link } from 'react-router'

const NotFoundPage = () => (
  <section className="page-container flex min-h-[60dvh] flex-col items-center justify-center py-16 text-center">
    <p className="font-heading text-6xl font-semibold text-gold sm:text-7xl">404</p>
    <h1 className="mt-4 text-2xl sm:text-3xl">Page not found</h1>
    <p className="mt-3 max-w-md text-ink/70">
      The page you are looking for doesn’t exist or has been moved.
    </p>
    <Link
      to="/"
      className="mt-8 inline-flex min-h-11 items-center justify-center rounded-button bg-gold px-8 font-medium text-white transition-colors hover:bg-olive"
    >
      Back to home
    </Link>
  </section>
)

export default NotFoundPage
