import Order from './order'
import OrderItem from './order-item'

describe('Order Unit Tests', () => {
    it('should throw an error if ID is empty', () => {
        const orderItems = [new OrderItem('1', 'Pumpkin', 1.2, '1')]

        expect(() => new Order('', '1', orderItems)).toThrowError(
            'ID is required'
        )
    })

    it('should throw an error if Customer ID is empty', () => {
        const orderItems = [new OrderItem('1', 'Pumpkin', 1.2, '1')]

        expect(() => new Order('1', '', orderItems)).toThrowError(
            'Customer ID is required'
        )
    })

    it('should throw an error if Order has no items', () => {
        expect(() => new Order('1', '1', [])).toThrowError(
            'At least one order item must be specified'
        )
    })

    it('should throw an error if the quantities of order items are invalid', () => {
        const orderItems = [
            new OrderItem('1', 'Pumpkin', 0.8, '1', 0),
            new OrderItem('2', 'Grapes', 1.2, '2', -1),
        ]

        expect(() => new Order('1', '1', orderItems)).toThrowError(
            'The quantity of order items must be greater than 0'
        )
    })

    it('should correctly calculate the order price', () => {
        const orderItems = [
            new OrderItem('1', 'Pumpkin', 0.8, '1'),
            new OrderItem('2', 'Grapes', 1.2, '2', 2),
            new OrderItem('3', 'Apple', 0.5, '3', 4),
        ]

        const order = new Order('1', '1', orderItems)

        expect(order.total).toBe(5.2)
    })
})
