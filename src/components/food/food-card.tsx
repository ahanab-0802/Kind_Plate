import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { FoodItem } from '@/lib/types';
import { CalendarClock, MapPin, Tag, Package, Send, ShoppingBasket, Home, Building } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';

interface FoodCardProps {
  item: FoodItem;
}

const categoryIcons: Record<FoodItem['category'], React.ElementType> = {
  "Fruits": AppleIcon,
  "Vegetables": CarrotIcon,
  "Baked Goods": CakeIcon,
  "Dairy": MilkIcon,
  "Meats": BeefIcon,
  "Meals": SandwichIcon,
  "Other": Package,
};

function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/>
    </svg>
  );
}
function CarrotIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2.27 21.68c.3.73.96 1.15 1.73 1.15.26 0 .52-.05.78-.15l.39-.15.6-.22 1.39-.52A42.06 42.06 0 0 0 12 18c2.19 0 4.3.26 6.32.78l1.4.52.6.22.4.15c.25.1.51.15.77.15.77 0 1.44-.42 1.73-1.15l.9-2.29c.28-.72.28-1.5 0-2.22l-.53-1.34A51.54 51.54 0 0 0 12 14c-2.3 0-4.5.28-6.66.82l-.53 1.34c-.28.72-.28 1.5 0 2.22l.9 2.29Z"/><path d="M12 14V2"/><path d="M16 2s0 2-2 4-4-2-6-2S5.21 4.58 7 7c2 2.5 5 2.5 5 2.5s3 0 5-2.5c1.79-2.42 1-5 1-5Z"/><path d="M12 14s2.13.26 4.08.78"/><path d="m12 14-4.08.78"/>
    </svg>
  );
}

function CakeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v2"/><path d="M12 8v2"/><path d="M17 8v2"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/>
    </svg>
  );
}
function MilkIcon(props: React.SVGProps<SVGSVGElement>) {
 return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 2h8"/><path d="M9 2v2.789a4 4 0 0 1-.529 1.948L7 9h10l-1.471-2.263A4 4 0 0 1 15 4.789V2"/><path d="M5 9h14a1 1 0 0 1 1 1v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a1 1 0 0 1 1-1Z"/><path d="m14 13-1.414-1.414a2 2 0 0 0-2.828 0L8.344 13"/><path d="m13.829 16.171-1.415-1.414a2 2 0 0 0-2.828 0L8.172 16.171"/>
    </svg>
  );
}
function BeefIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12.5" cy="8.5" r="2.5"/><path d="M12.5 2a6.5 6.5 0 0 0-6.22 4.41l-1.23 4.54a1 1 0 0 0 .62 1.25l.26.08c.32.1.66.05.95-.12L8.5 10.5l1.04 1.04a1 1 0 0 0 .7.3c.3-.02.56-.17.72-.4l.8-1.28.86.86a2.038 2.038 0 0 0 1.4.6V14a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1v-1.76a2.038 2.038 0 0 0 1.4-.6l.86-.86.8 1.28c.16.23.43.38.72.4a1 1 0 0 0 .7-.3l1.04-1.04 1.63 1.63c.29.27.63.32.95.12l.26-.08a1 1 0 0 0 .62-1.25l-1.23-4.54A6.5 6.5 0 0 0 12.5 2Z"/>
    </svg>
  );
}
function SandwichIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3"/><path d="M12 19H4a1 1 0 0 1-1-1v-2.41a1 1 0 0 1 .29-.7L8 9.24a1 1 0 0 1 1.42 0L12 11.5Z"/><path d="m22 14-2-2.5-2.5-1.2-3-2.3H12M12 11.5 14.5 9l4.55-2.28a1 1 0 0 1 1.16.22L22 8.61a1 1 0 0 1 .04 1.1L20 12Z"/><path d="M6 15h.01"/><path d="M7 12h.01"/>
    </svg>
  );
}

export function FoodCard({ item }: FoodCardProps) {
  const { toast } = useToast();
  const IconComponent = categoryIcons[item.category] || Package;
  const DonorIcon = item.donatedBy.type === "Restaurant" ? Building : Home;

  const handleRequestPickup = () => {
    // Simulate API call for requesting pickup
    console.log(`Requesting pickup for item: ${item.name}`);
    toast({
      title: "Pickup Requested",
      description: `Your request for "${item.name}" has been sent.`,
    });
    // Here you might want to update the item's status locally or refetch,
    // but for mock, we'll just show a toast.
  };

  const isExpired = item.expiryDate < new Date();
  const daysUntilExpiry = Math.ceil((item.expiryDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24));


  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="relative w-full h-48 rounded-md overflow-hidden mb-3">
          <Image
            src={item.imageUrl || "https://placehold.co/600x400.png"}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint={`${item.category} food`}
            className="transition-transform duration-300 group-hover:scale-105"
          />
           <Badge 
            variant={item.status === 'Available' ? 'default' : item.status === 'Reserved' ? 'secondary' : 'outline'}
            className="absolute top-2 right-2 bg-opacity-80 backdrop-blur-sm"
          >
            {item.status}
          </Badge>
        </div>
        <CardTitle className="font-headline text-xl text-primary">{item.name}</CardTitle>
        <CardDescription className="text-sm flex items-center gap-1.5">
          <DonorIcon className="h-4 w-4 text-muted-foreground" /> Donated by: {item.donatedBy.name} ({item.donatedBy.type})
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2 text-sm">
        <p className="text-muted-foreground line-clamp-2">{item.description}</p>
        <div className="flex items-center gap-2 text-muted-foreground">
          <IconComponent className="h-4 w-4 text-accent" />
          <span>Category: {item.category}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <ShoppingBasket className="h-4 w-4 text-accent" />
          <span>Quantity: {item.quantity}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <CalendarClock className="h-4 w-4 text-accent" />
          <span>
            Expires: {format(item.expiryDate, "PPP")}
            {isExpired ? (
              <Badge variant="destructive" className="ml-2">Expired</Badge>
            ) : daysUntilExpiry <=3 ? (
              <Badge variant="secondary" className="ml-2 text-orange-600 border-orange-400">Expires Soon</Badge>
            ) : null}
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4 text-accent" />
          <span>Location: {item.donatedBy.address}</span>
        </div>
        {item.location && <div className="flex items-center gap-2 text-muted-foreground">
            <Tag className="h-4 w-4 text-accent" />
            <span>Pickup Details: {item.location}</span>
        </div>}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" 
          onClick={handleRequestPickup}
          disabled={item.status !== "Available" || isExpired}
          aria-label={`Request pickup for ${item.name}`}
        >
          <Send className="mr-2 h-4 w-4" /> 
          {item.status === "Available" ? "Request Pickup" : item.status === "Reserved" ? "Reserved" : "Unavailable"}
        </Button>
      </CardFooter>
    </Card>
  );
}

