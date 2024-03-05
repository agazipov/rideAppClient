import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import ruLocale from '@fullcalendar/core/locales/ru';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { useState } from "react";
import { createPortal } from "react-dom";
import ModalAddEvent from "../modal/addEvent/ModalAddEvent";
import ModalClickEvent from "../modal/clickEvent/ModalClickEvent";
import { EventClickArg } from "@fullcalendar/core";
import { useGetRouteQuery } from "../../redux/api/api";
import { dataParseTitleForSeats } from "../../libs/dataParser";
import "./Calendar.css";
import InfoPanel from "../infoPanel/InfoPanel";

const initialDate = new Date();

interface ICalendarComponent {
    isAdmin: boolean
}

export default function Calendar(isAdmin: ICalendarComponent) {
    const [showModalAddEvent, setShowModalAddEvent] = useState<boolean>(false);
    const [showModalClickEvent, setShowModalClickEvent] = useState<EventClickArg | null>(null);

    const { data } = useGetRouteQuery();

    return (
        <section className="calendar container">
            <div className="calendar__header">
                <h3>Доступные  маршруты и свободные места</h3>
            </div>
            <div className="calendar__body">
                <InfoPanel />
                {data &&
                    <div className="calendar__fullCalendar">
                        <FullCalendar
                            plugins={[interactionPlugin, dayGridPlugin, bootstrap5Plugin]}
                            themeSystem='bootstrap5'
                            // editable={true}
                            initialDate={initialDate}
                            // ообрезает лишние недели в месяце
                            fixedWeekCount={false}
                            // растягивание
                            expandRows={true}
                            // дни только одного месяца
                            showNonCurrentDates={true}
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: !isAdmin ? 'addEventButton' : ''
                                // 'dayGridMonth'
                            }}
                            locale={ruLocale}
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
                        />
                    </div>
                }
                {showModalAddEvent &&
                    createPortal(
                        <ModalAddEvent
                            show={showModalAddEvent}
                            setShow={(e) => setShowModalAddEvent(e)}
                        />,
                        document.getElementById('modalContainer')!
                    )
                }
                {showModalClickEvent &&
                    createPortal(
                        <ModalClickEvent
                            event={showModalClickEvent}
                            setShow={(e) => { setShowModalClickEvent(e) }}
                        // content={{ event: data.find(e => e.start === eventDay)!, rides: rides }}
                        />,
                        document.getElementById('modalContainer')!
                    )
                }
            </div>
        </section>
    )
}