"use client";

import React, { useState, useEffect } from 'react';
import type { DeliveryLog } from '@/lib/types';
import { mockDeliveryLogs } from '@/lib/placeholder-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Users, HandHeart, CalendarDays } from 'lucide-react';
import { format } from 'date-fns';
import { AlertTriangle } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function DeliveryLogClient() {
  const [logs, setLogs] = useState<DeliveryLog[]>([]);

  useEffect(() => {
    // Simulate fetching data
    setLogs(mockDeliveryLogs.sort((a,b) => b.deliveryTimestamp.getTime() - a.deliveryTimestamp.getTime()));
  }, []);

  if (logs.length === 0) {
    return (
      <div className="text-center py-10">
        <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-xl text-muted-foreground">No delivery logs found yet.</p>
        <p className="text-md text-muted-foreground mt-2">Completed deliveries will appear here.</p>
      </div>
    );
  }

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">Delivery History</CardTitle>
        <CardDescription>Browse through the records of all completed food donations.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-[600px] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30%]">Food Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Donated By</TableHead>
                <TableHead>Received By (NGO)</TableHead>
                <TableHead className="text-right">Date Delivered</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium text-foreground">{log.foodItemName}</TableCell>
                  <TableCell>{log.quantity}</TableCell>
                  <TableCell className="text-muted-foreground">{log.donatedBy}</TableCell>
                  <TableCell className="text-muted-foreground">{log.receivedBy}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{format(log.deliveryTimestamp, "PP")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
           <ScrollBar orientation="vertical" />
        </ScrollArea>
         {logs.length === 0 && <p className="text-center text-muted-foreground py-4">No deliveries logged yet.</p>}
      </CardContent>
    </Card>
  );
}
