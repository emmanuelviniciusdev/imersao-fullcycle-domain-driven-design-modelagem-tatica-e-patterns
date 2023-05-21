import Customer from './customer'
import Address from '../value-object/address'

describe('Customer Unit Tests', () => {
    it('should throw an error if ID is empty', () => {
        expect(() => new Customer('', 'Emmanuel Vinícius')).toThrowError(
            'ID is required'
        )
    })

    it('should throw an error if name is empty', () => {
        expect(() => new Customer('123', '')).toThrowError('Name is required')
    })

    it('should change name', () => {
        const customer = new Customer('123', 'Emmanuel')

        customer.changeName('Emmanuel Vinícius')

        expect(customer.name).toBe('Emmanuel Vinícius')
    })

    it('should throw an error when activating customer if customer does not have an address', () => {
        const customer = new Customer('123', 'Emmanuel Vinícius')

        expect(() => customer.activate()).toThrowError(
            'Customer must have an address in order to activate'
        )
    })

    it('should activate customer successfully', () => {
        const address = new Address('Street X', '1', '00000-00', 'Montreal')
        const customer = new Customer('123', 'Emmanuel Vinícius', address)

        customer.activate()

        expect(customer.active).toBe(true)
    })

    it('should deactivate customer successfully', () => {
        const address = new Address('Street X', '1', '00000-00', 'Montreal')
        const customer = new Customer('123', 'Emmanuel Vinícius', address)

        customer.activate()
        customer.deactivate()

        expect(customer.active).toBe(false)
    })

    it('should add reward points', () => {
        const customer = new Customer('1', 'Emmanuel Vinícius')
        expect(customer.rewardPoints).toBe(0)

        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(10)

        customer.addRewardPoints(20.5)
        expect(customer.rewardPoints).toBe(30.5)
    })
})
