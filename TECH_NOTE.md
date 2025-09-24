# Programmatic Landing Page System - Technical Documentation

## Project Overview
A scalable Next.js 14 application with App Router that renders dynamic landing pages from Prismic CMS, architected to handle 100-200k pages with optimal performance.

## Data Model

### Prismic Content Type: `landing_pages`
```typescript
interface LandingPageData {
  title: string              // Key Text field
  hero_title: string         // Key Text field  
  hero_subtitle: RichText    // Rich Text field (single line)
  hero_image: {              // Image field
    url: string
    alt: string | null
    dimensions: {
      width: number
      height: number
    }
  }
  cta_text: string          // Key Text field
  cta_link: string          // Key Text field
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

