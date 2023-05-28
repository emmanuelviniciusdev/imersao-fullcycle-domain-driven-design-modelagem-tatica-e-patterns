import Address from '../value-object/address'
import Customer from '../entity/customer'
import { EventDispatcher } from '../../@shared/event/event-dispatcher'
import { SendActivationCodeByEmailWhenCustomerIsCreatedHandler } from '../event/handler/send-activation-code-by-email-when-customer-is-created.handler'
import UpdateReportsAboutCustomersWhenCustomerIsCreatedHandler from '../event/handler/update-reports-about-customers-when-customer-is-created.handler'
import CustomerCreatedEvent from '../event/customer-created.event'
import uuid from 'uuid'
import UpdateReportsAboutAddressesWhenCustomerAddressIsUpdatedHandler from '../event/handler/update-reports-about-addresses-when-customer-address-is-updated.handler'
import CustomerUpdatedEvent from '../event/customer-updated.event'

export class CustomerService {
    static updateCustomerAddress(customer: Customer, newAddress?: Address) {
        customer.changeAddress(newAddress)

        const eventDispatcher = new EventDispatcher()

        eventDispatcher.register(
            'CustomerUpdatedEvent',
            new UpdateReportsAboutAddressesWhenCustomerAddressIsUpdatedHandler()
        )

        eventDispatcher.notify(
            'CustomerUpdatedEvent',
            new CustomerUpdatedEvent({
                customerId: customer.id,
                customerName: customer.name,
                newAddress,
            })
        )
    }

    static createCustomer(
        name: string,
        address?: Address,
        active?: boolean,
        rewardPoints?: number
    ) {
        const customer = new Customer(
            uuid.v4(),
            name,
            address,
            active,
            rewardPoints
        )

        const eventDispatcher = new EventDispatcher()

        eventDispatcher.register(
            'CustomerCreatedEvent',
            new SendActivationCodeByEmailWhenCustomerIsCreatedHandler()
        )

        eventDispatcher.register(
            'CustomerCreatedEvent',
            new UpdateReportsAboutCustomersWhenCustomerIsCreatedHandler()
        )

        eventDispatcher.notify(
            'CustomerCreatedEvent',
            new CustomerCreatedEvent({ customer })
        )

        return customer
    }
}
