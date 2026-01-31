import { Product } from './product.model';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}
