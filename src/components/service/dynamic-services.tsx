'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LandingPageData, extractTextFromRichText } from '@/lib/prismic';
import { FirstBracket, FirstBracketTwo, RightArrow, SvgBg } from "../svg";
import icon from '@/assets/img/home-03/service/sv-icon-1.png';

interface DynamicServicesProps {
  data: LandingPageData;
}

// Default services for fallback
const defaultServices = [
  {
    title: "AI Image Generation",
    description: "Generate stunning, high-quality images for your social media and webshop content with the power of AI. No design skills required.",
    categories: "AI-Powered,Content Creation,Social Media",
  },
  {
    title: "All-in-one Hub",
    description: "Manage all your content in one place. From idea to publication, our Airtable template streamlines your entire workflow.",
    categories: "Airtable,Workflow,Organization",
  },
  {
    title: "Unlimited Customization",
    description: "Customize the template to your heart's content. Adapt it to your brand, your workflow, and your unique needs. The possibilities are endless.",
    categories: "Customizable,Branding,No-Code",
  },
];

export default function DynamicServices({ data }: DynamicServicesProps) {
  // Use Prismic data or fallback to defaults
  const servicesSubtitle = data.services_subtitle || "Our approach";
  const servicesTitle = data.services_title || "Creative development studio";
  const servicesList = data.services_list && data.services_list.length > 0 
    ? data.services_list 
    : defaultServices;

  return (
    <div className="tp-service-3-area pt-130 pb-130">
      <div className="container">
        <div className="row">
          <div className="col-xl-9">
            <div className="tp-service-3-title-box mb-60 p-relative">
              <div className="tp-service-3-icon">
                <Image src={icon} alt="icon" />
              </div>
              <span className="tp-section-subtitle-2 tp_fade_bottom">
                <span>
                  <FirstBracket />
                </span>
                <span className="tp-subtitle-text tp_text_invert">
                  {servicesSubtitle}
                </span>
                <span>
                  <FirstBracketTwo />
                </span>
              </span>
              <h4 className="tp-section-title-90 tp_text_invert tp_fade_bottom">
                {servicesTitle}
              </h4>
            </div>
          </div>
        </div>

        {servicesList.map((item, index) => {
          const serviceTitle = item.title || defaultServices[index]?.title || "Service Title";
          const serviceDesc = extractTextFromRichText(item.description) || defaultServices[index]?.description || "Service description";
          const categories = item.categories || defaultServices[index]?.categories || "Category";
          const categoryArray = categories.split(',').map(cat => cat.trim());

          return (
            <div key={index} className="tp-service-3-wrap tp_fade_bottom">
              <div className="row align-items-start">
                <div className="col-xl-3 col-lg-3">
                  <div className="tp-service-3-title-box">
                    <h4 className="tp-service-3-title">
                      <Link href="/service">{serviceTitle}</Link>
                    </h4>
                  </div>
                </div>
                <div className="col-xl-7 col-lg-7">
                  <div className="tp-service-3-content">
                    <p>{serviceDesc}</p>
                    <div className="tp-service-3-category">
                      {categoryArray.map((category, i) => (
                        <span key={i}>{category}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-2">
                  <div className="tp-service-3-btn-box text-start text-md-end">
                    <Link
                      className="tp-btn-zikzak-sm p-relative"
                      href="/service"
                    >
                      <span className="zikzak-content">
                        See <br /> Details
                        <RightArrow clr="currentColor" />
                      </span>
                      <span>
                        <SvgBg />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}