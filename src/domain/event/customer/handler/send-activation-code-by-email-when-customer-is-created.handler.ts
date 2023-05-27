import EventHandlerInterface from '../../@shared/event-handler.interface'
import CustomerCreatedEvent from '../customer-created.event'

export class SendActivationCodeByEmailWhenCustomerIsCreatedHandler
    implements EventHandlerInterface<CustomerCreatedEvent>
{
    handle(event: CustomerCreatedEvent): void {
        console.log(
            'Esse é o primeiro console.log do evento: CustomerCreatedEvent'
        )
        console.log(`Sending activation code to user email...`)
    }
}
