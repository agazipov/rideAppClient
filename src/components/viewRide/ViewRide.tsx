import { IEvent } from "../../type/interface";
import { mapEvents } from "../../libs/mapEvents";
import React, { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import ModalClickEvent from "../modal/clickEvent/ModalClickEvent";
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
    console.log(callbackEvent);
    

    return (
        <div className="viewRide">
            <div className="viewRide__header">
                <h3>Доступные  маршруты и свободные места на {moment().format('MMMM Do YYYY')}</h3>
            </div>
            <div className="viewRide__events">
                {callbackEvent.length === 0 && <div>Поездок не запланировано</div>}
                {callbackEvent.map((event, index) => (
                    <div className="events__event" key={index}>
                        <div>{event[0].start.toString().slice(5).replace('-', '.')}</div>
                        {event.map((ride) => (
                            <React.Fragment key={ride.id}>
                                <div className="events__hr"></div>
                                <div className="events__ride" onClick={() => setShowModalClickEvent(ride.id)}>{ride.title}</div>
                            </React.Fragment>
                        ))}
                    </div>
                ))}
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
    )
}