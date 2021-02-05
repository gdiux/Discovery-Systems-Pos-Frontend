// MODELS
import { Client } from '../models/client.model';
import { Product } from '../models/product.model';
import { _payments } from './carrito.interface';

// INTERFACES INVOICE
interface _products{
    product: Product;
    qty: number;
    price: number;
}


export interface LoadInvoice {
    
    client: Client;
    type: string;
    amount: number;
    products: _products[];
    payments?: _payments;
    cash?: number;
    card?: number;
    vale?: number;
    credito?: boolean;
    status?: boolean;
    fecha?: Date;
    invoice?: number;

}
