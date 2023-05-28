import {
    BelongsTo,
    Column,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'
import CustomerModel from '../../../customer/repository/sequelize/customer.model'
import OrderItemModel from './order-item.model'

@Table({ tableName: 'tb_order', timestamps: false })
export default class OrderModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string

    @ForeignKey(() => CustomerModel)
    @Column({ allowNull: false })
    declare customer_id: string

    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel

    @Column({ allowNull: false })
    declare total: number

    @HasMany(() => OrderItemModel)
    declare items: OrderItemModel[]
}
