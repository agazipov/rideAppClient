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

const initialDate = new Date();

// let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export default function Calendar() {
    const [showModalAddEvent, setShowModalAddEvent] = useState<boolean>(false);
    const [showModalClickEvent, setShowModalClickEvent] = useState<EventClickArg | null>(null);

    const { data } = useGetRouteQuery();

    return (
        <section className="calendar">
            <div className="calendar__container">
                <div className="calendar__info">
                    <p>Для получения детальной информации шелкните на интересующем вас маршруте.</p>
                    <br />
                    <p>Индекс Бак-Чел/Чел-Бак обозначает направление маршрута: <br />
                        Бакал-Сатка-Челябинск и <br />
                        Челябинск-Сатка-Бакал соответствено.</p>
                    <br />
                    <p>Цифра указывает на наличие свободных мест.</p>
                    <br />
                    <p>Красный цвет маршрута означает, что на него еще не запланированы поездки.</p>
                </div>
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
                {data &&
                    <div className="calendar__body">
                        <FullCalendar
                            plugins={[interactionPlugin, dayGridPlugin, bootstrap5Plugin]}
                            themeSystem='bootstrap5'
                            // editable={true}
                            initialDate={initialDate}
                            // ообрезает лишние недели в месяце
                            fixedWeekCount={true}
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
                            // navLinks={true}
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
                        />
                    </div>
                }
            </div>
        </section>
    )
}