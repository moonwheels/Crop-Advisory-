import { motion } from "framer-motion";
import { Map, Wheat, CloudSun, AlertTriangle, TrendingUp, Droplets, Thermometer, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const stats = [
  { title: "Total Farms", value: "12", icon: Map, change: "+2 this month", color: "text-primary", bg: "bg-accent" },
  { title: "Active Crops", value: "34", icon: Wheat, change: "8 ready to harvest", color: "text-secondary", bg: "bg-secondary/10" },
  { title: "Weather", value: "28°C", icon: CloudSun, change: "Partly cloudy", color: "text-info", bg: "bg-info/10" },
  { title: "Alerts", value: "3", icon: AlertTriangle, change: "2 pest, 1 weather", color: "text-destructive", bg: "bg-destructive/10" },
];

const yieldData = [
  { month: "Jan", yield: 2400, predicted: 2600 },
  { month: "Feb", yield: 1398, predicted: 1500 },
  { month: "Mar", yield: 3800, predicted: 3600 },
  { month: "Apr", yield: 3908, predicted: 4000 },
  { month: "May", yield: 4800, predicted: 4700 },
  { month: "Jun", yield: 3800, predicted: 4200 },
];

const soilData = [
  { type: "Nitrogen", value: 78 },
  { type: "Phosphorus", value: 65 },
  { type: "Potassium", value: 82 },
  { type: "pH Level", value: 70 },
  { type: "Moisture", value: 55 },
];

const weatherDetails = [
  { label: "Temperature", value: "28°C", icon: Thermometer },
  { label: "Humidity", value: "65%", icon: Droplets },
  { label: "Wind Speed", value: "12 km/h", icon: Wind },
  { label: "Growth Index", value: "+8.2%", icon: TrendingUp },
];

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Welcome back, Farmer! 🌾</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening on your farms today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="shadow-card hover:shadow-elevated transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-card-foreground mt-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-2.5 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Yield Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={yieldData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Area type="monotone" dataKey="yield" stroke="hsl(142, 55%, 35%)" fill="hsl(142, 55%, 35% / 0.15)" strokeWidth={2} />
                <Area type="monotone" dataKey="predicted" stroke="hsl(42, 90%, 55%)" fill="hsl(42, 90%, 55% / 0.1)" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Soil Health</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={soilData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="type" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(142, 55%, 35%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Weather Details */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-heading text-lg">Today's Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {weatherDetails.map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <item.icon className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
