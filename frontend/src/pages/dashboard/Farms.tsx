import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, MapPin, Trash2, Edit, Ruler } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Farm {
  id: string;
  name: string;
  location: string;
  soilType: string;
  area: string;
  crops: number;
}

const initialFarms: Farm[] = [
  { id: "1", name: "Green Valley Farm", location: "Warangal, Telangana", soilType: "Alluvial", area: "25 acres", crops: 4 },
  { id: "2", name: "Sunrise Fields", location: "Guntur, AP", soilType: "Black Soil", area: "40 acres", crops: 6 },
  { id: "3", name: "River Bank Estate", location: "Krishna, AP", soilType: "Red Soil", area: "18 acres", crops: 3 },
];

const FarmsPage = () => {
  const [farms, setFarms] = useState<Farm[]>(initialFarms);
  const [open, setOpen] = useState(false);
  const [newFarm, setNewFarm] = useState({ name: "", location: "", soilType: "", area: "" });
  const { toast } = useToast();

  const addFarm = () => {
    if (!newFarm.name || !newFarm.location) return;
    setFarms([...farms, { ...newFarm, id: Date.now().toString(), crops: 0 }]);
    setNewFarm({ name: "", location: "", soilType: "", area: "" });
    setOpen(false);
    toast({ title: "Farm added!", description: `${newFarm.name} has been added.` });
  };

  const deleteFarm = (id: string) => {
    setFarms(farms.filter((f) => f.id !== id));
    toast({ title: "Farm removed", variant: "destructive" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Farm Management</h1>
          <p className="text-muted-foreground mt-1">Add, manage, and monitor your farms.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
              <Plus className="h-4 w-4" /> Add Farm
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-heading">Add New Farm</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Farm Name</Label>
                <Input className="mt-1" value={newFarm.name} onChange={(e) => setNewFarm({ ...newFarm, name: e.target.value })} placeholder="My Farm" />
              </div>
              <div>
                <Label>Location</Label>
                <Input className="mt-1" value={newFarm.location} onChange={(e) => setNewFarm({ ...newFarm, location: e.target.value })} placeholder="City, State" />
              </div>
              <div>
                <Label>Soil Type</Label>
                <Select value={newFarm.soilType} onValueChange={(v) => setNewFarm({ ...newFarm, soilType: v })}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select soil type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alluvial">Alluvial</SelectItem>
                    <SelectItem value="Black Soil">Black Soil</SelectItem>
                    <SelectItem value="Red Soil">Red Soil</SelectItem>
                    <SelectItem value="Laterite">Laterite</SelectItem>
                    <SelectItem value="Sandy">Sandy</SelectItem>
                    <SelectItem value="Clay">Clay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Area</Label>
                <Input className="mt-1" value={newFarm.area} onChange={(e) => setNewFarm({ ...newFarm, area: e.target.value })} placeholder="e.g. 25 acres" />
              </div>
              <Button onClick={addFarm} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Add Farm</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {farms.map((farm, i) => (
          <motion.div key={farm.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="shadow-card hover:shadow-elevated transition-all group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="font-heading text-lg">{farm.name}</CardTitle>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground"><Edit className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => deleteFarm(farm.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {farm.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Ruler className="h-3.5 w-3.5" /> {farm.area} • {farm.soilType}
                </div>
                <div className="pt-2">
                  <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                    {farm.crops} active crops
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FarmsPage;
