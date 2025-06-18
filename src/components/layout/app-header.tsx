"use client";

import Link from 'next/link';
import { HandHeart, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from 'react';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/listings", label: "Food Listings" },
  { href: "/pickups", label: "Pickup Board" },
  { href: "/deliveries", label: "Delivery Logs" },
  { href: "/register", label: "Register" },
];

export function AppHeader() {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors">
          <HandHeart className="h-8 w-8" />
          <span className="text-2xl font-headline font-bold">SharePlate</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" asChild>
              <Link href={link.href} className="text-sm lg:text-base font-medium text-foreground hover:text-primary transition-colors">
                {link.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="h-5 w-5 text-foreground hover:text-primary transition-colors" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>No new notifications</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6 text-foreground hover:text-primary transition-colors" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col space-y-4 p-4">
                  <Link href="/" className="flex items-center gap-2 text-primary mb-4" onClick={() => setIsSheetOpen(false)}>
                    <HandHeart className="h-7 w-7" />
                    <span className="text-xl font-headline font-bold">SharePlate</span>
                  </Link>
                  {navLinks.map((link) => (
                    <Button key={link.href} variant="ghost" className="justify-start" asChild>
                       <Link href={link.href} onClick={() => setIsSheetOpen(false)} className="text-base font-medium text-foreground hover:text-primary transition-colors">
                        {link.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
