import { motion } from "framer-motion";
import { AlertTriangle, Bug, CloudRain, Droplets, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const alerts = [
  { id: 1, type: "pest", title: "Aphid Infestation Detected", description: "High aphid activity detected in Green Valley Farm - Rice fields. Apply neem oil spray immediately.", severity: "high", time: "2 hours ago", icon: Bug },
  { id: 2, type: "weather", title: "Heavy Rain Warning", description: "Heavy rainfall expected in Warangal region for next 48 hours. Secure crops and ensure proper drainage.", severity: "high", time: "4 hours ago", icon: CloudRain },
  { id: 3, type: "irrigation", title: "Irrigation Reminder", description: "Sunrise Fields wheat crop needs watering. Soil moisture is below 30%.", severity: "medium", time: "6 hours ago", icon: Droplets },
  { id: 4, type: "pest", title: "Brown Plant Hopper Alert", description: "BPH risk is moderate in your region. Monitor rice paddies closely.", severity: "medium", time: "1 day ago", icon: Bug },
  { id: 5, type: "weather", title: "Temperature Drop", description: "Night temperatures expected to drop to 8°C. Protect tender seedlings.", severity: "low", time: "2 days ago", icon: CloudRain },
];

const severityColors: Record<string, string> = {
  high: "bg-destructive text-destructive-foreground",
  medium: "bg-warning text-warning-foreground",
  low: "bg-muted text-muted-foreground",
};

const AlertsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-warning" /> Alerts & Notifications
        </h1>
        <p className="text-muted-foreground mt-1">Stay informed about threats and reminders for your farms.</p>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, i) => (
          <motion.div key={alert.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="shadow-card hover:shadow-elevated transition-shadow">
              <CardContent className="p-4 flex items-start gap-4">
                <div className={`p-2.5 rounded-lg ${alert.severity === "high" ? "bg-destructive/10" : alert.severity === "medium" ? "bg-warning/10" : "bg-muted"}`}>
                  <alert.icon className={`h-5 w-5 ${alert.severity === "high" ? "text-destructive" : alert.severity === "medium" ? "text-warning" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-card-foreground">{alert.title}</h3>
                    <Badge className={severityColors[alert.severity]}>{alert.severity}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {alert.time}
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

export default AlertsPage;
