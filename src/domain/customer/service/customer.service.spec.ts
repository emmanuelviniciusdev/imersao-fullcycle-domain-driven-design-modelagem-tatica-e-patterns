import Address from '../value-object/address'
import { CustomerService } from './customer.service'
import Customer from '../entity/customer'
import CustomerUpdatedEvent from '../event/customer-updated.event'
import CustomerCreatedEvent from '../event/customer-created.event'

jest.mock('uuid', () => ({ v4: () => 'random-uuid-v4' }))

jest.useFakeTimers().setSystemTime(new Date('2001-01-01'))

describe('CustomerService Unit Tests', () => {
    it('should successfully update a customer', () => {
        const spyEventDispatcherNotify = jest.spyOn(
            CustomerService.eventDispatcher,
            'notify'
        )

        const address = new Address('Street X', '1', '00000-00', 'Montreal')

        const customer = new Customer('1', 'Emmanuel Vinícius', address)

        const newAddress = new Address('Street Y', '2', '11111-11', 'Montreal')

        CustomerService.updateCustomerAddress(customer, newAddress)

        expect(spyEventDispatcherNotify).toHaveBeenCalledTimes(1)

        expect(spyEventDispatcherNotify).toHaveBeenCalledWith(
            'CustomerUpdatedEvent',
            new CustomerUpdatedEvent({
                customerId: customer.id,
                customerName: customer.name,
                newAddress,
            })
        )

        expect(customer.id).toBe('1')
        expect(customer.name).toBe('Emmanuel Vinícius')
        expect(customer.address).toEqual(newAddress)
    })

    it('should successfully create a customer', () => {
        const spyEventDispatcherNotify = jest.spyOn(
            CustomerService.eventDispatcher,
            'notify'
        )

        const address = new Address('Street X', '1', '00000-00', 'Montreal')

        const customer = CustomerService.createCustomer(
            'Emmanuel Vinícius',
            address
        )

        expect(spyEventDispatcherNotify).toHaveBeenCalledTimes(1)

        expect(spyEventDispatcherNotify).toHaveBeenCalledWith(
            'CustomerCreatedEvent',
            new CustomerCreatedEvent({ customer })
        )

        expect(customer.id).toBe('random-uuid-v4')
        expect(customer.name).toBe('Emmanuel Vinícius')
        expect(customer.address).toEqual(address)
    })
})
