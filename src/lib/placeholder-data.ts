import type { FoodItem, PickupRequest, DeliveryLog, User, FoodCategory } from './types';

const mockUsers: User[] = [
  { id: 'user1', type: 'Restaurant', name: 'The Gourmet Place', email: 'gourmet@example.com', address: '123 Main St, Anytown' },
  { id: 'user2', type: 'Household', name: 'Jane Doe', email: 'jane@example.com', address: '456 Oak Ave, Anytown' },
  { id: 'user3', type: 'NGO', name: 'Community Food Bank', email: 'foodbank@example.com', address: '789 Pine Rd, Anytown' },
  { id: 'user4', type: 'Restaurant', name: 'Quick Bites Cafe', email: 'quickbites@example.com', address: '101 Maple Dr, Anytown'},
  { id: 'user5', type: 'NGO', name: 'Helping Hands Org', email: 'helpinghands@example.com', address: '202 Birch Ln, Anytown'},
];

export const mockFoodItems: FoodItem[] = [
  {
    id: 'food1',
    name: 'Fresh Apples',
    description: 'A box of crisp, juicy apples.',
    quantity: '10 kg',
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 3)),
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Fruits',
    donatedBy: mockUsers[0],
    status: 'Available',
    location: mockUsers[0].address,
  },
  {
    id: 'food2',
    name: 'Day-old Bread Loaves',
    description: 'Various types of artisan bread, baked yesterday.',
    quantity: '20 loaves',
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Baked Goods',
    donatedBy: mockUsers[3],
    status: 'Available',
    location: mockUsers[3].address,
  },
  {
    id: 'food3',
    name: 'Mixed Vegetables',
    description: 'Assorted seasonal vegetables.',
    quantity: '5 boxes',
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Vegetables',
    donatedBy: mockUsers[1],
    status: 'Reserved',
    location: mockUsers[1].address,
  },
  {
    id: 'food4',
    name: 'Canned Soups',
    description: 'Variety pack of canned soups.',
    quantity: '2 cartons (24 cans)',
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Other',
    donatedBy: mockUsers[0],
    status: 'Available',
    location: mockUsers[0].address,
  },
];

export const mockPickupRequests: PickupRequest[] = [
  {
    id: 'pickup1',
    foodItem: mockFoodItems[2], // Mixed Vegetables
    requestedBy: mockUsers[2], // Community Food Bank
    requestTimestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
    status: 'Confirmed',
    pickupTimestamp: new Date(new Date().setDate(new Date().getDate() + 1)),
  },
  {
    id: 'pickup2',
    foodItem: mockFoodItems[1], // Day-old Bread
    requestedBy: mockUsers[4], // Helping Hands Org
    requestTimestamp: new Date(),
    status: 'Pending',
  },
  {
    id: 'pickup3',
    foodItem: mockFoodItems[0], // Fresh Apples
    requestedBy: mockUsers[2], // Community Food Bank
    requestTimestamp: new Date(new Date().setDate(new Date().getDate() - 2)),
    status: 'PickedUp',
    pickupTimestamp: new Date(new Date().setDate(new Date().getDate() -1)),
  },
];

export const mockDeliveryLogs: DeliveryLog[] = [
  {
    id: 'log1',
    foodItemName: 'Assorted Pastries',
    quantity: '3 boxes',
    donatedBy: 'The Sweet Spot Bakery',
    receivedBy: 'Shelter of Hope',
    deliveryTimestamp: new Date(new Date().setDate(new Date().getDate() - 2)),
  },
  {
    id: 'log2',
    foodItemName: 'Fresh Apples (from mock)',
    quantity: mockFoodItems[0].quantity,
    donatedBy: mockFoodItems[0].donatedBy.name,
    receivedBy: mockUsers[2].name, // Community Food Bank
    deliveryTimestamp: new Date(new Date().setDate(new Date().getDate() -1)),
  },
  {
    id: 'log3',
    foodItemName: 'Leftover Catering: Chicken & Rice',
    quantity: '15 meals',
    donatedBy: 'Events & Co. Catering',
    receivedBy: 'Helping Hands Org',
    deliveryTimestamp: new Date(new Date().setDate(new Date().getDate() - 5)),
  },
];

export const foodCategories: FoodCategory[] = ["Fruits", "Vegetables", "Baked Goods", "Dairy", "Meats", "Meals", "Other"];
