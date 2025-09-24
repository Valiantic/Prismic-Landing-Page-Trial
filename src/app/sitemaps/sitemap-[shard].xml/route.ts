import { NextRequest, NextResponse } from 'next/server'
import { getLandingPagesPaginated } from '@/lib/prismic'

interface Params {
  params: {
    shard: string
  }
}

export async function GET(request: NextRequest, { params }: Params) {
  const shard = parseInt(params.shard)
  
  if (isNaN(shard) || shard < 1) {
    return new NextResponse('Invalid shard number', { status: 400 })
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const maxPagesPerShard = 50000
  
  try {
    const { slugs } = await getLandingPagesPaginated(shard, maxPagesPerShard)
    
    const testSlugs = ['ai-workflow-templates', 'productivity-automation', 'data-management-tools']
    const finalSlugs = slugs.length > 0 ? slugs : (shard === 1 ? testSlugs : [])
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

    finalSlugs.forEach(slug => {
      sitemap += `  <url>
    <loc>${baseUrl}/${slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
`
    })
    
    sitemap += `</urlset>`

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    })
    
  } catch (error) {
    console.error('Error generating sitemap shard:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}