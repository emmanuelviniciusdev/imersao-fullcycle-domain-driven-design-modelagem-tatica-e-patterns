import OrderInterface from '../entity/order.interface'
import OrderItem from '../entity/order-item'
import Order from '../entity/order'
import uuid from 'uuid'

interface OrderFactoryProps {
    customerId: string
    items: {
        name: string
        productId: string
        quantity: number
        price: number
    }[]
}

export default class OrderFactory {
    static create(props: OrderFactoryProps): OrderInterface {
        const orderItems = props.items.map(
            (item) =>
                new OrderItem(
                    uuid.v4(),
                    item.name,
                    item.price,
                    item.productId,
                    item.quantity
                )
        )

        return new Order(uuid.v4(), props.customerId, orderItems)
    }
}
