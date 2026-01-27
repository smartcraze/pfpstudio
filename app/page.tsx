import type { Metadata } from 'next'
import HomePage from '@/components/home-page'

export const metadata: Metadata = {
  title: 'PfpStudio - Free Profile Picture Maker',
  description: 'Create stunning animated profile pictures for Discord, Twitter, and other social platforms. Remove backgrounds automatically and apply professional effects.',
  alternates: {
    canonical: '/',
  },
}

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PfpStudio',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'A free tool to create animated profile pictures with automatic background removal and professional effects.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage />
    </>
  )
}
