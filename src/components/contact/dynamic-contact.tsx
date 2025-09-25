'use client';
import React from "react";
import { LandingPageData, extractTextFromRichText } from '@/lib/prismic';

interface DynamicContactProps {
  data: LandingPageData;
}

export default function DynamicContact({ data }: DynamicContactProps) {
  const contactTitle = data.contact_title || "Get in Touch";
  const contactDescription = extractTextFromRichText(data.contact_description) || 
    "Ready to transform your content creation process? Let's talk about how our AI-powered solutions can help your business.";
  const contactEmail = data.contact_email || "hello@example.com";
  const contactPhone = data.contact_phone || "+1 (555) 123-4567";

  return (
    <div className="tp-contact-area pb-130">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8">
            <div className="tp-contact-title-box">
              <h4 className="tp-section-title-90 tp_text_invert tp_fade_bottom">
                {contactTitle}
              </h4>
              <p className="tp_fade_bottom mb-40">
                {contactDescription}
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-6 col-lg-6">
            <div className="tp-contact-info">
              <div className="tp-contact-info-item tp_fade_bottom">
                <h5>Email</h5>
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="tp-contact-info">
              <div className="tp-contact-info-item tp_fade_bottom">
                <h5>Phone</h5>
                <a href={`tel:${contactPhone.replace(/\s/g, '')}`}>{contactPhone}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}