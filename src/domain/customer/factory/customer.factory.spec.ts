import CustomerFactory from './customer.factory'
import Address from '../value-object/address'

jest.mock('uuid', () => ({ v4: () => 'random-uuid-v4' }))

describe('CustomerFactory Unit Tests', () => {
    it('should create a deactivated customer', () => {
        const customer =
            CustomerFactory.createDeactivatedCustomer('Emmanuel Vinícius')

        expect(customer.id).toBeDefined()
        expect(customer.name).toBe('Emmanuel Vinícius')
        expect(customer.address).toBeUndefined()
        expect(customer.active).toBe(false)
    })

    it('should create an activated customer', () => {
        const address = new Address('Street X', '1', '00000-00', 'Montreal')

        const customer = CustomerFactory.createActivatedCustomer(
            'Emmanuel Vinícius',
            address
        )

        expect(customer.id).toBeDefined()
        expect(customer.name).toBe('Emmanuel Vinícius')
        expect(customer.address).toBeDefined()
        expect(customer.active).toBe(true)
    })
})
