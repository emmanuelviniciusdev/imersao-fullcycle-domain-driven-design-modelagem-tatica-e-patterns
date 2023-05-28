import { EventDispatcher } from './event-dispatcher'
import SendEmailWhenProductIsCreatedHandler from '../../product/event/handler/send-email-when-product-is-created.handler'
import ProductCreatedEvent from '../../product/event/product-created.event'

describe('EventDispatcher Unit Tests', () => {
    it('should register an event handler', () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDispatcher.register('ProductCreatedEvent', eventHandler)

        const registeredEventHandlers =
            eventDispatcher.getRegisteredEventHandlers('ProductCreatedEvent')

        expect(registeredEventHandlers).toHaveLength(1)
    })

    it('should unregister an event handler', () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDispatcher.register('ProductCreatedEvent', eventHandler)
        eventDispatcher.unregister('ProductCreatedEvent', eventHandler)

        const registeredEventHandlers =
            eventDispatcher.getRegisteredEventHandlers('ProductCreatedEvent')

        expect(registeredEventHandlers).toHaveLength(0)
    })

    it('should unregister all event handlers', () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler1 = new SendEmailWhenProductIsCreatedHandler()
        const eventHandler2 = new SendEmailWhenProductIsCreatedHandler()

        eventDispatcher.register('ProductCreatedEvent', eventHandler1)
        eventDispatcher.register('ProductCreatedEvent', eventHandler2)

        eventDispatcher.unregisterAll()

        const registeredEventHandlers =
            eventDispatcher.getRegisteredEventHandlers('ProductCreatedEvent')

        expect(registeredEventHandlers).toHaveLength(0)
    })

    it('should notify all event handlers', () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        const spyEventHandlerHandle = jest.spyOn(eventHandler, 'handle')

        eventDispatcher.register('ProductCreatedEvent', eventHandler)

        const productCreatedEvent = new ProductCreatedEvent({
            email: 'pumpkin.lovers@icloud.com',
            name: 'Pumpkin',
            description: 'Orange Pumpkin!!',
            price: 0.8,
        })

        eventDispatcher.notify('ProductCreatedEvent', productCreatedEvent)

        expect(spyEventHandlerHandle).toHaveBeenCalledTimes(1)
    })
})
