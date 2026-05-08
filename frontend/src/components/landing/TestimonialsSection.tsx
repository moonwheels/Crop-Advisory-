import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Farmer, Andhra Pradesh",
    content: "AgriVision AI helped me increase my rice yield by 30%. The crop advisor recommended the perfect fertilizer mix for my soil type.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Agronomist",
    content: "The disease detection feature saved hundreds of acres of wheat. We caught the blight early and treated it before it spread.",
    rating: 5,
  },
  {
    name: "Venkat Reddy",
    role: "Farm Owner, Telangana",
    content: "Weather intelligence and yield predictions allow me to plan my sales perfectly. Best investment I've made for my farm.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Testimonials</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4 text-foreground">
            Trusted by farmers across India
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card rounded-xl p-6 shadow-card border border-border"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-card-foreground mb-4 leading-relaxed">"{t.content}"</p>
              <div>
                <p className="font-semibold text-card-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
