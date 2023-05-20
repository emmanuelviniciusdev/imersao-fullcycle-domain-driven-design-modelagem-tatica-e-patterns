export default class OrderItem {
    private _id: string
    private _name: string
    private _price: number
    private _quantity: number

    constructor(id: string, name: string, price: number, quantity = 1) {
        this._id = id
        this._name = name
        this._price = price
        this._quantity = quantity
    }

    get totalPrice() {
        return this._price * this._quantity
    }

    get id() {
        return this._id
    }

    get name() {
        return this._name
    }

    get price() {
        return this._price
    }

    get quantity() {
        return this._price
    }
}
