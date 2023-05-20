import OrderItem from './order-item'

export default class Order {
    private _id: string
    private _customerId: string
    private _items: OrderItem[]

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id
        this._customerId = customerId
        this._items = items

        this._validate()
    }

    get total() {
        return this._items.reduce((acc, item) => acc + item.totalPrice, 0)
    }

    get id() {
        return this._id
    }

    get customerId() {
        return this._customerId
    }

    get items() {
        return this._items
    }

    private _validate() {
        if (!this._id) {
            throw new Error('ID is required')
        }

        if (!this._customerId) {
            throw new Error('Customer ID is required')
        }

        if (this._items.length === 0) {
            throw new Error('At least one order item must be specified')
        }
    }
}
