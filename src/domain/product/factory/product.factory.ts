import Product from '../entity/product'
import uuid from 'uuid'
import ProductInterface from '../entity/product.interface'
import ProductB from '../entity/product-b'

export default class ProductFactory {
    static create(
        name: string,
        price: number,
        type: 'Regular' | 'B'
    ): ProductInterface {
        const invalidType = !['Regular', 'B'].includes(type)

        if (invalidType) {
            throw new Error('Invalid product type')
        }

        return type === 'Regular'
            ? new Product(uuid.v4(), name, price)
            : new ProductB(uuid.v4(), name, price)
    }
}
