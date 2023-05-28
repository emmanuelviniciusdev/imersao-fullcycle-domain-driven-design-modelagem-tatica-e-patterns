import CustomerInterface from '../entity/customer.interface'
import Customer from '../entity/customer'
import uuid from 'uuid'
import Address from '../value-object/address'

export default class CustomerFactory {
    static createActivatedCustomer(
        name: string,
        address: Address
    ): CustomerInterface {
        return new Customer(uuid.v4(), name, address, true)
    }

    static createDeactivatedCustomer(name: string): CustomerInterface {
        return new Customer(uuid.v4(), name)
    }
}
