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

    get street() {
        return this._street
    }

    get number() {
        return this._number
    }

    get zipCode() {
        return this._zipCode
    }

    get city() {
        return this._city
    }

    get isNotEmpty() {
        return !this.isEmpty
    }

    get isEmpty() {
        return !this._street && !this._number && !this._zipCode && !this._city
    }

    toString() {
        return `${this._zipCode}: ${this._street}, ${this._number}, ${this._city}`
    }
}
