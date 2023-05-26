import OrderRepositoryInterface from '../../domain/repository/order.repository.interface'
import Order from '../../domain/entity/order'
import OrderModel from '../database/sequelize/model/order.model'
import OrderItem from '../../domain/entity/order-item'
import OrderItemModel from '../database/sequelize/model/order-item.model'

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total,
                items: entity.items.map((orderItem) => ({
                    id: orderItem.id,
                    order_id: entity.id,
                    product_id: orderItem.productId,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                })),
            },
            { include: [{ model: OrderItemModel }] }
        )
    }

    async find(id: string): Promise<Order> {
        const orderResult = await OrderModel.findOne({
            where: { id },
            include: [{ model: OrderItemModel }],
        })

        if (!orderResult) {
            throw new Error(`Order with ID ${id} not found`)
        }

        const orderData = orderResult.toJSON()

        const orderItems = orderData.items.map(
            (item: any) =>
                new OrderItem(
                    item.id,
                    item.name,
                    item.price,
                    item.product_id,
                    item.quantity
                )
        )

        return new Order(orderData.id, orderData.customer_id, orderItems)
    }

    async findAll(): Promise<Order[]> {
        const allOrdersResult = await OrderModel.findAll({
            include: [{ model: OrderItemModel }],
        })

        const allOrdersData = allOrdersResult.map((r) => r.toJSON())

        return allOrdersData.map((orderData) => {
            const orderItems = orderData.items.map(
                (item: any) =>
                    new OrderItem(
                        item.id,
                        item.name,
                        item.price,
                        item.product_id,
                        item.quantity
                    )
            )

            return new Order(orderData.id, orderData.customer_id, orderItems)
        })
    }

    async update(entity: Order, orderItems?: OrderItem[]): Promise<void> {
        await OrderModel.update(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total,
            },
            { where: { id: entity.id } }
        )

        const allOrderItemsData = orderItems?.map((orderItem) => ({
            id: orderItem.id,
            order_id: entity.id,
            product_id: orderItem.productId,
            name: orderItem.name,
            price: orderItem.price,
            quantity: orderItem.quantity,
        }))

        for (const orderItemData of allOrderItemsData) {
            await OrderItemModel.update(orderItemData, {
                where: { id: orderItemData.id },
            })
        }
    }
}
