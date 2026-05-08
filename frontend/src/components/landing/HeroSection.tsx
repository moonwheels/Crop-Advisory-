import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-farm.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      
      {/* ✅ ML FLOATING BUTTON (VISIBLE) */}
      <div className="fixed top-20 right-6 z-[9999]">
        <a
          href="https://9tpfmgtcdpkfn75rbckdrw.streamlit.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg">
             Crop Predictor
          </button>
        </a>
      </div>

      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Smart farming" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
      </div>

      <div className="container relative z-10 py-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm border border-primary/30 mb-6">
              🌱 AI-Powered Agriculture Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-primary-foreground mb-6"
          >
            Grow Smarter with{" "}
            <span className="text-secondary">AgriVision AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed"
          >
            Transform your farming with real-time crop monitoring, AI-driven insights,
            weather intelligence, and predictive analytics. From seed to harvest, we've got you covered.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-base px-8 shadow-glow">
              <Link to="/signup">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary/50 text-foreground hover:bg-primary/10 gap-2 text-base px-8">
              <Link to="/login">
                <Play className="h-4 w-4" /> Watch Demo
              </Link>
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;