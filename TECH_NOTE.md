# Programmatic Landing Page System - Technical Documentation

## Project Overview
A scalable Next.js 14 application with App Router that renders dynamic landing pages from Prismic CMS, architected to handle 100-200k pages with optimal performance.

## Data Model

### Prismic Content Type: `landing_pages`
```typescript
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

```

### Field Configuration in Prismic
- **API ID**: `landing_pages`
- **Type**: Repeatable Type (allows multiple documents)
- **Fields**:
  - `title` → Key Text
  - `hero_title` → Key Text  
  - `hero_subtitle` → Rich Text (single line)
  - `hero_image` → Image
  - `cta_text` → Key Text
  - `cta_link` → Key Text

  #### **Gallery Section Fields**
```
Gallery Title (Key Text)
├─ API ID: gallery_title
├─ Placeholder: "Our Work Gallery"

Gallery Subtitle (Key Text)  
├─ API ID: gallery_subtitle
├─ Placeholder: "Showcase of our best projects"

Gallery Images (Group - Repeatable)
├─ API ID: gallery_images
├─ Fields inside group:
   ├─ Image (Image Field)
   │  └─ API ID: image
   └─ Alt Text (Key Text)
      └─ API ID: alt_text
```

#### **About Section Fields**
```
About Subtitle (Key Text)
├─ API ID: about_subtitle  
├─ Placeholder: "About The Template"

About Title (Key Text)
├─ API ID: about_title
├─ Placeholder: "All-in-one hub for your content"

About Description 1 (Rich Text - Single line)
├─ API ID: about_description_1
├─ Placeholder: "First paragraph description..."

About Description 2 (Rich Text - Single line)  
├─ API ID: about_description_2
├─ Placeholder: "Second paragraph description..."

About Image (Image)
├─ API ID: about_image
└─ For custom about section image

About CTA Text (Key Text)
├─ API ID: about_cta_text
├─ Placeholder: "Learn More"

About CTA Link (Key Text)
├─ API ID: about_cta_link
├─ Placeholder: "/about"
```

#### **Services Section Fields**
```
Services Subtitle (Key Text)
├─ API ID: services_subtitle
├─ Placeholder: "Our Approach"

Services Title (Key Text)  
├─ API ID: services_title
├─ Placeholder: "Creative development studio"

Services List (Group - Repeatable)
├─ API ID: services_list
├─ Fields inside group:
   ├─ Title (Key Text)
   │  └─ API ID: title
   ├─ Description (Rich Text - Single line)
   │  └─ API ID: description  
   ├─ Categories (Key Text)
   │  └─ API ID: categories (comma-separated)
   └─ Icon (Image)
      └─ API ID: icon
```

#### **Brand Section Fields**
```
Brand Images (Group - Repeatable)
├─ API ID: brand_images
├─ Fields inside group:
   ├─ Logo (Image)
   │  └─ API ID: logo
   └─ Name (Key Text)
      └─ API ID: name
```

#### **Projects Section Fields**
```
Projects Title (Key Text)
├─ API ID: projects_title
├─ Placeholder: "Latest Projects"

Projects Subtitle (Key Text)
├─ API ID: projects_subtitle
├─ Placeholder: "Our Recent Work"

Projects CTA Text (Key Text)
├─ API ID: projects_cta_text
├─ Placeholder: "See All Project"

Projects CTA Link (Key Text)
├─ API ID: projects_cta_link
├─ Placeholder: "/portfolio-wrapper"

Projects (Group - Repeatable)
├─ API ID: projects
├─ Fields inside group:
   ├─ Image 1 (Image)
   │  └─ API ID: image_1
   ├─ Image 2 (Image)
   │  └─ API ID: image_2
   ├─ Meta (Key Text)
   │  └─ API ID: meta (e.g., "DEC 2024 . Creative")
   ├─ Title (Key Text)
   │  └─ API ID: title
   └─ Link (Key Text)
      └─ API ID: link
```

#### **Contact Section Fields**
```
Contact Title (Key Text)
├─ API ID: contact_title
├─ Placeholder: "Get in Touch"

Contact Description (Rich Text - Single line)
├─ API ID: contact_description
├─ Placeholder: "Ready to start your project?"

Contact Email (Key Text)
├─ API ID: contact_email  
├─ Placeholder: "hello@yourcompany.com"

Contact Phone (Key Text)
├─ API ID: contact_phone
├─ Placeholder: "+1 (555) 123-4567"
```


## Store → Component Mapping

### Data Flow Architecture
```
Prismic CMS → getLandingPageBySlug() → DynamicLandingPage → DynamicHeroBanner
```

### Mapping Implementation
```typescript
// src/lib/prismic.ts - Data Access Layer
export async function getLandingPageBySlug(slug: string): Promise<LandingPageDocument | null>

// src/app/[slug]/page.tsx - Route Handler  
const page = await getLandingPageBySlug(slug)
return <DynamicLandingPage data={page.data} />

// src/components/dynamic-landing-page.tsx - Layout Component
<DynamicHeroBanner data={data} />

// src/components/hero-banner/dynamic-hero-banner.tsx - Content Rendering
const heroSubtitle = extractTextFromRichText(data.hero_subtitle)
```

### Image Handling
- **Source**: Prismic CDN-optimized URLs
- **Next.js Integration**: `next/image` with priority loading
- **Alt Text**: Falls back to `data.title` if `alt` is null
- **Optimization**: Automatic WebP conversion, responsive sizing

## Caching & ISR Strategy

### Next.js ISR Configuration
```typescript
// src/app/[slug]/page.tsx
export const revalidate = 300 // 5 minutes

// Static generation at build time (limited set)
export async function generateStaticParams() {
  return [
    { slug: 'ai-workflow-templates' },
    { slug: 'productivity-automation' }, 
    { slug: 'data-management-tools' }
  ]
}
```

### Caching Layers
1. **Build Time**: Pre-generate 3 key pages
2. **Runtime ISR**: Generate pages on-demand, cache for 5 minutes
3. **Prismic Client**: Built-in API response caching
4. **Vercel Edge**: CDN caching with stale-while-revalidate

### Cache Headers
```typescript
// Sitemap caching
'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
```

## Sitemap System Architecture

### Sharding Strategy for 100-200k Pages

#### Mathematical Foundation
- **Max URLs per sitemap**: 50,000 (Google limit)
- **Calculation**: `Math.ceil(totalPages / 50000)`
- **For 200k pages**: 4 sitemap files needed

#### File Structure
```
/sitemap.xml                 → Sitemap index
/sitemaps/sitemap-1.xml     → URLs 1-50,000
/sitemaps/sitemap-2.xml     → URLs 50,001-100,000  
/sitemaps/sitemap-3.xml     → URLs 100,001-150,000
/sitemaps/sitemap-4.xml     → URLs 150,001-200,000
```

