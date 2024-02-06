import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState, useRef } from "react";
import { getRides, getEvents } from "../../api/api";
import convertStringToDate from "../../libs/convertStringToDate";
import { createPortal } from "react-dom";
import ModalAddEvent from "../modal/ModalAddEvent";
import ModalClickEvent from "../modal/ModalClickEvent";
import { IEvent, IRide } from "../../type/interface";
import { CalendarApi } from "@fullcalendar/core";
import { useGetRouteQuery } from "../../redux/api";

const initialDate = '2024-01-01'
const INITAIAL_EVENT: IEvent[] = [
    {
        title: 'Бак-Чел / Свободно: 3',
        start: '2024-01-01',
    },
    {
        title: 'Чел-Бак / Свободно: 1',
        start: '2024-01-01',
    }
]
// let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export function Calendar() {
    // const calendar = useRef<FullCalendar>(null);

    // const [api, setApi] = useState<CalendarApi | null>(null);
    const [events, setEvents] = useState<IEvent[]>(INITAIAL_EVENT);
    const [rides, setRides] = useState<IRide[]>([]);
    const [eventDay, setEvetDay] = useState<string>('')
    const [showModalAddEvent, setShowModalAddEvent] = useState<boolean>(false);
    const [showModalClickEvent, setShowModalClickEvent] = useState<boolean>(false);

    // useEffect(() => {
    //     // if (calendar.current) {
    //     //     setApi(calendar.current.getApi());
    //     // }
    //     getEvents()
    //         .then((response: IEvent[]) => {
    //             setEvents(prev => [...prev, ...response])
    //         })
    //         .catch((err) => console.log('не удалось получить евенты из базы', err.message));
    // }, [])

    const { data } = useGetRouteQuery();
    console.log('RTK', data);
    

    return (
        <>
            {showModalAddEvent && createPortal(
                <ModalAddEvent
                    show={showModalAddEvent}
                    setShow={(e) => setShowModalAddEvent(e)}
                    addEvent={(e) => {
                        // api.addEvent(e)
                        setEvents(prev => [...prev, e])
                    }}
                />,
                document.getElementById('modalContainer')!
            )}
            {showModalClickEvent && createPortal(
                <ModalClickEvent
                    show={showModalClickEvent}
                    setShow={(e) => setShowModalClickEvent(e)}
                    content={{ event: events.find(e => e.start === eventDay)!, rides: rides }}
                />,
                document.getElementById('modalContainer')!
            )}
            <FullCalendar
                // ref={calendar}
                plugins={[interactionPlugin, dayGridPlugin]}
                editable={true}
                initialDate={initialDate}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title,addEventButton',
                    right: 'dayGridMonth'
                }}
                navLinks={true}
                navLinkDayClick={(date) => {
                    const convertedDate = convertStringToDate(date)
                    const find = events.filter((el) => el.start.startsWith(convertedDate));
                    console.log('find', find);
                    setShowModalClickEvent(!showModalClickEvent);
                }}
                eventClick={(info) => {
                    getRides(info)
                        .then((rides: IRide[]) => {
                            setShowModalClickEvent(!showModalClickEvent);
                            info.event.start && setEvetDay(convertStringToDate(info.event.start))
                            setRides(rides);
                        })
                        .catch((err) => console.log('get event error', err.message))
                }}
                events={data}
                customButtons={{
                    addEventButton: {
                        text: 'add event',
                        click: () => setShowModalAddEvent(!showModalAddEvent)
                    }
                }}
            />
        </>
    )
}