"use client";

import React, { useState, useEffect } from 'react';
import type { PickupRequest, PickupStatus } from '@/lib/types';
import { mockPickupRequests } from '@/lib/placeholder-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { AlertTriangle, CheckCircle2, Hourglass, Truck, XCircle, Package, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const statusIcons: Record<PickupStatus, React.ElementType> = {
  Pending: Hourglass,
  Confirmed: CheckCircle2,
  PickedUp: Truck,
  Cancelled: XCircle,
};

const statusColors: Record<PickupStatus, string> = {
  Pending: "bg-yellow-500 hover:bg-yellow-600",
  Confirmed: "bg-green-500 hover:bg-green-600",
  PickedUp: "bg-blue-500 hover:bg-blue-600",
  Cancelled: "bg-red-500 hover:bg-red-600",
};

export function PickupBoardClient() {
  const [pickups, setPickups] = useState<PickupRequest[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching data
    setPickups(mockPickupRequests);
  }, []);

  const handleStatusChange = (pickupId: string, newStatus: PickupStatus) => {
    setPickups(prevPickups =>
      prevPickups.map(p =>
        p.id === pickupId ? { ...p, status: newStatus, pickupTimestamp: newStatus === "PickedUp" ? new Date() : p.pickupTimestamp } : p
      )
    );
    toast({
      title: "Status Updated",
      description: `Pickup request status changed to ${newStatus}.`,
    });
  };

  if (pickups.length === 0) {
    return (
      <div className="text-center py-10">
        <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-xl text-muted-foreground">No pickup requests found.</p>
        <p className="text-md text-muted-foreground mt-2">Check the Food Listings page to request items.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pickups.map((pickup) => {
        const StatusIcon = statusIcons[pickup.status];
        return (
          <Card key={pickup.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="font-headline text-lg text-primary mb-1">{pickup.foodItem.name}</CardTitle>
                <Badge className={`${statusColors[pickup.status]} text-white text-xs`}>
                  <StatusIcon className="h-3 w-3 mr-1.5" />
                  {pickup.status}
                </Badge>
              </div>
              <CardDescription className="text-xs">
                From: {pickup.foodItem.donatedBy.name} ({pickup.foodItem.donatedBy.type})
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-2 flex-grow">
              <p className="flex items-center gap-2"><Package className="h-4 w-4 text-accent" /> Quantity: {pickup.foodItem.quantity}</p>
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Location: {pickup.foodItem.donatedBy.address}</p>
              <p>Requested: {format(pickup.requestTimestamp, "PPP p")}</p>
              {pickup.pickupTimestamp && pickup.status === 'PickedUp' && (
                <p>Picked Up: {format(pickup.pickupTimestamp, "PPP p")}</p>
              )}
               {pickup.pickupTimestamp && pickup.status === 'Confirmed' && (
                <p className="font-semibold text-green-600">Scheduled Pickup: {format(pickup.pickupTimestamp, "PPP p")}</p>
              )}
            </CardContent>
            <CardFooter>
              <Select
                value={pickup.status}
                onValueChange={(newStatus) => handleStatusChange(pickup.id, newStatus as PickupStatus)}
                disabled={pickup.status === 'PickedUp' || pickup.status === 'Cancelled'}
              >
                <SelectTrigger className="w-full" aria-label={`Change status for ${pickup.foodItem.name}`}>
                  <SelectValue placeholder="Update Status" />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(statusIcons) as PickupStatus[]).map(s => (
                     <SelectItem key={s} value={s} disabled={
                        (pickup.status === 'Pending' && (s === 'PickedUp')) || // Can't go from Pending to PickedUp directly
                        (pickup.status === 'Confirmed' && (s === 'Pending')) || // Can't go back to Pending from Confirmed
                        (pickup.status === s) // Disable current status
                     }>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
