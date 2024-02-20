import { EventClickArg } from "@fullcalendar/core"

export interface IModalAddEvent {
    show: boolean,
    setShow: (e: boolean) => void,
}

export interface IModalClickEvent {
    event: EventClickArg,
    setShow: (e: null) => void,
    content?: {
        event: IEvent,
        rides: IRide[],
    }
}

export interface IEvent {
    id: string,
    title: string,
    start: Date,
    seats: number,
    color?: string
}

export interface IRide {
    id?: string,
    time: string,
    car: string,
    driver: string,
    passengers: IClient[],
    route?: string,
    freeSeats?: number,
}

export type Position = 'front' | 'right' | 'mid' | 'left'

export interface ILoginForm {
    name: string,
    password: string,
    session?: boolean,
}

export interface IUserResponse {
    token: string,
}

export interface IClient {
    id?: string,
    name: string,
    phone: string,
    note?: string,
    ride?: string[],
    position: Position,
}