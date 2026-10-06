import { useState } from 'react'
import logo from '@/assets/logo/logo.webp'
import Button from '@/components/Button'
import CategoryCard from '@/components/CategoryCard'
import EmptyState from '@/components/EmptyState'
import ErrorMessage from '@/components/ErrorMessage'
import FormField from '@/components/FormField'
import Loader from '@/components/Loader'
import Modal from '@/components/Modal'
import ProductCard from '@/components/ProductCard'
import Section from '@/components/Section'
import SectionHeading from '@/components/SectionHeading'

// Temporary dev-only page for eyeballing shared components (PLAN.md Phase 1).
// Registered only in development. Remove in M9.5.

const sampleCategories = [
  { name: 'Tea', slug: 'tea', image: logo },
  { name: 'Hing', slug: 'hing' },
  { name: 'Spice Powders', slug: 'spice-powders' },
  { name: 'Dehydrated Powders', slug: 'dehydrated-powders' },
]

const sampleProducts = [
  {
    name: 'Premium Dehydrated Onion Powder',
    slug: 'premium-dehydrated-onion-powder',
    category: { name: 'Dehydrated Powders' },
    images: [logo],
    variants: [
      { weight: '200g', price: 240, stock: 10 },
      { weight: '1kg', price: 1200, stock: 4 },
    ],
  },
  {
    name: 'Premium Amchur Powder',
    slug: 'premium-amchur-powder',
    category: { name: 'Spice Powders' },
    images: [],
    variants: [
      { weight: '50g', price: 60, stock: 10 },
      { weight: '100g', price: 110, stock: 10 },
      { weight: '250g', price: 250, stock: 10 },
      { weight: '500g', price: 480, stock: 0 },
      { weight: '1kg', price: 900, stock: 10 },
    ],
  },
  {
    name: 'Chai Patti',
    slug: 'chai-patti',
    images: [],
    variants: [{ weight: '250g', price: 150, stock: 10 }],
  },
]

const ComponentShowcase = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Section>
        <SectionHeading
          as="h1"
          title="Shared Components"
          subtitle="Development preview of the GIROSONE shared UI layer."
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <Button size="sm">Primary sm</Button>
          <Button>Primary md</Button>
          <Button size="lg">Primary lg</Button>
          <Button variant="secondary">Secondary</Button>
          <Button to="/">Router link</Button>
          <Button disabled>Disabled</Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
        </div>
        <Button fullWidth className="mt-4 sm:hidden">
          Full width on mobile
        </Button>
      </Section>

      <Section tone="alt">
        <SectionHeading title="Shop by Category" subtitle="CategoryCard, with and without an image." />
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4 lg:gap-8">
          {sampleCategories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading title="Featured Products" align="left" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {sampleProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Section>

      <Section tone="alt">
        <SectionHeading title="Form Fields" />
        <form
          noValidate
          onSubmit={(event) => event.preventDefault()}
          className="mx-auto grid max-w-2xl gap-6 md:grid-cols-2"
        >
          <FormField label="Name" name="name" autoComplete="name" required />
          <FormField
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            hint="10-digit mobile number."
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            defaultValue="not-an-email"
            error="Enter a valid email address."
          />
          <FormField as="select" label="Product of interest" name="product" defaultValue="">
            <option value="" disabled>
              Select a product
            </option>
            {sampleProducts.map((product) => (
              <option key={product.slug} value={product.slug}>
                {product.name}
              </option>
            ))}
          </FormField>
          <FormField as="textarea" label="Message" name="message" className="md:col-span-2" />
          <FormField label="Disabled" name="disabled" disabled className="md:col-span-2" />
          <Button type="submit" fullWidth className="md:col-span-2">
            Submit
          </Button>
        </form>
      </Section>

      <Section>
        <SectionHeading title="States" divider={false} />
        <div className="grid gap-8 md:grid-cols-3">
          <Loader showLabel />
          <EmptyState title="No products yet" description="Products in this category will appear here.">
            <Button variant="secondary" size="sm" to="/">
              Back to home
            </Button>
          </EmptyState>
          <ErrorMessage message="We could not load this section." onRetry={() => {}} />
        </div>

        <div className="mt-12 text-center">
          <Button onClick={() => setModalOpen(true)}>Open modal</Button>
        </div>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Delete product?"
          footer={
            <>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setModalOpen(false)}>Confirm</Button>
            </>
          }
        >
          <p className="text-ink/70">This is the shared Modal. Esc, the close button and a backdrop click all close it.</p>
        </Modal>
      </Section>
    </>
  )
}

export default ComponentShowcase
