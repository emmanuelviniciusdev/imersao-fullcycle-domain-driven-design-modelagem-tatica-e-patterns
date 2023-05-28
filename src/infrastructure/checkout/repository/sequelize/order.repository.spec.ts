import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../../../product/repository/sequelize/product.model'
import OrderModel from './order.model'
import OrderItemModel from './order-item.model'
import CustomerModel from '../../../customer/repository/sequelize/customer.model'
import CustomerRepository from '../../../customer/repository/sequelize/customer.repository'
import ProductRepository from '../../../product/repository/sequelize/product.repository'
import OrderRepository from './order.repository'
import Customer from '../../../../domain/customer/entity/customer'
import Address from '../../../../domain/customer/value-object/address'
import Product from '../../../../domain/product/entity/product'
import OrderItem from '../../../../domain/checkout/entity/order-item'
import Order from '../../../../domain/checkout/entity/order'

describe('OrderRepository Integration Tests', () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        })

        sequelize.addModels([
            OrderModel,
            OrderItemModel,
            ProductModel,
            CustomerModel,
        ])

        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    async function assertManyOrdersCreationAndFind() {
        const customerRepository = new CustomerRepository()
        const productRepository = new ProductRepository()
        const orderRepository = new OrderRepository()

        const customer = new Customer(
            '9aad6b66-3688-4ff6-bf8b-f4c4c6b73710',
            'Emmanuel',
            new Address('Street X', '1', '00000-00', 'Montreal'),
            true
        )

        await customerRepository.create(customer)

        const products = [
            new Product('c324d38b-4ea5-443a-955d-0d9c91747dea', 'Pumpkin', 0.8),
            new Product('aa9e6df5-5694-4d5c-9410-180626e9b397', 'Grapes', 1.2),
            new Product('4ed807c8-2c63-4f83-b11f-a3aab241ebe2', 'Apple', 0.5),
        ]

        await Promise.all(products.map((p) => productRepository.create(p)))

        const orderItems = [
            new OrderItem(
                'f348af30-ec80-40fc-b7a2-6a8768bcce63',
                products[0].name,
                products[0].price,
                products[0].id,
                1
            ),
            new OrderItem(
                'd8a03503-c897-4783-9615-030d37adeab7',
                products[1].name,
                products[1].price,
                products[1].id,
                2
            ),
            new OrderItem(
                '0266cb1e-3d82-46b8-b551-8b0e407f6e92',
                products[2].name,
                products[2].price,
                products[2].id,
                4
            ),
        ]

        const orders = [
            new Order('36b0ce15-c4b2-489c-a72e-549bfc26638a', customer.id, [
                orderItems[0],
            ]),
            new Order('a488d6d0-f087-436e-a51b-4ba4e05b4694', customer.id, [
                orderItems[1],
                orderItems[2],
            ]),
        ]

        await Promise.all(orders.map((order) => orderRepository.create(order)))

        const allFoundOrders = await orderRepository.findAll()

        expect(allFoundOrders).toHaveLength(2)

        for (const foundOrder of allFoundOrders) {
            const order = orders.find((o) => o.id === foundOrder.id)

            expect(foundOrder.id).toBe(order.id)
            expect(foundOrder.customerId).toBe(order.customerId)
            expect(foundOrder.total).toBe(order.total)

            for (const foundOrderItem of foundOrder.items) {
                const orderItem = order.items.find(
                    (i) => i.id === foundOrderItem.id
                )

                expect(foundOrderItem.id).toBe(orderItem.id)
                expect(foundOrderItem.name).toBe(orderItem.name)
                expect(foundOrderItem.price).toBe(orderItem.price)
                expect(foundOrderItem.quantity).toBe(orderItem.quantity)
                expect(foundOrderItem.totalPrice).toBe(orderItem.totalPrice)
                expect(foundOrderItem.productId).toBe(orderItem.productId)
            }
        }
    }

    async function assertOrderCreationAndFind() {
        const customerRepository = new CustomerRepository()
        const productRepository = new ProductRepository()
        const orderRepository = new OrderRepository()

        const customer = new Customer(
            '9aad6b66-3688-4ff6-bf8b-f4c4c6b73710',
            'Emmanuel',
            new Address('Street X', '1', '00000-00', 'Montreal'),
            true
        )

        await customerRepository.create(customer)

        const product = new Product(
            'c324d38b-4ea5-443a-955d-0d9c91747dea',
            'Pumpkin',
            0.8
        )

        await productRepository.create(product)

        const orderItem = new OrderItem(
            '3baf38df-c986-4fa3-a40c-f560ee25d597',
            product.name,
            product.price,
            product.id,
            3
        )

        const order = new Order(
            '36b0ce15-c4b2-489c-a72e-549bfc26638a',
            customer.id,
            [orderItem]
        )

        await orderRepository.create(order)

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ['items'],
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: order.customerId,
            total: order.total,
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    product_id: orderItem.productId,
                    order_id: order.id,
                },
            ],
        })

        return order
    }

    it('should create an order successfully', async () => {
        await assertOrderCreationAndFind()
    })

    it('should throw an error if order was not found in the database', async () => {
        const orderRepository = new OrderRepository()

        await expect(
            async () => await orderRepository.find('foo')
        ).rejects.toThrowError('Order with ID foo not found')
    })

    it('should find an order by ID', async () => {
        const orderRepository = new OrderRepository()

        const order = await assertOrderCreationAndFind()

        const foundOrder = await orderRepository.find(order.id)

        expect(foundOrder).toEqual(order)
    })

    it('should find all orders', async () => {
        await assertManyOrdersCreationAndFind()
    })

    it('update an order and its items successfully', async () => {
        const order = await assertOrderCreationAndFind()

        const orderRepository = new OrderRepository()
        const customerRepository = new CustomerRepository()

        const newCustomer = new Customer(
            '55ede6ce-2e9b-4b8a-8b83-834f6737d1ea',
            'Maria',
            new Address('Street Y', '2', '11111-11', 'Montreal'),
            true
        )

        await customerRepository.create(newCustomer)

        const newOrderItemName = `${order.items[0].name} (Edited)`

        order.changeCustomerId(newCustomer.id)
        order.items[0].changeName(newOrderItemName)

        await orderRepository.update(order, order.items)

        const updatedOrder = await orderRepository.find(order.id)

        expect(updatedOrder.customerId).toBe(newCustomer.id)
        expect(updatedOrder.items[0].name).toBe(newOrderItemName)
    })
})
