export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface Order {
  id: number;
  userId: number;
  product: string;
  quantity: number;
  total: number;
  status: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

export interface BffDashboardData {
  user: User;
  orders: Order[];
  products: Product[];
  summary: {
    totalOrders: number;
    totalRevenue: number;
    lowStockProducts: number;
  };
}
