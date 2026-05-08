import { useState } from "react";
import { motion } from "framer-motion";
import { Sprout, Send, Loader2, Droplets, Thermometer, MapPin, Mountain, Calendar, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/landing/Navbar";
import CropAdvisoryResults from "@/components/dashboard/CropAdvisoryResults";
import { postJson } from "@/lib/api";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const FarmerDashboard = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    phValue: "",
    moisture: "",
    nitrogen: "",
    phosphate: "",
    weather: "",
    soilType: "",
    location: "",
    landType: "",
    month: "",
    feedback: "",
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResults(null);
    try {
      const data = await postJson<any>("/crop-advisory", formData);
      setResults(data);
    } catch (e: any) {
      console.error("Advisory error:", e);
      toast({
        title: "Error",
        description: e.message || "Failed to get recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container pt-24 pb-16 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl font-bold text-foreground flex items-center gap-2 mb-2">
            <Sprout className="h-7 w-7 text-primary" /> Farmer Dashboard
          </h1>
          <p className="text-muted-foreground mb-8">Enter your soil and farm details to get AI-powered crop recommendations.</p>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-heading text-lg">Soil & Farm Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Label className="flex items-center gap-1.5 mb-1.5">
                    <Thermometer className="h-3.5 w-3.5 text-primary" /> pH Value
                  </Label>
                  <Input type="number" step="0.1" placeholder="e.g. 6.5" value={formData.phValue} onChange={(e) => handleChange("phValue", e.target.value)} />
                </div>
                <div>
                  <Label className="flex items-center gap-1.5 mb-1.5">
                    <Droplets className="h-3.5 w-3.5 text-primary" /> Moisture (%)
                  </Label>
                  <Input type="number" placeholder="e.g. 45" value={formData.moisture} onChange={(e) => handleChange("moisture", e.target.value)} />
                </div>
                <div>
                  <Label className="flex items-center gap-1.5 mb-1.5">Nitrogen (kg/ha)</Label>
                  <Input type="number" placeholder="e.g. 120" value={formData.nitrogen} onChange={(e) => handleChange("nitrogen", e.target.value)} />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Label className="flex items-center gap-1.5 mb-1.5">Phosphate (kg/ha)</Label>
                  <Input type="number" placeholder="e.g. 40" value={formData.phosphate} onChange={(e) => handleChange("phosphate", e.target.value)} />
                </div>
                <div>
                  <Label className="flex items-center gap-1.5 mb-1.5">Weather Condition</Label>
                  <Select value={formData.weather} onValueChange={(v) => handleChange("weather", v)}>
                    <SelectTrigger><SelectValue placeholder="Select weather" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sunny">Sunny</SelectItem>
                      <SelectItem value="rainy">Rainy</SelectItem>
                      <SelectItem value="cloudy">Cloudy</SelectItem>
                      <SelectItem value="humid">Humid</SelectItem>
                      <SelectItem value="cold">Cold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="flex items-center gap-1.5 mb-1.5">Soil Type</Label>
                  <Select value={formData.soilType} onValueChange={(v) => handleChange("soilType", v)}>
                    <SelectTrigger><SelectValue placeholder="Select soil" /></SelectTrigger>
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
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Label className="flex items-center gap-1.5 mb-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary" /> Location / Area
                  </Label>
                  <Input placeholder="e.g. Warangal, Telangana" value={formData.location} onChange={(e) => handleChange("location", e.target.value)} />
                </div>
                <div>
                  <Label className="flex items-center gap-1.5 mb-1.5">
                    <Mountain className="h-3.5 w-3.5 text-primary" /> Land Type
                  </Label>
                  <Select value={formData.landType} onValueChange={(v) => handleChange("landType", v)}>
                    <SelectTrigger><SelectValue placeholder="Select land type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="near-stream">Near Stream / River</SelectItem>
                      <SelectItem value="normal">Normal / Plain Land</SelectItem>
                      <SelectItem value="hill">Hill Area</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="flex items-center gap-1.5 mb-1.5">
                    <Calendar className="h-3.5 w-3.5 text-primary" /> Month
                  </Label>
                  <Select value={formData.month} onValueChange={(v) => handleChange("month", v)}>
                    <SelectTrigger><SelectValue placeholder="Select month" /></SelectTrigger>
                    <SelectContent>
                      {months.map((m) => (
                        <SelectItem key={m} value={m.toLowerCase()}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="flex items-center gap-1.5 mb-1.5">
                  <MessageSquare className="h-3.5 w-3.5 text-primary" /> Feedback / Notes
                </Label>
                <Textarea
                  placeholder="Any additional details about your farm or soil conditions..."
                  value={formData.feedback}
                  onChange={(e) => handleChange("feedback", e.target.value)}
                  rows={3}
                />
              </div>

              <Button onClick={handleSubmit} disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {loading ? "Analyzing..." : "Submit & Get Advisory"}
              </Button>
            </CardContent>
          </Card>

          {results && <CropAdvisoryResults data={results} />}
        </motion.div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
