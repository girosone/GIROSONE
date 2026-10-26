import { useParams } from 'react-router'
import Section from '@/components/Section'
import SectionHeading from '@/components/SectionHeading'
import { categories } from '@/data/navigation'
import NotFoundPage from '@/pages/NotFoundPage'

const products = categories.flatMap((category) => category.items)

// Stub until Phase 4. `productName` is the URL name, e.g. `premium-amchur-powder`.
const ProductPage = () => {
  const { productName } = useParams()
  const product = products.find((item) => item.id === productName)

  if (!product) return <NotFoundPage />

  return (
    <Section>
      <SectionHeading
        as="h1"
        title={product.label}
        subtitle="Product details will be available here soon."
      />
    </Section>
  )
}

export default ProductPage
