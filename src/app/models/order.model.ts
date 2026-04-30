import { IceCream } from './ice-cream.model';

export interface OrderItem {
  id: number;
  quantity: number;
  priceAtTime: string;
  iceCream: IceCream;
}

export interface Order {
  id: number;
  items: OrderItem[];
  totalPrice: string;
  createdAt: string;
}

export interface CreateOrderItem {
  iceCreamId: number;
  quantity: number;
}
