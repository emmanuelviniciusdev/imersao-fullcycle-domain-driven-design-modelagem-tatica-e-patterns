import OrderItem from './order-item'

export default interface OrderInterface {
    get id(): string
    get customerId(): string
    get items(): OrderItem[]
    get total(): number

    changeItems(items: OrderItem[]): void
    changeCustomerId(customerId: string): void
}
