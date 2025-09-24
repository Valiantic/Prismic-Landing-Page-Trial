'use client';
import React from "react";
import { ArrowBg, RightArrowTwo } from "../svg";
import Link from "next/link";
import Image from "next/image";
import { LandingPageData, extractTextFromRichText } from "@/lib/prismic";

interface DynamicHeroBannerProps {
  data: LandingPageData;
}

export default function DynamicHeroBanner({ data }: DynamicHeroBannerProps) {
  const heroSubtitle = data.hero_subtitle 
    ? extractTextFromRichText(data.hero_subtitle)
    : "Beautiful AI Images for Social Media & Webshops";

  return (
    <div className="tp-hero-3-area tp-hero-3-ptb fix">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-hero-3-content-box text-center p-relative">
              <div className="tp-hero-3-circle-shape">
                <span></span>
              </div>
              
              {/* Dynamic Hero Image */}
              {data.hero_image && (
                <div className="tp-hero-3-image mb-4">
                  <Image
                    src={data.hero_image.url}
                    alt={data.hero_image.alt || data.title || "Hero Image"}
                    width={data.hero_image.dimensions?.width || 800}
                    height={data.hero_image.dimensions?.height || 600}
                    className="img-fluid"
                    priority
                  />
                </div>
              )}
              
              <h4 className="tp-hero-3-title tp_reveal_anim">
                <span className="tp-reveal-line">
                  {data.hero_title || "Transform Your Workflow"}
                </span>
                <span className="tp-reveal-line">
                  {data.hero_title ? "" : "with AI-Powered Airtable Templates"}
                </span>
              </h4>
              
              <span className="tp-hero-3-category tp_reveal_anim">
                {heroSubtitle}
              </span>
              
              <Link 
                className="tp-btn-black-2" 
                href={data.cta_link || "/contact"}
              >
                {data.cta_text || "Get Your Template"}{" "}
                <span className="p-relative">
                  <RightArrowTwo />
                  <ArrowBg />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}