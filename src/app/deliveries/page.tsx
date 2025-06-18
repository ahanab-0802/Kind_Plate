import { Metadata } from 'next';
import { DeliveryLogClient } from '@/components/delivery/delivery-log-client';
import { PackageCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Delivery Logs - SharePlate',
  description: 'View a log of all successful food deliveries made through SharePlate.',
};

export default function DeliveriesPage() {
  return (
    <div className="space-y-8">
       <div className="flex items-center gap-3">
        <PackageCheck className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary">
            Successful Delivery Logs
          </h1>
          <p className="text-md text-muted-foreground mt-1">
            A record of food items that have successfully reached their destinations.
          </p>
        </div>
      </div>
      <DeliveryLogClient />
    </div>
  );
}
