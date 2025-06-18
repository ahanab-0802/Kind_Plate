"use client";

import React, { useState, useEffect, useMemo } from 'react';
import type { FoodItem, FoodCategory } from '@/lib/types';
import { mockFoodItems, foodCategories } from '@/lib/placeholder-data';
import { FoodCard } from './food-card';
import { FoodFilters, SortOption } from './food-filters';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FoodListingForm } from './food-listing-form';
import { PlusCircle, ListFilter } from 'lucide-react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function FoodListingsClient() {
  const [listings, setListings] = useState<FoodItem[]>([]);
  const [filteredListings, setFilteredListings] = useState<FoodItem[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<FoodCategory[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('expiryDate-asc');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    // Simulate fetching data
    setListings(mockFoodItems);
  }, []);

  useEffect(() => {
    let items = [...listings];

    // Filter by category
    if (selectedCategories.length > 0) {
      items = items.filter(item => selectedCategories.includes(item.category));
    }

    // Sort items
    // Proximity sorting is mocked as we don't have real location data/calculations
    if (sortOption === 'proximity-asc') {
      items.sort((a, b) => (Math.random() - 0.5)); // Mock proximity
    } else if (sortOption === 'proximity-desc') {
      items.sort((a, b) => (Math.random() - 0.5)); // Mock proximity
    } else if (sortOption === 'expiryDate-asc') {
      items.sort((a, b) => a.expiryDate.getTime() - b.expiryDate.getTime());
    } else if (sortOption === 'expiryDate-desc') {
      items.sort((a, b) => b.expiryDate.getTime() - a.expiryDate.getTime());
    }
    
    setFilteredListings(items);
  }, [listings, selectedCategories, sortOption]);

  const handleAddNewItem = (newItem: FoodItem) => {
    setListings(prev => [newItem, ...prev]);
    setIsFormOpen(false); // Close dialog after submission
  };
  
  const FilterComponentContent = () => (
     <FoodFilters
        categories={foodCategories}
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />
  );


  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="sm:hidden w-full">
            <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" className="w-full">
                        <ListFilter className="mr-2 h-4 w-4" /> Filters & Sort
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px]">
                    <SheetHeader>
                        <SheetTitle>Filters & Sort</SheetTitle>
                    </SheetHeader>
                    <ScrollArea className="h-[calc(100vh-80px)]">
                      <div className="p-4">
                        <FilterComponentContent />
                      </div>
                      <ScrollBar orientation="vertical" />
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </div>
        <div className="hidden sm:block sm:w-1/4 min-w-[250px]">
          <h2 className="text-xl font-semibold mb-2 text-primary">Filters & Sort</h2>
          <FilterComponentContent />
        </div>
        
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground fixed bottom-4 right-4 sm:static z-50 shadow-lg sm:shadow-none rounded-full sm:rounded-md p-4 sm:p-2">
              <PlusCircle className="h-6 w-6 sm:mr-2" /> <span className="hidden sm:inline">Add New Listing</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl text-primary">List New Food Item</DialogTitle>
              <DialogDescription>
                Fill in the details of the surplus food item you want to share.
              </DialogDescription>
            </DialogHeader>
            <FoodListingForm onSubmitSuccess={handleAddNewItem} />
          </DialogContent>
        </Dialog>
      </div>

      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No food listings match your criteria or none available currently.</p>
          <p className="text-md text-muted-foreground mt-2">Try adjusting your filters or check back later!</p>
        </div>
      )}
    </div>
  );
}
