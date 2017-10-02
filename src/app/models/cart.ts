import { Product } from './product';

export interface Cart {
    items: CartItem[];
}

export interface CartItem {
    product: Product;
    quantity: number;
}
