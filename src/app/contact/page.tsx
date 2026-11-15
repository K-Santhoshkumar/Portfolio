import React from "react";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getProfile } from "@/lib/portfolioService";

export const revalidate = 60;

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 flex-1">
        <ContactSection
          email={profile.email}
          phone={profile.phone}
          location={profile.location}
          githubUrl={profile.githubUrl}
          linkedinUrl={profile.linkedinUrl}
        />
      </div>
      <Footer />
    </div>
  );
}
