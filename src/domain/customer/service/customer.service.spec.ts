import Address from '../value-object/address'
import { CustomerService } from './customer.service'
import { EventDispatcher } from '../../@shared/event/event-dispatcher'
import CustomerCreatedEvent from '../event/customer-created.event'
import Customer from '../entity/customer'
import CustomerUpdatedEvent from '../event/customer-updated.event'

var mockEventDispatcherNotify = jest.fn()

jest.mock('uuid', () => ({ v4: () => 'random-uuid-v4' }))

jest.mock('../../@shared/event/event-dispatcher', () => ({
    EventDispatcher: jest.fn().mockImplementation(() => ({
        notify: mockEventDispatcherNotify,
        register: jest.fn(),
    })),
}))

jest.useFakeTimers().setSystemTime(new Date('2001-01-01'))

describe('CustomerService Unit Tests', () => {
    it('should successfully update a customer', () => {
        const address = new Address('Street X', '1', '00000-00', 'Montreal')

        const customer = new Customer('1', 'Emmanuel Vinícius', address)

        const newAddress = new Address('Street Y', '2', '11111-11', 'Montreal')

        CustomerService.updateCustomerAddress(customer, newAddress)

        const eventDispatcher = new EventDispatcher()

        expect(eventDispatcher.notify).toHaveBeenCalledTimes(1)

        expect(eventDispatcher.notify).toHaveBeenCalledWith(
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
        const address = new Address('Street X', '1', '00000-00', 'Montreal')

        const customer = CustomerService.createCustomer(
            'Emmanuel Vinícius',
            address
        )

        const eventDispatcher = new EventDispatcher()

        expect(eventDispatcher.notify).toHaveBeenCalledTimes(1)

        expect(eventDispatcher.notify).toHaveBeenCalledWith(
            'CustomerCreatedEvent',
            new CustomerCreatedEvent({ customer })
        )

        expect(customer.id).toBe('random-uuid-v4')
        expect(customer.name).toBe('Emmanuel Vinícius')
        expect(customer.address).toEqual(address)
    })
})
