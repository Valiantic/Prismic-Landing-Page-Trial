import { createClient } from '../../prismicio'
import { PrismicDocument } from '@prismicio/client'

// Shared image interface
export interface PrismicImage {
  url: string
  alt: string | null
  dimensions?: {
    width: number
    height: number
  }
}

// Complete landing page data interface
export interface LandingPageData {
  // Page Meta
  title?: string
  
  // Hero Section
  hero_title?: string
  hero_subtitle?: any
  hero_image?: PrismicImage
  cta_text?: string
  cta_link?: string
  
  // Gallery Section
  gallery_title?: string
  gallery_subtitle?: string
  gallery_images?: Array<{
    image?: PrismicImage
    alt_text?: string
  }>
  
  // About Section
  about_subtitle?: string
  about_title?: string
  about_description_1?: any
  about_description_2?: any
  about_image?: PrismicImage
  about_cta_text?: string
  about_cta_link?: string
  
  // Services Section
  services_subtitle?: string
  services_title?: string
  services_list?: Array<{
    title?: string
    description?: any
    categories?: string
    icon?: PrismicImage
  }>
  
  // Brand Section
  brand_images?: Array<{
    logo?: PrismicImage
    name?: string
  }>
  
  // Contact Section
  contact_title?: string
  contact_description?: any
  contact_email?: string
  contact_phone?: string
  
  // Projects Section
  projects_title?: string
  projects_subtitle?: string
  projects_cta_text?: string
  projects_cta_link?: string
  projects?: Array<{
    id?: number
    image_1?: PrismicImage
    image_2?: PrismicImage
    meta?: string
    title?: string
    link?: string
  }>
}

export interface LandingPageDocument extends PrismicDocument {
  data: LandingPageData
}


export async function getLandingPageBySlug(slug: string): Promise<LandingPageDocument | null> {
  try {
    const client = createClient()
    
    const document = await client.getByUID('landing_pages', slug)
    
    return document as LandingPageDocument
  } catch (error) {
    console.error(`Error fetching landing page with slug "${slug}":`, error)
    return null
  }
}


export async function getAllLandingPageSlugs(): Promise<string[]> {
  try {
    const client = createClient()
    
    const documents = await client.getAllByType('landing_pages')
    
    return documents.map(doc => doc.uid).filter((uid): uid is string => Boolean(uid))
  } catch (error) {
    console.error('Error fetching all landing page slugs:', error)
    return []
  }
}


export async function getLandingPagesPaginated(page: number = 1, pageSize: number = 50000): Promise<{
  slugs: string[]
  hasMore: boolean
  total: number
}> {
  try {
    const client = createClient()
    
    const response = await client.getByType('landing_pages', {
      page,
      pageSize,
    })
    
    const slugs = response.results
      .map(doc => doc.uid)
      .filter((uid): uid is string => Boolean(uid))
    
    return {
      slugs,
      hasMore: response.page < response.total_pages,
      total: response.total_results_size || 0,
    }
  } catch (error) {
    console.error('Error fetching paginated landing pages:', error)
    return {
      slugs: [],
      hasMore: false,
      total: 0,
    }
  }
}


export function extractTextFromRichText(richText: any): string {
  if (!richText || !Array.isArray(richText)) {
    return ''
  }
  
  return richText
    .map((block: any) => block.text || '')
    .join(' ')
    .trim()
}