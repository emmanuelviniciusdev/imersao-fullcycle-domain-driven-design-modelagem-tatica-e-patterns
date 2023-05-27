import EventInterface from '../@shared/event.interface'

export default class CustomerCreatedEvent implements EventInterface {
    data: any
    dateTime: Date

    constructor(data: any) {
        this.data = data
        this.dateTime = new Date()
    }
}
