import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Upload, Camera, Loader2, AlertTriangle, CheckCircle2, Leaf, Bug, Pill, Shield, TrendingDown, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/landing/Navbar";
import { postJson } from "@/lib/api";

interface Treatment {
  type: string;
  name: string;
  description: string;
  effectiveness: string;
}

interface DiagnosisResult {
  detected: boolean;
  diseaseName: string;
  confidence: number;
  severity: string;
  affectedPart: string;
  description: string;
  symptoms: string[];
  treatments: Treatment[];
  preventionTips: string[];
  additionalInfo: {
    spreadRisk: string;
    commonIn: string[];
    bestSeason: string;
    estimatedYieldLoss: string;
  };
}

const severityColor: Record<string, string> = {
  mild: "bg-yellow-100 text-yellow-800 border-yellow-300",
  moderate: "bg-orange-100 text-orange-800 border-orange-300",
  severe: "bg-red-100 text-red-800 border-red-300",
};

const effectivenessWidth: Record<string, number> = {
  high: 90,
  medium: 60,
  low: 30,
};

const treatmentIcon: Record<string, string> = {
  chemical: "💊",
  organic: "🌿",
  cultural: "🌾",
  biological: "🦠",
};

const DiseaseDetect = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Please upload an image under 5MB.", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!imagePreview) return;
    setLoading(true);
    setResult(null);
    try {
      const data = await postJson<DiagnosisResult>("/disease-detect", { imageBase64: imagePreview });
      setResult(data);
    } catch (err: any) {
      toast({ title: "Analysis failed", description: err.message || "Could not analyze image.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImagePreview(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Navbar />
      <div className="container pt-24 pb-12 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <ShieldCheck className="h-5 w-5" />
            <span className="font-medium text-sm">AI-Powered Disease Detection</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Crop Disease Detector</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Upload a photo of your diseased crop and get instant AI-powered diagnosis with accurate treatment recommendations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card className="border-2 border-dashed border-primary/30 hover:border-primary/60 transition-colors">
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[350px]">
              <input ref={fileInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />
              {!imagePreview ? (
                <div className="text-center space-y-4">
                  <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <Camera className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Upload Crop Image</p>
                    <p className="text-sm text-muted-foreground">Take a photo or select from gallery</p>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={() => fileInputRef.current?.click()} className="gap-2">
                      <Upload className="h-4 w-4" /> Choose Image
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Supports JPG, PNG • Max 5MB</p>
                </div>
              ) : (
                <div className="w-full space-y-4">
                  <img src={imagePreview} alt="Crop preview" className="w-full max-h-60 object-contain rounded-lg border" />
                  <div className="flex gap-3 justify-center">
                    <Button onClick={handleAnalyze} disabled={loading} className="gap-2">
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bug className="h-4 w-4" />}
                      {loading ? "Analyzing..." : "Detect Disease"}
                    </Button>
                    <Button variant="outline" onClick={reset} disabled={loading}>
                      Reset
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Info / Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Info className="h-5 w-5 text-primary" /> Tips for Best Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Take clear, close-up photos of the affected area",
                "Include both healthy and diseased parts for comparison",
                "Ensure good lighting — natural daylight works best",
                "Capture leaves, stems, or fruits showing symptoms",
                "Avoid blurry or too-distant shots",
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">{tip}</span>
                </div>
              ))}
              <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <strong>Supported crops:</strong> Rice, Wheat, Cotton, Tomato, Potato, Corn, Sugarcane, Soybean, and many more.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-8">
              <Card>
                <CardContent className="p-8 flex flex-col items-center gap-4">
                  <Loader2 className="h-12 w-12 text-primary animate-spin" />
                  <p className="text-muted-foreground font-medium">Analyzing your crop image with AI...</p>
                  <p className="text-xs text-muted-foreground">This may take a few seconds</p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {result && !loading && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-6">
              {/* Diagnosis Header */}
              <Card className={result.detected ? "border-l-4 border-l-destructive" : "border-l-4 border-l-green-500"}>
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${result.detected ? "bg-destructive/10" : "bg-green-100"}`}>
                      {result.detected ? <Bug className="h-7 w-7 text-destructive" /> : <Leaf className="h-7 w-7 text-green-600" />}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-foreground">{result.diseaseName}</h2>
                      <p className="text-muted-foreground text-sm">{result.description}</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="text-sm">
                        Confidence: {result.confidence}%
                      </Badge>
                      {result.detected && (
                        <>
                          <Badge className={severityColor[result.severity] || ""}>{result.severity}</Badge>
                          <Badge variant="secondary">Affects: {result.affectedPart}</Badge>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {result.detected && (
                <>
                  {/* Symptoms */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <AlertTriangle className="h-5 w-5 text-orange-500" /> Symptoms Identified
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {result.symptoms.map((s, i) => (
                          <div key={i} className="flex items-start gap-2 p-2 bg-muted/50 rounded-md">
                            <span className="text-orange-500 font-bold mt-0.5">•</span>
                            <span className="text-sm text-foreground">{s}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Treatments */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Pill className="h-5 w-5 text-primary" /> Treatment Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {result.treatments.map((t, i) => (
                        <div key={i} className="p-4 border rounded-lg space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{treatmentIcon[t.type] || "💡"}</span>
                              <span className="font-semibold text-foreground">{t.name}</span>
                              <Badge variant="outline" className="text-xs capitalize">{t.type}</Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{t.description}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Effectiveness:</span>
                            <Progress value={effectivenessWidth[t.effectiveness] || 50} className="flex-1 h-2" />
                            <span className="text-xs font-medium capitalize text-foreground">{t.effectiveness}</span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Prevention & Additional Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Shield className="h-5 w-5 text-green-600" /> Prevention Tips
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.preventionTips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                              <span className="text-sm text-foreground">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <TrendingDown className="h-5 w-5 text-destructive" /> Impact & Info
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Spread Risk</span>
                          <Badge variant={result.additionalInfo.spreadRisk === "high" ? "destructive" : "secondary"}>
                            {result.additionalInfo.spreadRisk}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Est. Yield Loss</span>
                          <span className="font-medium text-foreground">{result.additionalInfo.estimatedYieldLoss}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Best Treatment Season</span>
                          <span className="font-medium text-foreground">{result.additionalInfo.bestSeason}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Common in: </span>
                          <span className="text-foreground">{result.additionalInfo.commonIn?.join(", ")}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DiseaseDetect;
