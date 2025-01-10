import AboutSectionOne from "@/components/HomeComponents/About/AboutSectionOne";
import ScrollUp from "@/components/HomeComponents/Common/ScrollUp";
import Hero from "@/components/HomeComponents/Hero";
import Header from "@/components/HomeComponents/Header";
import Services from "@/components/HomeComponents/Services/Services";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Home",
  description: "This is Home for Startup Nextjs Template",
  // other metadata
};

export default function Home() {
  return (
    <>
            <Header  />
            <ScrollUp  />
            <Hero />
            <AboutSectionOne />
            <Services />
    </>
  );
}
