import Button from '@/components/Button'
import Container from '@/components/Container'

const NotFoundPage = () => (
  <Container
    as="section"
    className="flex min-h-[60dvh] flex-col items-center justify-center py-16 text-center"
  >
    <p className="font-heading text-6xl font-semibold text-gold sm:text-7xl">404</p>
    <h1 className="mt-4 text-2xl sm:text-3xl">Page not found</h1>
    <p className="mt-3 max-w-md text-ink/70">
      The page you are looking for doesn’t exist or has been moved.
    </p>
    <Button to="/" className="mt-8">
      Back to home
    </Button>
  </Container>
)

export default NotFoundPage
