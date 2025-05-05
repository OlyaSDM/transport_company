import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Head from "next/head";
import "./globals.scss";
import AboutUs from "@/components/About";
import ServicesBlock from "@/components/Services";
import AdvantagesSection from "@/components/AdvantagesSection";
import Footer from "@/components/Footer";


export default function HomePage() {
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap"
        />
      </Head>
      <Header />
      <HeroSection />
      <AboutUs />
<ServicesBlock />
<AdvantagesSection/>
{/* <Email /> */}
<Footer />

    </div>
  );
}
