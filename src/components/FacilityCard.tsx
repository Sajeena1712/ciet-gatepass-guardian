
import { Facility } from "@/lib/types";
import { 
  Bed, 
  Book, 
  Shield, 
  Wifi, 
  Utensils, 
  Thermometer, 
  Shower, 
  Shirt 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FacilityCardProps {
  facility: Facility;
}

const FacilityCard = ({ facility }: FacilityCardProps) => {
  const getIcon = () => {
    switch (facility.icon) {
      case 'shield':
        return <Shield className="h-6 w-6 text-ciet-blue" />;
      case 'wifi':
        return <Wifi className="h-6 w-6 text-ciet-blue" />;
      case 'utensils':
        return <Utensils className="h-6 w-6 text-ciet-blue" />;
      case 'medical':
        return <Thermometer className="h-6 w-6 text-ciet-blue" />;
      case 'bed':
        return <Bed className="h-6 w-6 text-ciet-blue" />;
      case 'shower':
        return <Shower className="h-6 w-6 text-ciet-blue" />;
      case 'book':
        return <Book className="h-6 w-6 text-ciet-blue" />;
      case 'washing-machine':
        return <Shirt className="h-6 w-6 text-ciet-blue" />;
      default:
        return <Shield className="h-6 w-6 text-ciet-blue" />;
    }
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {getIcon()}
          <CardTitle className="text-lg font-medium">{facility.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{facility.description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default FacilityCard;
