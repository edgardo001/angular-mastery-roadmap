export interface Order {
  id: string;
  productId: string;
  quantity: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'cancelled';
  createdAt: Date;
}

export interface InventoryItem {
  id: string;
  productId: string;
  name: string;
  stock: number;
  price: number;
}

export interface Invoice {
  id: string;
  orderId: string;
  amount: number;
  paid: boolean;
  issuedAt: Date;
}
