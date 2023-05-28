import ProductFactory from './product.factory'

jest.mock('uuid', () => ({ v4: () => 'random-uuid-v4' }))

describe('ProductFactory Unit Tests', () => {
    it('should create a regular product', () => {
        const product = ProductFactory.create('Pumpkin', 0.8, 'Regular')

        expect(product.id).toBeDefined()
        expect(product.name).toBe('Pumpkin')
        expect(product.price).toBe(0.8)
    })

    it('should create a B product', () => {
        const product = ProductFactory.create('Pumpkin', 0.8, 'B')

        expect(product.id).toBeDefined()
        expect(product.name).toBe('Pumpkin')
        expect(product.price).toBe(1.6)
    })

    it('should throw an error if product type is invalid', () => {
        expect(() =>
            ProductFactory.create('Pumpkin', 0.8, 'foo' as any)
        ).toThrow('Invalid product type')
    })
})
