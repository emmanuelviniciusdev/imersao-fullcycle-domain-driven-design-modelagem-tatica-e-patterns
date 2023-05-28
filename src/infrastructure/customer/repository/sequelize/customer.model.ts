import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript'

@Table({ tableName: 'tb_customer', timestamps: false })
export default class CustomerModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string

    @Column({ allowNull: false })
    declare name: string

    @Column
    declare street: string

    @Column
    declare number: string

    @Column
    declare zip_code: string

    @Column
    declare city: string

    @Column({ allowNull: false, defaultValue: false })
    declare active: boolean

    @Column({ allowNull: false, defaultValue: 0 })
    declare reward_points: number
}
