import Customer from './entity/customer'
import Address from './value-object/address'
import OrderItem from './entity/order-item'
import Order from './entity/order'

const address = new Address('Street X', '1', '00000-00', 'Montreal')
const customer = new Customer('1', 'Emmanuel Vinícius', address)

const items = [
    new OrderItem('1', 'Pumpkin', 0.8),
    new OrderItem('2', 'Grapes', 1.2),
    new OrderItem('3', 'Apple', 0.5),
]

const order = new Order('1', customer.id, items)
