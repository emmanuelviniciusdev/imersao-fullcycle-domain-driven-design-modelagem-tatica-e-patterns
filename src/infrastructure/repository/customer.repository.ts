import CustomerRepositoryInterface from '../../domain/repository/customer.repository.interface'
import Customer from '../../domain/entity/customer'
import CustomerModel from '../database/sequelize/model/customer.model'
import Address from '../../domain/value-object/address'

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity?.address?.street,
            number: entity?.address?.number,
            zip_code: entity?.address?.zipCode,
            city: entity?.address?.city,
            active: entity.active,
            reward_points: entity.rewardPoints,
        })
    }

    async find(id: string): Promise<Customer> {
        const model = await CustomerModel.findOne({ where: { id } })

        if (!model) {
            throw new Error(`Customer with ID ${id} not found`)
        }

        const data = model.toJSON()

        let address = new Address(
            data.street,
            data.number,
            data.zip_code,
            data.city
        )

        address = address.isNotEmpty ? address : undefined

        return new Customer(
            data.id,
            data.name,
            address,
            data.active,
            data.reward_points
        )
    }

    async findAll(): Promise<Customer[]> {
        const allModels = await CustomerModel.findAll()

        return allModels.map((m) => {
            let address = new Address(m.street, m.number, m.zip_code, m.city)

            address = address.isNotEmpty ? address : undefined

            return new Customer(
                m.id,
                m.name,
                address,
                m.active,
                m.reward_points
            )
        })
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            {
                id: entity.id,
                name: entity.name,
                street: entity?.address?.street,
                number: entity?.address?.number,
                zip_code: entity?.address?.zipCode,
                city: entity?.address?.city,
                active: entity.active,
                reward_points: entity.rewardPoints,
            },
            { where: { id: entity.id } }
        )
    }
}
