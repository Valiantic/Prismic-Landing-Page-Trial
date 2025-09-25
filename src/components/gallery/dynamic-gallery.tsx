'use client';
import React, { CSSProperties } from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { LandingPageData } from '@/lib/prismic';

// fallback images
import shape_1 from '@/assets/img/home-03/gallery/gal-shape-1.png';
import shape_d_1 from '@/assets/img/home-03/gallery/gal-shape-dark-1.png';
import shape_2 from '@/assets/img/home-03/gallery/gal-shape-2.png';
import shape_d_2 from '@/assets/img/home-03/gallery/gal-shape-dark-2.png';
import g_1 from '@/assets/img/home-03/gallery/gal-1.jpg';
import g_2 from '@/assets/img/home-03/gallery/gal-2.jpg';
import g_3 from '@/assets/img/home-03/gallery/gal-3.jpg';

interface DynamicGalleryProps {
  data: LandingPageData;
}

const fallback_images = [g_1, g_2, g_3, g_1, g_2, g_3];
const imgStyle: CSSProperties = { height: "auto" };

export default function DynamicGallery({ data }: DynamicGalleryProps) {
  // Use Prismic data if available, fallback to defaults
  const galleryImages = data.gallery_images && data.gallery_images.length > 0 
    ? data.gallery_images 
    : fallback_images.map((img, index) => ({
        image: { url: img.src, alt: `Gallery image ${index + 1}`, dimensions: { width: 400, height: 300 } },
        alt_text: `Gallery image ${index + 1}`
      }));

  return (
    <div className="tp-gallery-area fix p-relative">
      <div className="tp-gallery-shape-1">
        <Image className="img-1" src={shape_1} alt="shape" style={imgStyle} />
        <Image className="img-2" src={shape_d_1} alt="shape" style={imgStyle} />
      </div>
      <div className="tp-gallery-shape-2">
        <Image className="img-1" src={shape_2} alt="shape" style={imgStyle} />
        <Image className="img-2" src={shape_d_2} alt="shape" style={imgStyle} />
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-gallery-slider-wrap">
              <div className="swiper-container tp-gallery-slider-active">
                <Marquee className="tp-gallery-titming" speed={100} direction='left'>
                  {galleryImages.map((item, i) => (
                    <div key={i}>
                      <div className="tp-gallery-item mr-30">
                        {item.image ? (
                          <Image 
                            src={item.image.url} 
                            alt={item.alt_text || item.image.alt || `Gallery image ${i + 1}`}
                            width={item.image.dimensions?.width || 400}
                            height={item.image.dimensions?.height || 300}
                            style={{ height: 'auto' }} 
                          />
                        ) : (
                          <Image 
                            src={fallback_images[i % fallback_images.length]} 
                            alt={`Gallery image ${i + 1}`}
                            style={{ height: 'auto' }} 
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}