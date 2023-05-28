import EventInterface from '../../@shared/event/event.interface'

export default class CustomerUpdatedEvent implements EventInterface {
    data: any
    dateTime: Date

    constructor(data: any) {
        this.data = data
        this.dateTime = new Date()
    }
}
