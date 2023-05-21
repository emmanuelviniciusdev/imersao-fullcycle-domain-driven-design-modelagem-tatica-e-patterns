import Order from '../entity/order'
import OrderItem from '../entity/order-item'
import OrderService from './order.service'
import Customer from '../entity/customer'

jest.mock('uuid', () => ({ v4: () => 'random-uuid-v4' }))

describe('OrderService Unit Tests', () => {
    it('should create an order, successfully calculating reward points and defining it to customer', () => {
        const orderItems = [
            new OrderItem('1', 'Pumpkin', 0.8, '1', 5),
            new OrderItem('2', 'Apple', 0.5, '2', 5),
            new OrderItem('3', 'Strawberries', 1, '3', 2),
            new OrderItem('4', 'Avocado', 0.75, '4', 2),
        ]

        const customer = new Customer('1', 'Emmanuel Vinícius')

        const order = OrderService.createOrder(customer, orderItems)

        expect(order.total).toBe(10)
        expect(customer.rewardPoints).toBe(5)
    })

    it('should correctly calculate the total price of many orders', () => {
        const orders = [
            new Order('1', '1', [
                new OrderItem('1', 'Pumpkin', 0.8, '1', 5),
                new OrderItem('2', 'Apple', 0.5, '2', 5),
            ]),
            new Order('2', '1', [
                new OrderItem('3', 'Strawberries', 1, '3', 2),
                new OrderItem('4', 'Avocado', 0.75, '4', 2),
            ]),
        ]

        const totalPrice = OrderService.getTotalPriceOrders(orders)

        expect(totalPrice).toBe(10)
    })
})
