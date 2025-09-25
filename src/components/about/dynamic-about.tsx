'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LandingPageData, extractTextFromRichText } from '@/lib/prismic';
import shape from '@/assets/img/home-03/about/ab-shape-img.png';
import { ArrowBg, RightArrowTwo, FirstBracket, FirstBracketTwo } from "../svg";

interface DynamicAboutProps {
  data: LandingPageData;
}

export default function DynamicAbout({ data }: DynamicAboutProps) {
  const aboutSubtitle = data.about_subtitle || "About The Template";
  const aboutTitle = data.about_title || "All-in-one hub for your social media and webshop content.";
  const aboutDesc1 = extractTextFromRichText(data.about_description_1) || 
    "Streamline your content creation process with our AI-powered Airtable template. Generate stunning images for your social media posts and webshop products in seconds.";
  const aboutDesc2 = extractTextFromRichText(data.about_description_2) || 
    "Unlimited customization options to perfectly match your brand. Say goodbye to content creation bottlenecks and hello to a world of creative possibilities.";
  const ctaText = data.about_cta_text || "Learn More";
  const ctaLink = data.about_cta_link || "/about-us";

  return (
    <div className="tp-about-3-area pt-120 pb-110">
      <div className="container">
        <div className="row">
          <div className="col-xl-11">
            <div className="tp-about-3-title-box">
              <span className="tp-section-subtitle-2 tp_fade_bottom">
                <span>
                  <FirstBracket />
                </span>
                <span className="tp-subtitle-text tp_text_invert">
                  {aboutSubtitle}
                </span>
                <span>
                  <FirstBracketTwo />
                </span>
              </span>
              <h4 className="tp-section-title-90 tp_text_invert tp_fade_bottom">
                {aboutTitle}
              </h4>
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-4">
            <div className="tp-about-3-shape text-lg-end">
              {data.about_image ? (
                <Image 
                  src={data.about_image.url} 
                  alt={data.about_image.alt || "About us"}
                  width={data.about_image.dimensions?.width || 400}
                  height={data.about_image.dimensions?.height || 300}
                  style={{ height: "auto" }} 
                />
              ) : (
                <Image src={shape} alt="shape" style={{ height: "auto" }} />
              )}
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-8">
            <div className="tp-about-3-content">
              <p className="mb-30 tp_fade_bottom">
                {aboutDesc1}
              </p>
              <p className="mb-45 tp_fade_bottom">
                {aboutDesc2}
              </p>
              <Link className="tp-btn-black-2 tp_fade_bottom" href={ctaLink}>
                {ctaText}
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