export default class Address {
    private _street: string = ''
    private _number: string = ''
    private _zipCode: string = ''
    private _city: string = ''

    constructor(street: string, number: string, zipCode: string, city: string) {
        this._street = street
        this._number = number
        this._zipCode = zipCode
        this._city = city
    }

    validate() {
        if (!this._street) {
            throw new Error('street is required')
        }

        if (!this._number) {
            throw new Error('number is required')
        }

        if (!this._zipCode) {
            throw new Error('zipCode is required')
        }

        if (!this._city) {
            throw new Error('city is required')
        }
    }

    toString() {
        return `${this._zipCode}: ${this._street}, ${this._number}, ${this._city}`
    }
}
