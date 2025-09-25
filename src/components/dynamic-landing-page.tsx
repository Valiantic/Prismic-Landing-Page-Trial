"use client";
import { gsap } from "gsap";
import React, { useEffect } from "react";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

// internal imports
import Wrapper from "@/layouts/wrapper";
import HeaderFive from "@/layouts/headers/header-five";
import DynamicHeroBanner from "@/components/hero-banner/dynamic-hero-banner";
import DynamicGallery from "@/components/gallery/dynamic-gallery";
import DynamicAbout from "@/components/about/dynamic-about";
import DynamicBrand from "@/components/brand/dynamic-brand";
import DynamicServices from "@/components/service/dynamic-services";
import DynamicContact from "@/components/contact/dynamic-contact";
import DynamicProject from "@/components/project/dynamic-project";
import CounterOne from "@/components/counter/counter-one";
import VideoTwo from "@/components/video/video-two";
import FooterFive from "@/layouts/footers/footer-five";
import { textInvert } from "@/utils/text-invert";
import { fadeAnimation, revelAnimationOne } from "@/utils/title-animation";
import { projectThreeAnimation } from "@/utils/project-anim";
import { ctaAnimation } from "@/utils/cta-anim";
import { LandingPageData } from "@/lib/prismic";

interface DynamicLandingPageProps {
  data: LandingPageData;
}

const DynamicLandingPage = ({ data }: DynamicLandingPageProps) => {
  useScrollSmooth();
  
  useEffect(() => {
    document.body.classList.add("tp-smooth-scroll");
    return () => {
      document.body.classList.remove("tp-smooth-scroll");
    };
  }, []);

  useGSAP(() => {
    const timer = setTimeout(() => {
      fadeAnimation();
      revelAnimationOne();
      projectThreeAnimation();
      ctaAnimation();
      textInvert();
    }, 100);
    return () => clearTimeout(timer);
  });

  return (
    <Wrapper>
      {/* header area start */}
      <HeaderFive />
      {/* header area end */}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {/* dynamic hero area start */}
            <DynamicHeroBanner data={data} />
            {/* dynamic hero area end */}

            {/* dynamic gallery area start */}
            <DynamicGallery data={data} />
            {/* dynamic gallery area end */}

            {/* dynamic about area start */}
            <DynamicAbout data={data} />
            {/* dynamic about area end */}

            {/* dynamic brand area start */}
            <DynamicBrand data={data} />
            {/* dynamic brand area end */}

            {/* dynamic project area start */}
            <DynamicProject data={data} />
            {/* dynamic project area end */}

            {/* counter area start */}
            <CounterOne />
            {/* counter area end */}

            {/* video area start */}
            <VideoTwo />
            {/* video area end */}

            {/* dynamic service area start */}
            <DynamicServices data={data} />
            {/* dynamic service area end */}

            {/* dynamic contact area start */}
            <DynamicContact data={data} />
            {/* dynamic contact area end */}
          </main>

          {/* footer area */}
          <FooterFive />
          {/* footer area */}
        </div>
      </div>
    </Wrapper>
  );
};

export default DynamicLandingPage;