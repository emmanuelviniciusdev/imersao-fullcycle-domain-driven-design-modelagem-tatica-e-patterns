import OrderFactory from './order.factory'

jest.mock('uuid', () => ({ v4: () => 'random-uuid-v4' }))

describe('OrderFactory Unit Tests', () => {
    it('should create an order', () => {
        const orderProps = {
            customerId: '5be31c1a-f3f3-40cf-abf0-2cf9b2966559',
            items: [
                {
                    name: 'Pumpkin',
                    productId: '1a3efe2c-5460-437a-956a-154e2a93021a',
                    quantity: 2,
                    price: 0.8,
                },
            ],
        }

        const order = OrderFactory.create(orderProps)

        expect(order.id).toBeDefined()
        expect(order.customerId).toBe(orderProps.customerId)
        expect(order.items).toHaveLength(1)
    })
})
