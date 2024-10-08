import { IEvent, IRide } from "../../type/interface";
import { useState } from "react";
import RideForm from "../rideForm/RideForm";
import Button from 'react-bootstrap/Button';
import './rideContainer.css';
import { useDeleteRideMutation } from "../../redux/api/api";
import Salon from "../salon/Salon";
import { countFreeSeats } from "../../libs/counters";
import { useAuth } from "../../hooks/useAuth";
import Passenger from "../passengers/Passengers";

interface IRideComponent {
    ride: IRide,
    event?: IEvent
}

export default function RideContainer({ ride, event }: IRideComponent) {
    const [isSetting, setIsSetting] = useState<boolean>(false);
    const [deleteRide] = useDeleteRideMutation();
    const auth = useAuth();

    return (
        <div className="ride">
            {isSetting ?
                <RideForm show={setIsSetting} ride={ride} event={event} />
                :
                <div className="rideListContainer">
                    <ul>
                        <li>Время: {ride.time}</li>
                        <li>Водитель: {ride.driver}</li>
                        <li>Машина: {ride.car}</li>
                        <li>Свободные места: {countFreeSeats(ride.passengers)}</li>
                    </ul>
                    {!auth.token && <Salon passengers={ride.passengers} />}
                    {/* <Passenger client={ride.passengers} /> */}
                </div>
            }
            {auth.token && <div className="btnGroup">
                <Button
                    onClick={() => setIsSetting(!isSetting)}
                    variant="secondary"
                >
                    {isSetting ? 'Не менять' : 'Изменить'}
                </Button>
                <Button
                    onClick={() => deleteRide({ ...ride, freeSeats: -countFreeSeats(ride.passengers) })}
                    variant="danger"
                >
                    Удалить поездку
                </Button>
            </div>}
        </div>
    )
}