import { EventClickArg } from "@fullcalendar/core"

export interface IModalAddEvent {
    show: boolean,
    setShow: (e: boolean) => void,
}

export interface IModalClickEvent {
    id: string,
    setShow: (e: null) => void,
}


export interface IEvent {
    id: string,
    title: string,
    start: Date,
    seats: number,
    color?: string,
    default?: boolean
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

export type Position = 'front' | 'left' | 'mid' | 'right'

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
    isFind?: boolean,
}

export interface ListResponse<T> {
    totalPages: number,
    page: number,
    nextPage: number | null,
    prevPage: number | null,
    content: T[]
}