export interface Flower {
  id: string;
  name: string;
  price: number;
  tags: string; // e.g., "Dusty Pink & Cream"
  description: string;
  image: string;
  colors: string[]; // e.g., ["#F5E6E8", "#FFFDF9", "#7B5455"]
  colorNames?: string[]; // e.g. ["Dusty Pink", "Cream White", "Deep Mauve"]
  category: 'Sympathy' | 'Romance' | 'Celebration' | 'Housewarming' | 'All';
  isCustom?: boolean;
}

export interface CartItem {
  flower: Flower;
  quantity: number;
  selectedColor: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Delivered' | 'Shipped';
  customerName: string;
  address: string;
}
