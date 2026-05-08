import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const yieldData = [
  { month: "Jan", rice: 2400, wheat: 1800, corn: 1200 },
  { month: "Feb", rice: 1398, wheat: 2200, corn: 1400 },
  { month: "Mar", rice: 3800, wheat: 2800, corn: 1600 },
  { month: "Apr", rice: 3908, wheat: 3000, corn: 2000 },
  { month: "May", rice: 4800, wheat: 2600, corn: 2400 },
  { month: "Jun", rice: 3800, wheat: 2000, corn: 2800 },
];

const cropDistribution = [
  { name: "Rice", value: 35, color: "hsl(142, 55%, 35%)" },
  { name: "Wheat", value: 25, color: "hsl(42, 90%, 55%)" },
  { name: "Corn", value: 20, color: "hsl(200, 80%, 50%)" },
  { name: "Sugarcane", value: 15, color: "hsl(0, 84%, 60%)" },
  { name: "Other", value: 5, color: "hsl(215, 16%, 47%)" },
];

const weatherTrend = [
  { day: "Mon", temp: 28, humidity: 65 },
  { day: "Tue", temp: 30, humidity: 60 },
  { day: "Wed", temp: 27, humidity: 70 },
  { day: "Thu", temp: 29, humidity: 62 },
  { day: "Fri", temp: 31, humidity: 58 },
  { day: "Sat", temp: 26, humidity: 75 },
  { day: "Sun", temp: 28, humidity: 68 },
];

const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Farm Analytics</h1>
        <p className="text-muted-foreground mt-1">Comprehensive insights into your farming operations.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="shadow-card">
            <CardHeader><CardTitle className="font-heading text-lg">Yield by Crop</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={yieldData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Area type="monotone" dataKey="rice" stackId="1" stroke="hsl(142, 55%, 35%)" fill="hsl(142, 55%, 35% / 0.3)" />
                  <Area type="monotone" dataKey="wheat" stackId="1" stroke="hsl(42, 90%, 55%)" fill="hsl(42, 90%, 55% / 0.3)" />
                  <Area type="monotone" dataKey="corn" stackId="1" stroke="hsl(200, 80%, 50%)" fill="hsl(200, 80%, 50% / 0.3)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="shadow-card">
            <CardHeader><CardTitle className="font-heading text-lg">Crop Distribution</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={cropDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {cropDistribution.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
          <Card className="shadow-card">
            <CardHeader><CardTitle className="font-heading text-lg">Weekly Weather Trend</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={weatherTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis yAxisId="left" className="text-xs" />
                  <YAxis yAxisId="right" orientation="right" className="text-xs" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="temp" stroke="hsl(0, 84%, 60%)" strokeWidth={2} name="Temp (°C)" />
                  <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="hsl(200, 80%, 50%)" strokeWidth={2} name="Humidity (%)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
