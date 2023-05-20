import Product from '../entity/product'
import ProductService from './product.service'

describe('ProductService Unit Tests', () => {
    it('should successfully increase the price of products by a percentage', () => {
        const products = [
            new Product('1', 'Pumpkin', 0.8),
            new Product('2', 'Grapes', 1.2),
            new Product('3', 'Apple', 0.5),
        ]

        const mapProductIdToOldPrice: any = products.reduce(
            (acc, product) => ({ ...acc, [product.id]: product.price }),
            {}
        )

        const increasePercentage = 0.2

        ProductService.increasePrices(products, increasePercentage)

        for (const product of products) {
            const oldPrice = mapProductIdToOldPrice[product.id]
            const newPrice = oldPrice + oldPrice * increasePercentage

            expect(product.price).toBe(newPrice)
        }
    })
})
