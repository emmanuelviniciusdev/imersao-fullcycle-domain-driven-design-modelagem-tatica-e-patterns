import CustomerRepository from './customer.repository'
import { Sequelize } from 'sequelize-typescript'
import CustomerModel from './customer.model'
import Address from '../../../../domain/customer/value-object/address'
import Customer from '../../../../domain/customer/entity/customer'

describe('CustomerRepository Integration Tests', () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        })

        sequelize.addModels([CustomerModel])

        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it('should throw an error if customer was not found in the database', async () => {
        const repository = new CustomerRepository()

        await expect(
            async () => await repository.find('foo-123')
        ).rejects.toThrowError('Customer with ID foo-123 not found')
    })

    it('should find a persisted customer in the database by ID', async () => {
        const repository = new CustomerRepository()

        const address = new Address('Street X', '4', '44', 'Montreal')

        const customers = [
            new Customer(
                '9aad6b66-3688-4ff6-bf8b-f4c4c6b73710',
                'Emmanuel',
                address,
                true,
                5555
            ),
            new Customer(
                '43f5fc9a-70d4-4ba8-906a-e0251483056c',
                'Kayle',
                undefined,
                false,
                4444
            ),
            new Customer(
                'e6188ef4-cc88-4324-abf8-1be90eb0d9e1',
                'Bardo',
                undefined,
                false,
                8888
            ),
            new Customer(
                '66bcf7ea-282b-4f9c-8be5-18774b1bdc83',
                'Vinícius',
                address,
                true,
                9999
            ),
        ]

        await Promise.all(customers.map((c) => repository.create(c)))

        const foundCustomer = await repository.find(
            '66bcf7ea-282b-4f9c-8be5-18774b1bdc83'
        )

        expect(foundCustomer).toEqual(customers[3])
    })

    it('should find all persisted customers in the database', async () => {
        const repository = new CustomerRepository()

        const address = new Address('Street X', '4', '44', 'Montreal')

        const customers = [
            new Customer(
                '9aad6b66-3688-4ff6-bf8b-f4c4c6b73710',
                'Emmanuel',
                address,
                true,
                5555
            ),
            new Customer(
                '43f5fc9a-70d4-4ba8-906a-e0251483056c',
                'Kayle',
                undefined,
                false,
                4444
            ),
            new Customer(
                'e6188ef4-cc88-4324-abf8-1be90eb0d9e1',
                'Bardo',
                undefined,
                false,
                8888
            ),
            new Customer(
                '66bcf7ea-282b-4f9c-8be5-18774b1bdc83',
                'Vinícius',
                address,
                true,
                9999
            ),
        ]

        await Promise.all(customers.map((c) => repository.create(c)))

        const allFoundCustomers = await repository.findAll()

        expect(allFoundCustomers).toHaveLength(4)

        for (const foundCustomer of allFoundCustomers) {
            const customer = customers.find((c) => c.id === foundCustomer.id)

            expect(foundCustomer.id).toBe(customer.id)
            expect(foundCustomer.name).toBe(customer.name)
            expect(foundCustomer.active).toBe(customer.active)
            expect(foundCustomer.rewardPoints).toBe(customer.rewardPoints)
            expect(foundCustomer.address).toEqual(customer.address)
        }
    })

    it('should persist a customer in the database', async () => {
        const repository = new CustomerRepository()

        const address = new Address('Street X', '4', '44', 'Montreal')

        const custumerId = '9aad6b66-3688-4ff6-bf8b-f4c4c6b73710'

        const customer = new Customer(
            custumerId,
            'Emmanuel',
            address,
            true,
            5555
        )

        await repository.create(customer)

        const foundCustomer = await repository.find(custumerId)

        expect(foundCustomer).toEqual(customer)
    })

    it('should update a persisted customer in the database', async () => {
        const repository = new CustomerRepository()

        const address = new Address('Street X', '4', '44', 'Montreal')

        const custumerId = '9aad6b66-3688-4ff6-bf8b-f4c4c6b73710'

        const customer = new Customer(
            custumerId,
            'Emmanuel',
            address,
            true,
            5555
        )

        await repository.create(customer)

        customer.changeName('Emmanuel Vinícius')

        await repository.update(customer)

        const foundCustomer = await repository.find(custumerId)

        expect(foundCustomer).toEqual(customer)
    })
})
