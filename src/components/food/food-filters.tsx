"use client";

import React from 'react';
import type { FoodCategory } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export type SortOption = 'expiryDate-asc' | 'expiryDate-desc' | 'proximity-asc' | 'proximity-desc';

interface FoodFiltersProps {
  categories: FoodCategory[];
  selectedCategories: FoodCategory[];
  onCategoryChange: (selected: FoodCategory[]) => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

export function FoodFilters({
  categories,
  selectedCategories,
  onCategoryChange,
  sortOption,
  onSortChange,
}: FoodFiltersProps) {
  
  const handleCategoryToggle = (category: FoodCategory) => {
    const newSelected = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    onCategoryChange(newSelected);
  };

  return (
    <Card className="shadow-md sticky top-24"> {/* Added sticky for better UX on scroll */}
      <CardContent className="pt-6 space-y-6">
        <div>
          <h3 className="text-md font-semibold mb-3 text-foreground">Sort By</h3>
          <Select value={sortOption} onValueChange={(value) => onSortChange(value as SortOption)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort listings" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="expiryDate-asc">Expiry Date (Soonest)</SelectItem>
              <SelectItem value="expiryDate-desc">Expiry Date (Latest)</SelectItem>
              <SelectItem value="proximity-asc">Proximity (Nearest)</SelectItem>
              <SelectItem value="proximity-desc">Proximity (Farthest)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Separator />

        <div>
          <h3 className="text-md font-semibold mb-3 text-foreground">Filter by Category</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                  aria-label={`Filter by ${category}`}
                />
                <Label htmlFor={`cat-${category}`} className="font-normal text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
