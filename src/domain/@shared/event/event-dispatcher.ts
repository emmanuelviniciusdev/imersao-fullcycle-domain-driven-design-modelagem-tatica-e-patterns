import EventDispatcherInterface from './event-dispatcher.interface'
import EventInterface from './event.interface'
import EventHandlerInterface from './event-handler.interface'

type RegisteredEventHandlersType = {
    [eventName: string]: EventHandlerInterface[]
}

export class EventDispatcher implements EventDispatcherInterface {
    private registeredEventHandlers: RegisteredEventHandlersType = {}

    getRegisteredEventHandlers(eventName: string) {
        return this.registeredEventHandlers[eventName] ?? []
    }

    notify(eventName: string, event: EventInterface): void {
        const registeredEventHandlers =
            this.getRegisteredEventHandlers(eventName)

        for (const eventHandler of registeredEventHandlers) {
            eventHandler.handle(event)
        }
    }

    register(eventName: string, eventHandler: EventHandlerInterface): void {
        this.registeredEventHandlers[eventName] = [
            ...(this.registeredEventHandlers[eventName] ?? []),
            eventHandler,
        ]
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface): void {
        /**
         * This implementation may not work fine.
         */

        const index =
            this.getRegisteredEventHandlers(eventName).indexOf(eventHandler)

        if (index !== -1) {
            this.registeredEventHandlers[eventName].splice(index, 1)
        }
    }

    unregisterAll(): void {
        this.registeredEventHandlers = {}
    }
}
