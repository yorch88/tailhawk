import { useEffect, useState } from "react";
import PageMeta from "@/components/PageMeta";
import About from "./components/About";
import Contact from "./components/Contact";
import Feature from "./components/Feature";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

import { getLanding, type LandingData } from "./api";

const Index = () => {
  const [landing, setLanding] = useState<LandingData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLanding = async () => {
      try {
        const data = await getLanding();
        setLanding(data);
      } catch (err) {
        console.error("Error cargando landing:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLanding();
  }, []);

  if (loading) return null;
  if (!landing) return null;

  return (
    <>
      <PageMeta title="Borderlink" />
      <Navbar />
      <Hero data={landing} />
      <Feature data={landing} />
      <About data={landing} />
      <Contact data={landing} />
      <Footer data={landing} />
    </>
  );
};

export default Index;
