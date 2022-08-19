import { Categories } from './categories';

export class Items {
    _id: string;
    item_name: string;
    category: Categories;
    price: number;
    quantity: number;

    constructor(_id?: string, item_name?: string, category?: Categories, price?: number, quantity?: number) {
        this._id = _id!;
        this.item_name = item_name!;
        this.category = category!;
        this.price = price!;
        this.quantity = quantity!;
    }
}

