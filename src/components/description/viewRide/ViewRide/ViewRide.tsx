import { IEvent } from "../../../../type/interface";
import { mapEvents } from "../../../../libs/mapEvents";
import { useMemo, useState } from "react";
import ModalClickEvent from "../../../modal/clickEvent/ModalClickEvent";
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import 'moment/locale/ru';

import "./ViewRide.css"

interface IViewRide {
    events: IEvent[]
}

export default function ViewRide({ events }: IViewRide) {
    moment.locale('ru');
    const [showModalClickEvent, setShowModalClickEvent] = useState<string | null>(null);
    const callbackEvent = useMemo(() => mapEvents(events), [events]);
    const currentDate = moment().format("D.M dddd");

    return (
        <section className="viewRide">
            <div className="viewRide__header">
                <h3>Доступные  маршруты и свободные места на {moment().format('MMMM')}</h3>
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
                                        <p>Свободных мест: {ride.seats}</p>
                                        <div className="event__point-container">
                                            <span className="event__point">{ride.title.split("-")[0]}</span>
                                            <div className="event__dashed">
                                                <svg width="155" height="10">
                                                    <path
                                                        d="M 1 1 L 220 1"
                                                        strokeMiterlimit="10"
                                                        fill="none"
                                                        stroke="#3835B9"
                                                        strokeWidth="5"
                                                        strokeDasharray="5"
                                                        strokeDashoffset="1">
                                                        <animate
                                                            attributeName="stroke-dashoffset"
                                                            values="100;0"
                                                            dur="3s"
                                                            calcMode="linear"
                                                            repeatCount="indefinite" />
                                                    </path>
                                                </svg>
                                            </div>
                                            <span className="event__point">{ride.title.split("-")[1]}</span>
                                        </div>
                                        <Button
                                            variant="outline-success"
                                            className="event__btn"
                                            onClick={() => setShowModalClickEvent(ride.id)}
                                        >
                                            Подробнее
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
            {showModalClickEvent &&
                <ModalClickEvent
                    id={showModalClickEvent}
                    setShow={(e) => { setShowModalClickEvent(e) }}
                />
            }
        </section>
    )
}