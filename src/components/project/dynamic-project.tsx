'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LandingPageData } from '@/lib/prismic';
import { ProjectShape, RightArrow } from "../svg";

// Default project images for fallback
import port_1 from "@/assets/img/home-03/portfolio/port-1.jpg";
import port_2 from "@/assets/img/home-03/portfolio/port-2.jpg";
import port_3 from "@/assets/img/home-03/portfolio/port-3.jpg";
import port_4 from "@/assets/img/home-03/portfolio/port-4.jpg";
import port_5 from "@/assets/img/home-03/portfolio/port-5.jpg";
import port_6 from "@/assets/img/home-03/portfolio/port-6.jpg";
import port_7 from "@/assets/img/home-03/portfolio/port-7.jpg";
import port_8 from "@/assets/img/home-03/portfolio/port-8.jpg";

interface DynamicProjectProps {
  data: LandingPageData;
  style_2?: boolean;
}

const defaultProjects = [
  {
    id: 1,
    img_1: port_1,
    img_2: port_2,
    meta: "DEC 2024 . Creative",
    title: "Pellente dapibus",
    link: "/portfolio-details-1"
  },
  {
    id: 2,
    img_1: port_3,
    img_2: port_4,
    meta: "NOV 2024 . Creative", 
    title: "Chania tourism",
    link: "/portfolio-details-1"
  },
  {
    id: 3,
    img_1: port_5,
    img_2: port_6,
    meta: "OCT 2024 . Creative",
    title: "Fashion sentence",
    link: "/portfolio-details-1"
  },
  {
    id: 4,
    img_1: port_7,
    img_2: port_8,
    meta: "SEP 2024 . Creative",
    title: "Fashion sentence",
    link: "/portfolio-details-1"
  },
];

export default function DynamicProject({ data, style_2 = false }: DynamicProjectProps) {
  // Use Prismic data or fallback to defaults
  const projectsTitle = data.projects_title || "Latest Projects";
  const projectsSubtitle = data.projects_subtitle || "";
  const projectsCTAText = data.projects_cta_text || "See All Project";
  const projectsCTALink = data.projects_cta_link || "/portfolio-wrapper";
  
  const projects = data.projects && data.projects.length > 0 
    ? data.projects 
    : defaultProjects.map((project) => ({
        id: project.id,
        image_1: { url: project.img_1.src, alt: `${project.title} image 1`, dimensions: { width: 400, height: 300 } },
        image_2: { url: project.img_2.src, alt: `${project.title} image 2`, dimensions: { width: 400, height: 300 } },
        meta: project.meta,
        title: project.title,
        link: project.link
      }));

  return (
    <div className={`tp-project-3-area ${style_2 ? "pt-60 pw-project-style" : "pt-130 black-bg"}`}>
      <div className="container container-1720">
        {!style_2 && (
          <div className="row justify-content-center">
            <div className="col-xl-7">
              <div className="tp-project-3-title-box p-relative mb-150">
                {projectsSubtitle && (
                  <span className="tp-section-subtitle tp_reveal_anim">
                    {projectsSubtitle}
                  </span>
                )}
                <h4 className="tp-section-title-200 tp_reveal_anim">
                  {projectsTitle.includes(' ') ? (
                    <>
                      {projectsTitle.split(' ').slice(0, -1).join(' ')}{' '}
                      <span>{projectsTitle.split(' ').slice(-1)[0]}</span>
                    </>
                  ) : (
                    projectsTitle
                  )}
                </h4>
                <div className="tp-project-3-btn-box">
                  <Link
                    className="tp-btn-zikzak p-relative"
                    href={projectsCTALink}
                  >
                    <span className="zikzak-content">
                      {projectsCTAText.split(' ').map((word: string, i: number, arr: string[]) => (
                        <React.Fragment key={i}>
                          {word}
                          {i < arr.length - 1 && i === Math.floor(arr.length / 2) - 1 ? <br /> : ' '}
                        </React.Fragment>
                      ))}
                      <RightArrow clr="#19191A" />
                    </span>
                    <ProjectShape />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-xl-12">
            {projects.map((item: any, i: number) => (
              <div key={item.id || i} className="tp-project-3-wrap">
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-6">
                    <div className="tp-project-3-thumb pro-img-1">
                      {item.image_1 ? (
                        <Image
                          src={item.image_1.url}
                          alt={item.image_1.alt || `${item.title} image 1`}
                          width={item.image_1.dimensions?.width || 400}
                          height={item.image_1.dimensions?.height || 300}
                          style={{ height: "auto" }}
                        />
                      ) : (
                        <Image
                          src={defaultProjects[i % defaultProjects.length].img_1}
                          alt={`${item.title} image 1`}
                          style={{ height: "auto" }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-12 order-1 order-lg-0">
                    <div className="tp-project-3-content text-center">
                      <span className="tp-project-3-meta">{item.meta}</span>
                      <h4 className="tp-project-3-title-sm">
                        <Link href={item.link || "/portfolio-details-1"}>
                          {item.title}
                        </Link>
                      </h4>
                      <Link
                        className="tp-btn-project-sm"
                        href={item.link || "/portfolio-details-1"}
                      >
                        See Project
                      </Link>
                    </div>
                    <div className="tp-project-3-border color-1 text-center">
                      <span></span>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-6 order-0 order-lg-0">
                    <div className="tp-project-3-thumb pro-img-2">
                      {item.image_2 ? (
                        <Image
                          src={item.image_2.url}
                          alt={item.image_2.alt || `${item.title} image 2`}
                          width={item.image_2.dimensions?.width || 400}
                          height={item.image_2.dimensions?.height || 300}
                          style={{ height: "auto" }}
                        />
                      ) : (
                        <Image
                          src={defaultProjects[i % defaultProjects.length].img_2}
                          alt={`${item.title} image 2`}
                          style={{ height: "auto" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}