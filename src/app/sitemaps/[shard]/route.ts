import { getLandingPagesPaginated } from '@/lib/prismic'

interface SitemapParams {
  params: {
    shard: string
  }
}

export async function generateStaticParams() {
  return [
    { shard: 'sitemap-1.xml' },
  ]
}

export async function GET(request: Request, { params }: SitemapParams) {
  try {
    const { shard } = params
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'
    
    const shardMatch = shard.match(/sitemap-(\d+)\.xml/)
    const shardNumber = shardMatch ? parseInt(shardMatch[1], 10) : 1
    
    
    let slugs: string[] = []
    
    if (shardNumber === 1) {

      slugs = [
        'ai-workflow-templates',
        'productivity-automation', 
        'data-management-tools'
      ]
      
    }
    
    const sitemapXml = generateSitemapXml(slugs, baseUrl)
    
    return new Response(sitemapXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    })
  } catch (error) {
    console.error('Error generating sitemap shard:', error)
    return new Response('Error generating sitemap shard', { status: 500 })
  }
}

function generateSitemapXml(slugs: string[], baseUrl: string): string {
  const urls = slugs.map(slug => {
    return `  <url>
    <loc>${baseUrl}/${slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  }).join('\n')
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
}
