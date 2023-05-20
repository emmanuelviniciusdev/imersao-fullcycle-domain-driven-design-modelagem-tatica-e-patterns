import Address from '../value-object/address'

/**
 * Entidade anêmica
 */
export default class Customer {
    private _id: string
    private _name: string
    private _address: Address

    constructor(id: string, name: string, address: Address) {
        this._id = id
        this._name = name
        this._address = address
    }

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    get address(): Address {
        return this._address
    }
}
