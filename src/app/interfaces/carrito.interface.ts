import { Product } from '../models/product.model';

export interface _payments {
    type: string;
    amount: number;
    description?: string;
}

export interface Carrito{
    qty: number;
    product: string;
    price: number;
    producto?: Product;
    _id?: string;
}