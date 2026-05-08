import { motion } from "framer-motion";
import { Wheat, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const crops = [
  { id: 1, name: "Basmati Rice", farm: "Green Valley Farm", stage: "Flowering", plantedDate: "2026-01-15", progress: 75, health: "Good" },
  { id: 2, name: "Wheat (HD-2967)", farm: "Sunrise Fields", stage: "Tillering", plantedDate: "2025-11-20", progress: 45, health: "Excellent" },
  { id: 3, name: "Sugarcane", farm: "Green Valley Farm", stage: "Grand Growth", plantedDate: "2025-10-05", progress: 60, health: "Good" },
  { id: 4, name: "Cotton", farm: "River Bank Estate", stage: "Boll Formation", plantedDate: "2026-02-10", progress: 55, health: "Fair" },
  { id: 5, name: "Maize", farm: "Sunrise Fields", stage: "Tasseling", plantedDate: "2026-03-01", progress: 40, health: "Good" },
];

const healthColors: Record<string, string> = {
  Excellent: "bg-primary text-primary-foreground",
  Good: "bg-accent text-accent-foreground",
  Fair: "bg-warning text-warning-foreground",
};

const CropsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
          <Wheat className="h-6 w-6 text-secondary" /> Crop Tracker
        </h1>
        <p className="text-muted-foreground mt-1">Monitor growth stages and health of all your crops.</p>
      </div>

      <div className="space-y-3">
        {crops.map((crop, i) => (
          <motion.div key={crop.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="shadow-card hover:shadow-elevated transition-shadow">
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-heading font-semibold text-foreground">{crop.name}</h3>
                      <Badge className={healthColors[crop.health]}>{crop.health}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{crop.farm} • Stage: <span className="text-foreground font-medium">{crop.stage}</span></p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Planted: {crop.plantedDate}</span>
                      <span className="flex items-center gap-1"><TrendingUp className="h-3 w-3" /> {crop.progress}% complete</span>
                    </div>
                  </div>
                  <div className="w-full sm:w-32">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${crop.progress}%` }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CropsPage;
