import { motion } from "framer-motion";
import { Sprout, Droplets, Thermometer, Zap, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SoilHealthItem {
  value: number;
  status: string;
  description: string;
}

interface CropItem {
  name: string;
  suitability: number;
  bestSoils: string;
  npk: string;
  irrigation: string;
  phRange: string;
  tempRange: string;
}

interface Nutrients {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicCarbon: number;
  zinc: number;
  iron: number;
}

interface AdvisoryResults {
  soilHealth: {
    ph: SoilHealthItem;
    moisture: SoilHealthItem;
    temperature: SoilHealthItem;
    conductivity: SoilHealthItem;
  };
  crops: CropItem[];
  nutrients: Nutrients;
}

const statusColor = (s: string) =>
  s === "Good" ? "text-green-600" : s === "Warning" ? "text-yellow-600" : "text-red-600";
const statusDot = (s: string) =>
  s === "Good" ? "bg-green-500" : s === "Warning" ? "bg-yellow-500" : "bg-red-500";

const SoilCard = ({ icon: Icon, label, unit, item }: { icon: any; label: string; unit: string; item: SoilHealthItem }) => (
  <Card className="shadow-card">
    <CardContent className="p-5 space-y-2">
      <div className="flex items-center justify-between">
        <div className="p-2 rounded-lg bg-accent">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <span className={`flex items-center gap-1.5 text-xs font-semibold ${statusColor(item.status)}`}>
          <span className={`w-2 h-2 rounded-full ${statusDot(item.status)}`} />
          {item.status}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-3xl font-bold text-foreground">
        {item.value} <span className="text-base font-normal text-muted-foreground">{unit}</span>
      </p>
      <p className="text-xs text-muted-foreground">{item.description}</p>
    </CardContent>
  </Card>
);

const nutrientColors: Record<string, string> = {
  nitrogen: "bg-emerald-700",
  phosphorus: "bg-amber-500",
  potassium: "bg-blue-600",
  organicCarbon: "bg-yellow-700",
  zinc: "bg-purple-600",
  iron: "bg-red-700",
};

const nutrientLabels: Record<string, string> = {
  nitrogen: "Nitrogen (N)",
  phosphorus: "Phosphorus (P)",
  potassium: "Potassium (K)",
  organicCarbon: "Organic Carbon",
  zinc: "Zinc",
  iron: "Iron",
};

const CropAdvisoryResults = ({ data }: { data: AdvisoryResults }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 mt-8">
      {/* Soil Health Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SoilCard icon={Leaf} label="Soil pH" unit="pH" item={data.soilHealth.ph} />
        <SoilCard icon={Droplets} label="Moisture" unit="%" item={data.soilHealth.moisture} />
        <SoilCard icon={Thermometer} label="Temperature" unit="°C" item={data.soilHealth.temperature} />
        <SoilCard icon={Zap} label="Conductivity" unit="dS/m" item={data.soilHealth.conductivity} />
      </div>

      {/* Crop Recommendations & Nutrients */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Crop Advisory Engine */}
        <Card className="lg:col-span-3 shadow-card">
          <CardContent className="p-6">
            <h2 className="font-heading text-xl font-bold text-foreground mb-1">Crop Advisory Engine</h2>
            <p className="text-sm text-muted-foreground mb-5">
              Ranked by suitability to your soil (pH {data.soilHealth.ph.value}, {data.soilHealth.moisture.value}% moisture)
            </p>
            <div className="space-y-4">
              {data.crops.map((crop, i) => (
                <motion.div
                  key={crop.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border border-border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sprout className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold text-foreground">{crop.name}</h3>
                        <p className="text-xs text-muted-foreground">Best in: {crop.bestSoils}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-primary">
                      {crop.suitability}% – {crop.suitability >= 90 ? "Highly" : crop.suitability >= 70 ? "Moderately" : "Somewhat"} Suitable
                    </span>
                  </div>
                  <Progress value={crop.suitability} className="h-2" />
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-accent text-foreground px-2 py-1 rounded">{crop.npk}</span>
                    <span className="bg-accent text-primary px-2 py-1 rounded">💧 {crop.irrigation}</span>
                    <span className="bg-muted text-muted-foreground px-2 py-1 rounded">pH {crop.phRange}</span>
                    <span className="bg-muted text-muted-foreground px-2 py-1 rounded">{crop.tempRange}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nutrient Analysis */}
        <Card className="lg:col-span-2 shadow-card">
          <CardContent className="p-6">
            <h2 className="font-heading text-xl font-bold text-foreground mb-1">Nutrient Analysis (NPK+)</h2>
            <p className="text-sm text-muted-foreground mb-5">Levels derived from current pH &amp; moisture readings</p>
            <div className="space-y-4">
              {Object.entries(data.nutrients).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground font-medium">{nutrientLabels[key] || key}</span>
                    <span className="text-muted-foreground">{value}%</span>
                  </div>
                  <div className="h-4 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className={`h-full rounded-full ${nutrientColors[key] || "bg-primary"}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default CropAdvisoryResults;
