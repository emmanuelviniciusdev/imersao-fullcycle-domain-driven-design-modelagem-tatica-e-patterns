import Product from './product'

describe('Product Unit Tests', () => {
    it('should throw an error if ID is empty', () => {
        expect(() => new Product('', 'Pumpkin', 1.2)).toThrowError(
            'ID is required'
        )
    })

    it('should throw an error if name is empty', () => {
        expect(() => new Product('1', '', 0)).toThrowError('Name is required')
    })

    it('should throw an error if price is not greater than 0', () => {
        expect(() => new Product('1', 'Pumpkin', 0)).toThrowError(
            'Price must be greater than 0'
        )

        expect(() => new Product('1', 'Pumpkin', -1.5)).toThrowError(
            'Price must be greater than 0'
        )
    })
})
