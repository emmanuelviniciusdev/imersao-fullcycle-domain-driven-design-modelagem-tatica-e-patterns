import EventHandlerInterface from '../../../@shared/event/event-handler.interface'
import CustomerCreatedEvent from '../customer-created.event'

export default class UpdateReportsAboutCustomersWhenCustomerIsCreatedHandler
    implements EventHandlerInterface<CustomerCreatedEvent>
{
    handle(event: CustomerCreatedEvent): void {
        console.log('Esse é o segundo console.log do evento: CustomerCreated')
        console.log(
            `Updating customer reports to include the customer with ID ${event.data.customer.id}`
        )
    }
}
