import EventHandlerInterface from '../../../@shared/event/event-handler.interface'
import CustomerUpdatedEvent from '../customer-updated.event'

export default class UpdateReportsAboutAddressesWhenCustomerAddressIsUpdatedHandler
    implements EventHandlerInterface<CustomerUpdatedEvent>
{
    handle(event: CustomerUpdatedEvent): void {
        const { customerId, customerName, newAddress } = event.data

        console.log(
            `Endereço do cliente: ${customerId}, ${customerName} alterado para: ${newAddress}`
        )
    }
}
