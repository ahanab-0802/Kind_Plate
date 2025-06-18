export type UserType = "Restaurant" | "Household" | "NGO";

export interface User {
  id: string;
  type: UserType;
  name: string;
  email: string;
  address: string;
}

export type FoodCategory = "Fruits" | "Vegetables" | "Baked Goods" | "Dairy" | "Meats" | "Meals" | "Other";

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  quantity: string; // e.g., "10 kgs", "5 boxes"
  expiryDate: Date;
  imageUrl?: string;
  category: FoodCategory;
  donatedBy: Pick<User, "id" | "name" | "type" | "address">; // Store partial donor info
  status: "Available" | "Reserved" | "PickedUp";
  location: string; // Could be derived from user's address or specified
}

export type PickupStatus = "Pending" | "Confirmed" | "PickedUp" | "Cancelled";

export interface PickupRequest {
  id: string;
  foodItem: Pick<FoodItem, "id" | "name" | "quantity" | "category" | "donatedBy">;
  requestedBy: Pick<User, "id" | "name" | "type">; // NGO details
  requestTimestamp: Date;
  pickupTimestamp?: Date;
  status: PickupStatus;
}

export interface DeliveryLog {
  id: string;
  foodItemName: string;
  quantity: string;
  donatedBy: string; // Name of restaurant/household
  receivedBy: string; // Name of NGO
  deliveryTimestamp: Date;
}
