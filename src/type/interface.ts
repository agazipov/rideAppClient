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
    passengers: IPassengers,
    route?: string,
    freeSeats?: number,
}

export interface IPassengers {
    [key: string]: boolean,

    left: boolean,
    right: boolean,
    mid: boolean,
    front: boolean,
}

export interface ILoginForm {
    name: string,
    password: string,
}

export interface IUserResponse {
    token: string,
  }