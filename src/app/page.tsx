import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, Users, CheckCircle, HandHeart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 md:py-20 bg-gradient-to-br from-primary/20 via-background to-background rounded-lg shadow-lg">
        <div className="container mx-auto px-4">
          <HandHeart className="mx-auto h-20 w-20 text-primary mb-6" />
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-6">
            Welcome to SharePlate
          </h1>
          <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto mb-8">
            Connecting surplus food with those who need it most. Let&apos;s fight food waste and hunger, together.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md transition-transform hover:scale-105">
              <Link href="/listings">View Food Listings</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="shadow-md transition-transform hover:scale-105 border-accent text-accent hover:bg-accent/10">
              <Link href="/register">Join Our Community</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-headline font-semibold text-center text-primary mb-10">
          How SharePlate Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center">
              <div className="p-3 bg-primary/10 rounded-full mb-3">
                <Utensils className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="font-headline text-2xl text-center">List Your Surplus</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-md">
                Restaurants and households can easily list surplus food items with details like expiry and quantity.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center">
              <div className="p-3 bg-primary/10 rounded-full mb-3">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="font-headline text-2xl text-center">NGOs Discover & Connect</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-md">
                NGOs can browse available food, sorted by proximity and freshness, and request pickups.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center">
               <div className="p-3 bg-primary/10 rounded-full mb-3">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="font-headline text-2xl text-center">Efficient Pickups</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-md">
                Manage pickups through a simple status board and log successful deliveries, ensuring food reaches those in need.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12 bg-card rounded-lg shadow-lg">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-headline font-semibold text-primary mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-foreground mb-4">
              At SharePlate, we believe that no good food should go to waste, especially when there are people in our communities facing hunger. 
            </p>
            <p className="text-lg text-foreground">
              Our platform provides a simple, efficient, and compassionate way to redirect surplus food from those who have it to those who need it, fostering a community of care and sustainability.
            </p>
          </div>
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
            <Image 
              src="https://placehold.co/600x400.png" 
              alt="Community sharing food" 
              layout="fill" 
              objectFit="cover"
              data-ai-hint="community food"
              className="transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
