import { motion } from "framer-motion";
import { CloudSun, Thermometer, Droplets, Wind, Eye, Gauge, Sun, CloudRain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const forecast = [
  { day: "Today", icon: Sun, temp: "28°C", condition: "Sunny", humidity: "65%", wind: "12 km/h" },
  { day: "Tomorrow", icon: CloudSun, temp: "26°C", condition: "Partly Cloudy", humidity: "70%", wind: "15 km/h" },
  { day: "Wednesday", icon: CloudRain, temp: "24°C", condition: "Light Rain", humidity: "80%", wind: "18 km/h" },
  { day: "Thursday", icon: CloudRain, temp: "22°C", condition: "Heavy Rain", humidity: "90%", wind: "25 km/h" },
  { day: "Friday", icon: CloudSun, temp: "25°C", condition: "Clearing", humidity: "72%", wind: "14 km/h" },
];

const WeatherPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
          <CloudSun className="h-6 w-6 text-info" /> Weather Intelligence
        </h1>
        <p className="text-muted-foreground mt-1">Hyperlocal weather data for your farm locations.</p>
      </div>

      {/* Current weather */}
      <Card className="shadow-card bg-gradient-to-br from-info/10 to-primary/5">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Sun className="h-16 w-16 text-secondary" />
              <div>
                <p className="text-4xl font-bold text-foreground">28°C</p>
                <p className="text-muted-foreground">Sunny • Warangal, Telangana</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Humidity", value: "65%", icon: Droplets },
                { label: "Wind", value: "12 km/h", icon: Wind },
                { label: "Visibility", value: "10 km", icon: Eye },
                { label: "Pressure", value: "1013 hPa", icon: Gauge },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 p-2 rounded-lg bg-card/80">
                  <item.icon className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-semibold text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5-day forecast */}
      <div>
        <h2 className="font-heading text-lg font-semibold mb-4 text-foreground">5-Day Forecast</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {forecast.map((day, i) => (
            <motion.div key={day.day} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="shadow-card text-center hover:shadow-elevated transition-shadow">
                <CardContent className="p-4">
                  <p className="text-sm font-semibold text-foreground mb-2">{day.day}</p>
                  <day.icon className="h-8 w-8 mx-auto text-info mb-2" />
                  <p className="text-xl font-bold text-foreground">{day.temp}</p>
                  <p className="text-xs text-muted-foreground mt-1">{day.condition}</p>
                  <div className="mt-2 space-y-1 text-[10px] text-muted-foreground">
                    <p>💧 {day.humidity}</p>
                    <p>💨 {day.wind}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
