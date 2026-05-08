import { motion } from "framer-motion";
import { Sprout, CloudSun, BarChart3, Brain, Shield, Smartphone } from "lucide-react";

const features = [
  {
    icon: Sprout,
    title: "Crop Monitoring",
    description: "Track growth stages, health, and performance of your crops in real-time with satellite and sensor data.",
    color: "text-primary",
    bg: "bg-accent",
  },
  {
    icon: CloudSun,
    title: "Weather Intelligence",
    description: "Hyperlocal weather forecasts and historical trends to plan your farming activities precisely.",
    color: "text-info",
    bg: "bg-info/10",
  },
  {
    icon: BarChart3,
    title: "Yield Prediction",
    description: "AI-powered yield forecasting with 98% accuracy to help you plan harvests and market timing.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Brain,
    title: "AI Crop Advisor",
    description: "Get personalized recommendations on what to grow, fertilizers to use, and pest management strategies.",
    color: "text-primary",
    bg: "bg-accent",
  },
  {
    icon: Shield,
    title: "Disease Detection",
    description: "Upload crop images and get instant AI-powered disease diagnosis with treatment recommendations.",
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Access your farm data anywhere, anytime. Fully responsive design optimized for field use.",
    color: "text-muted-foreground",
    bg: "bg-muted",
  },
  {
    icon: Brain,
    title: "Crop Predictor",
    description: "Use our ML prototype to predict the most suitable crop from soil and weather values.",
    color: "text-primary",
    bg: "bg-primary/10",
    link: "https://9tpfmgtcdpkfn75rbckdrw.streamlit.app/",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Features</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4 text-foreground">
            Everything you need to farm smarter
          </h2>
          <p className="text-muted-foreground text-lg">
            Powerful tools and AI insights to optimize every aspect of your agricultural operations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const cardContent = (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative p-6 rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 ${
                  feature.link
                    ? "border-primary/40 bg-gradient-to-br from-primary/10 to-accent/20 hover:shadow-2xl hover:scale-[1.02]"
                    : "hover:shadow-elevated"
                }`}
              >
                {feature.link && (
                  <span className="absolute top-4 right-4 text-[10px] px-2 py-1 rounded-full bg-primary text-primary-foreground font-semibold">
                    TRY NOW
                  </span>
                )}

                <div className={`inline-flex p-3 rounded-lg ${feature.bg} mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>

                <h3 className="font-heading text-lg font-semibold mb-2 text-card-foreground">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {feature.link && (
                  <div className="mt-5 rounded-lg bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground transition-colors group-hover:bg-primary/90">
                    Open Predictor
                  </div>
                )}
              </motion.div>
            );

            return feature.link ? (
              <a
                key={feature.title}
                href={feature.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {cardContent}
              </a>
            ) : (
              cardContent
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;