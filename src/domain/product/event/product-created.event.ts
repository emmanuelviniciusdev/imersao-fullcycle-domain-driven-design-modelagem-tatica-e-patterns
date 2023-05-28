import EventInterface from '../../@shared/event/event.interface'

export default class ProductCreatedEvent implements EventInterface {
    data: any
    dateTime: Date

    constructor(data: any) {
        this.data = data
        this.dateTime = new Date()
    }
}
