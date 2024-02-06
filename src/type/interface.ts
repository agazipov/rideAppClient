export interface IModalAddEvent {
    show: boolean,
    setShow: (e: boolean) => void,
    addEvent: (e: IEvent) => void
}

export interface IModalClickEvent {
    show: boolean,
    setShow: (e: boolean) => void,
    content: {
        event: IEvent,
        rides: IRide[],
    }
}

export interface IEvent {
    id?: string,
    title: string,
    start: string,
    seats?: number
}

export interface IRide {
    id?: string,
    time: string,
    car: string,
    driver: string,
    passengers: Number,
    route?: string,
}