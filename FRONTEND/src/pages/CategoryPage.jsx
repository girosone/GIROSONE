import { useParams } from 'react-router'
import Section from '@/components/Section'
import SectionHeading from '@/components/SectionHeading'
import { categories } from '@/data/navigation'
import NotFoundPage from '@/pages/NotFoundPage'

// Stub until Phase 4. `categoryName` is the URL name, e.g. `dehydrated-powders`.
const CategoryPage = () => {
  const { categoryName } = useParams()
  const category = categories.find((item) => item.id === categoryName)

  if (!category) return <NotFoundPage />

  return (
    <Section>
      <SectionHeading
        as="h1"
        title={category.title}
        subtitle="Products in this category will be listed here soon."
      />
    </Section>
  )
}

export default CategoryPage
