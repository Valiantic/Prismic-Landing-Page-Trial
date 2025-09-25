'use client';
import React from "react";
import Image from "next/image";
import { LandingPageData } from '@/lib/prismic';

interface DynamicBrandProps {
  data: LandingPageData;
}

// Default brand images for fallback
const defaultBrands = [
  { logo: { src: "/assets/img/inner-brand/brand-1.jpg" }, name: "Brand 1" },
  { logo: { src: "/assets/img/inner-brand/brand-2.jpg" }, name: "Brand 2" },
  { logo: { src: "/assets/img/inner-brand/brand-3.jpg" }, name: "Brand 3" },
  { logo: { src: "/assets/img/inner-brand/brand-4.jpg" }, name: "Brand 4" },
  { logo: { src: "/assets/img/inner-brand/brand-5.jpg" }, name: "Brand 5" },
];

export default function DynamicBrand({ data }: DynamicBrandProps) {
  const brandImages = data.brand_images && data.brand_images.length > 0 
    ? data.brand_images 
    : defaultBrands.map((brand) => ({
        logo: { url: brand.logo.src, alt: brand.name, dimensions: { width: 120, height: 60 } },
        name: brand.name
      }));

  return (
    <div className="tp-brand-area pb-130">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-brand-wrap">
              {brandImages.map((item, i) => (
                <div key={i} className="tp-brand-item">
                  {item.logo ? (
                    <Image 
                      src={item.logo.url} 
                      alt={item.name || item.logo.alt || `Brand ${i + 1}`}
                      width={item.logo.dimensions?.width || 120}
                      height={item.logo.dimensions?.height || 60}
                      style={{ height: 'auto', maxWidth: '120px' }}
                    />
                  ) : (
                    <Image 
                      src={defaultBrands[i % defaultBrands.length].logo.src} 
                      alt={item.name || `Brand ${i + 1}`}
                      width={120}
                      height={60}
                      style={{ height: 'auto', maxWidth: '120px' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}