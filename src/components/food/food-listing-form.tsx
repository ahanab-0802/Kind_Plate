"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import type { FoodItem, FoodCategory } from "@/lib/types";
import { foodCategories } from "@/lib/placeholder-data"; // Assuming this exists with categories
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  quantity: z.string().min(1, "Quantity is required."),
  expiryDate: z.date({ required_error: "Expiry date is required." }),
  category: z.enum(foodCategories as [string, ...string[]], { // Cast to satisfy enum type
    required_error: "Category is required.",
  }),
  location: z.string().min(5, "Location is required e.g. 'Cooler #3' or 'Pantry Shelf B'"),
});

interface FoodListingFormProps {
  onSubmitSuccess: (newItem: FoodItem) => void;
}

export function FoodListingForm({ onSubmitSuccess }: FoodListingFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      quantity: "",
      category: undefined,
      location: "",
    },
  });

  // Simulate server action
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("New food listing:", values);
    // Simulate API call and get back a new item
    const newItem: FoodItem = {
      id: `food-${Date.now()}`,
      ...values,
      imageUrl: "https://placehold.co/600x400.png", // Default placeholder
      donatedBy: { id: 'currentUser', name: 'Current User', type: 'Restaurant', address: '123 Current St' }, // Mock current user
      status: "Available",
      expiryDate: values.expiryDate,
    };
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSubmitSuccess(newItem);

    toast({
      title: "Food Item Listed!",
      description: `${values.name} has been successfully added to the listings.`,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Food Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Fresh Bananas, Vegetable Curry" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Provide details about the item, condition, ingredients if applicable." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 5 kg, 10 boxes, 20 meals" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {foodCategories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Expiry Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date(new Date().setHours(0,0,0,0)) } // Disable past dates
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pickup Location Details</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Back kitchen, ask for manager" {...field} />
              </FormControl>
              <FormDescription>Specific instructions for pickup at your address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={form.formState.isSubmitting}>
           {form.formState.isSubmitting ? "Submitting..." : "List Item"}
        </Button>
      </form>
    </Form>
  );
}
