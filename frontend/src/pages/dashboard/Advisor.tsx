import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Send, Loader2, Sprout, Droplets, FlaskConical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Recommendation {
  crop: string;
  confidence: number;
  fertilizer: string;
  tips: string;
}

const mockRecommendations: Recommendation[] = [
  { crop: "Rice (Paddy)", confidence: 95, fertilizer: "NPK 20-10-10, Urea", tips: "Ideal for waterlogged alluvial soil in Kharif season. Ensure proper irrigation and apply DAP at sowing." },
  { crop: "Sugarcane", confidence: 88, fertilizer: "Potash, Compost", tips: "Thrives in alluvial soil with good moisture. Plant in spring, ensure regular watering." },
  { crop: "Wheat", confidence: 82, fertilizer: "DAP, Zinc Sulphate", tips: "Best suited for Rabi season. Ensure well-drained soil and moderate temperature." },
];

const AdvisorPage = () => {
  const [soilType, setSoilType] = useState("");
  const [location, setLocation] = useState("");
  const [season, setSeason] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Recommendation[] | null>(null);

  const getRecommendations = () => {
    if (!soilType || !location || !season) return;
    setLoading(true);
    setTimeout(() => {
      setResults(mockRecommendations);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" /> AI Crop Advisor
        </h1>
        <p className="text-muted-foreground mt-1">Get AI-powered crop recommendations based on your soil and location.</p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-heading text-lg">Input Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label>Soil Type</Label>
              <Select value={soilType} onValueChange={setSoilType}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select soil" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="alluvial">Alluvial</SelectItem>
                  <SelectItem value="black">Black Soil</SelectItem>
                  <SelectItem value="red">Red Soil</SelectItem>
                  <SelectItem value="laterite">Laterite</SelectItem>
                  <SelectItem value="sandy">Sandy</SelectItem>
                  <SelectItem value="clay">Clay</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Location</Label>
              <Input className="mt-1" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Warangal, Telangana" />
            </div>
            <div>
              <Label>Season</Label>
              <Select value={season} onValueChange={setSeason}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select season" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="kharif">Kharif (Monsoon)</SelectItem>
                  <SelectItem value="rabi">Rabi (Winter)</SelectItem>
                  <SelectItem value="zaid">Zaid (Summer)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={getRecommendations} disabled={loading || !soilType || !location || !season} className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Get Recommendations
          </Button>
        </CardContent>
      </Card>

      {results && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <h2 className="font-heading text-lg font-semibold text-foreground">Recommended Crops</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {results.map((r, i) => (
              <motion.div key={r.crop} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}>
                <Card className="shadow-card hover:shadow-elevated transition-shadow h-full">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sprout className="h-5 w-5 text-primary" />
                        <h3 className="font-heading font-semibold text-foreground">{r.crop}</h3>
                      </div>
                      <span className="text-xs font-semibold text-primary bg-accent px-2 py-0.5 rounded-full">{r.confidence}%</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <FlaskConical className="h-4 w-4 mt-0.5 shrink-0 text-secondary" />
                      <span><strong className="text-foreground">Fertilizer:</strong> {r.fertilizer}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Droplets className="h-4 w-4 mt-0.5 shrink-0 text-info" />
                      <span>{r.tips}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AdvisorPage;
