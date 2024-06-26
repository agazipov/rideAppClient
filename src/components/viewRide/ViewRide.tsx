import { IEvent } from "../../type/interface";
import { mapEvents } from "../../libs/mapEvents";
import React, { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import ModalClickEvent from "../modal/clickEvent/ModalClickEvent";
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import 'moment/locale/ru';

import "./ViewRide.css"

interface IViewRide {
    events: IEvent[]
}

export function ViewRide({ events }: IViewRide) {
    moment.locale('ru');
    const [showModalClickEvent, setShowModalClickEvent] = useState<string | null>(null);
    const callbackEvent = useMemo(() => mapEvents(events), [events]);
    const currentDate = moment().format("D.M dddd");

    return (
        <section className="viewRide container">
            <div className="viewRide__body">
                <div className="viewRide__header">
                    <h3>Доступные  маршруты и свободные места на {moment().format('MMMM YYYY')}</h3>
                </div>
                <div className="viewRide__events">
                    {callbackEvent.length === 0 && <div>Поездок не запланировано</div>}
                    {callbackEvent.map((event, index) => {
                        let eventDate = moment(event[0].start).format("D.M dddd");
                        return (
                            <div className={`events__group ${eventDate === currentDate ? 'currentDate' : ''}`} key={index}>
                                <h5><u>{eventDate}</u></h5>
                                {/* <div className="events__line"></div> */}
                                <div className="events__container">
                                    {event.map((ride) => (
                                        <div className="event" key={ride.id}>
                                            <span className="event__point">{ride.title.split("-")[0]}</span>
                                            <div className="event__btn-container">
                                                <div className="event__dashed">
                                                    <svg width="155" height="10">
                                                        <path
                                                            d="M 1 1 L 220 1"
                                                            stroke-miterlimit="10"
                                                            fill="none"
                                                            stroke="#3835B9"
                                                            stroke-width="5"
                                                            stroke-dasharray="5"
                                                            stroke-dashoffset="1">
                                                            <animate
                                                                attributeName="stroke-dashoffset"
                                                                values="100;0"
                                                                dur="3s"
                                                                calcMode="linear"
                                                                repeatCount="indefinite" />
                                                        </path>
                                                    </svg>
                                                </div>
                                                <p>Свободных мест: {ride.seats}</p>
                                                <Button
                                                    variant="outline-success"
                                                    className="event__btn"
                                                    onClick={() => setShowModalClickEvent(ride.id)}
                                                >
                                                    Подробнее
                                                </Button>
                                            </div>
                                            <span className="event__point">{ride.title.split("-")[1]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
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