import { NextResponse } from 'next/server'

export async function GET() {
  try {
   
    
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    
    const maxPagesPerShard = 50000
    const estimatedTotalPages = 200000 
    const numberOfShards = Math.ceil(estimatedTotalPages / maxPagesPerShard)
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

    // Generate sitemap index pointing to sharded sitemaps
    for (let i = 1; i <= numberOfShards; i++) {
      sitemap += `  <sitemap>
    <loc>${baseUrl}/sitemaps/sitemap-${i}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
`
    }
    
    sitemap += `</sitemapindex>`

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap index:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}