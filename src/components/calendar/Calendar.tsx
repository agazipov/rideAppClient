import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import ruLocale from '@fullcalendar/core/locales/ru';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { useState } from "react";
import { createPortal } from "react-dom";
import ModalAddEvent from "../modal/addEvent/ModalAddEvent";
import ModalClickEvent from "../modal/clickEvent/ModalClickEvent";
import { useGetRouteQuery } from "../../redux/api/api";
import { dataParseTitleForSeats } from "../../libs/dataParser";

import "./Calendar.css";

const initialDate = new Date();

export default function Calendar() {
    const [showModalAddEvent, setShowModalAddEvent] = useState<boolean>(false);
    const [showModalClickEvent, setShowModalClickEvent] = useState<string | null>(null);

    const { data } = useGetRouteQuery();

    if (!data) {
        return (
            <div>Нет данных</div>
        )
    }

    return (
        <section className="calendar container">
            <div className="calendar__header">
                <h3>Доступные  маршруты и свободные места</h3>
            </div>
            <div className="calendar__body">
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
                            right: 'addEventButton'
                            // 'dayGridMonth'
                        }}
                        locale={ruLocale}
                        eventClick={(info) => {
                            setShowModalClickEvent(info.event.id);
                        }}
                        events={[...dataParseTitleForSeats(data)]}
                        customButtons={{
                            addEventButton: {
                                text: 'Добавить поезку',
                                click: () => setShowModalAddEvent(!showModalAddEvent)
                            },
                        }}
                    />
                </div>
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
                            id={showModalClickEvent}
                            setShow={(e) => { setShowModalClickEvent(e) }}
                        />,
                        document.getElementById('modalContainer')!
                    )
                }
            </div>
        </section>
    )
}