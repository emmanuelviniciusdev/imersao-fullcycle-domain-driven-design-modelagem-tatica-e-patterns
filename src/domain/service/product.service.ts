import Product from '../entity/product'

export default class ProductService {
    static increasePrices(products: Product[], percentage: number) {
        for (const product of products) {
            const newPrice = product.price + product.price * percentage
            product.changePrice(newPrice)
        }
    }
}
