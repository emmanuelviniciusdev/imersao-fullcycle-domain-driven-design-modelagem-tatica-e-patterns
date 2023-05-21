import uuid from 'uuid'

import Order from '../entity/order'
import Customer from '../entity/customer'
import OrderItem from '../entity/order-item'

export default class OrderService {
    static createOrder(customer: Customer, orderItems: OrderItem[]) {
        const order = new Order(uuid.v4(), customer.id, orderItems)

        const rewardPoints = order.total / 2

        customer.addRewardPoints(rewardPoints)

        return order
    }

    static getTotalPriceOrders(orders: Order[]) {
        return orders.reduce((acc, order) => acc + order.total, 0)
    }
}
