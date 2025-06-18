import { Metadata } from 'next';
import { FoodListingsClient } from '@/components/food/food-listings-client';
import { PlusCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Food Listings - SharePlate',
  description: 'Browse available surplus food items or list your own. Help reduce food waste and support your community.',
};

export default function ListingsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary">
            Available Food Listings
          </h1>
          <p className="text-md text-muted-foreground mt-1">
            Browse surplus food items shared by restaurants and households.
          </p>
        </div>
        {/* The Add Food Item button is part of FoodListingsClient for dialog management */}
      </div>
      <FoodListingsClient />
    </div>
  );
}
