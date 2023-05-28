import Product from './product'

export default class ProductB extends Product {
    constructor(id: string, name: string, price: number) {
        super(id, name, price)
    }

    get price() {
        return this._price * 2
    }
}
