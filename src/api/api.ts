import { EventClickArg } from "@fullcalendar/core";
import { IEvent, IRide } from "../type/interface";

export async function getEvents() {
    const response = await fetch('http://localhost:5000/api/data', {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    })
    const result = await response.json();
    return result;
}

export async function getRides(info: EventClickArg) {
    const response = await fetch('http://localhost:5000/api/ride', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(info.event)
    })
    const result = await response.json();
    return result;
}

export async function fetchAddEvent(form: IEvent) {
    const response = await fetch('http://localhost:5000/api/addroute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(form)
    })
    const result = await response.json();
    return result;

}
export async function fetchAddRide(ride: IRide, event: IEvent) {
    const response = await fetch('http://localhost:5000/api/addride', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ride, event})
    })
    const result = await response.json();
    return result;
}

export async function fetchChangeRide(ride: IRide, event: IEvent) {
    const response = await fetch('http://localhost:5000/api/change', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ride, event})
    })
    const result = await response.json();
    return result;
}

export async function fetchDeleteRide(ride: IRide) {
    const response = await fetch('http://localhost:5000/api/delride', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(ride)
    })
    const result = await response.json();
    return result;
}

export async function fetchDeleteEvent(event: IEvent) {
    const response = await fetch('http://localhost:5000/api/delroute', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(event)
    })
    const result = await response.json();
    return result;
}
