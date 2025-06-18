import { Metadata } from 'next';
import { PickupBoardClient } from '@/components/pickup/pickup-board-client';
import { Truck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pickup Board - SharePlate',
  description: 'Manage your food pickup requests. View statuses and coordinate with donors.',
};

export default function PickupsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Truck className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary">
            Pickup Management Board
          </h1>
          <p className="text-md text-muted-foreground mt-1">
            View and manage your organization&apos;s food pickup requests.
          </p>
        </div>
      </div>
      <PickupBoardClient />
    </div>
  );
}
