import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import ruLocale from '@fullcalendar/core/locales/ru';
import { useState } from "react";
import { createPortal } from "react-dom";
import ModalAddEvent from "../modal/addEvent/ModalAddEvent";
import ModalClickEvent from "../modal/clickEvent/ModalClickEvent";
import { IEvent, IRide } from "../../type/interface";
import { EventClickArg } from "@fullcalendar/core";
import { useGetRouteQuery } from "../../redux/api/api";
import { dataParseTitleForSeats } from "../../libs/dataParser";

const initialDate = new Date();

// let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export default function Calendar() {
    const [showModalAddEvent, setShowModalAddEvent] = useState<boolean>(false);
    const [showModalClickEvent, setShowModalClickEvent] = useState<EventClickArg | null>(null);

    const { data } = useGetRouteQuery();

    return (
        <>
            {showModalAddEvent && createPortal(
                <ModalAddEvent
                    show={showModalAddEvent}
                    setShow={(e) => setShowModalAddEvent(e)}
                />,
                document.getElementById('modalContainer')!
            )}
            {showModalClickEvent && createPortal(
                <ModalClickEvent
                    event={showModalClickEvent}
                    setShow={(e) => { setShowModalClickEvent(e) }}
                // content={{ event: data.find(e => e.start === eventDay)!, rides: rides }}
                />,
                document.getElementById('modalContainer')!
            )}
            {data && <FullCalendar
                plugins={[interactionPlugin, dayGridPlugin]}
                // editable={true}
                initialDate={initialDate}
                fixedWeekCount={false}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title,addEventButton',
                    right: 'dayGridMonth'
                }}
                locale={ruLocale}
                navLinks={true}
                // navLinkDayClick={(date) => {
                //     const convertedDate = convertStringToDate(date)
                //     const find = events.filter((el) => el.start.startsWith(convertedDate));
                //     console.log('find', find);
                //     setShowModalClickEvent(!showModalClickEvent);
                // }}
                eventClick={(info) => {
                    setShowModalClickEvent(info);
                }}
                events={[...dataParseTitleForSeats(data)]}
                customButtons={{
                    addEventButton: {
                        text: 'Добавить поезку',
                        click: () => setShowModalAddEvent(!showModalAddEvent)
                    }
                }}
            />}
        </>
    )
}