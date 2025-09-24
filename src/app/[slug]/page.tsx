import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLandingPageBySlug, getAllLandingPageSlugs } from '@/lib/prismic'
import DynamicLandingPage from '@/components/dynamic-landing-page'

interface PageProps {
  params: {
    slug: string
  }
}

// Enable ISR with revalidation
export const revalidate = 300 // Revalidate every 5 minutes

// Generate static params for initial build (only a few)
export async function generateStaticParams() {
  try {
    // Only pre-generate a few key pages at build time
    return [
      { slug: 'ai-workflow-templates' },
      { slug: 'productivity-automation' },
      { slug: 'data-management-tools' }
    ]
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Generate metadata dynamically
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params
  
  const page = await getLandingPageBySlug(slug)
  
  if (!page) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    }
  }

  return {
    title: page.data.title || 'Landing Page',
    description: page.data.hero_subtitle 
      ? (typeof page.data.hero_subtitle === 'string' 
          ? page.data.hero_subtitle 
          : page.data.hero_subtitle[0]?.text || 'Professional landing page')
      : 'Professional landing page',
    openGraph: {
      title: page.data.title || 'Landing Page',
      description: page.data.hero_subtitle 
        ? (typeof page.data.hero_subtitle === 'string' 
            ? page.data.hero_subtitle 
            : page.data.hero_subtitle[0]?.text || 'Professional landing page')
        : 'Professional landing page',
      images: page.data.hero_image ? [page.data.hero_image.url] : [],
    },
  }
}

export default async function LandingPage({ params }: PageProps) {
  const { slug } = params
  
  
  const page = await getLandingPageBySlug(slug)
  
  if (!page) {
    notFound()
  }

  return <DynamicLandingPage data={page.data} />
}