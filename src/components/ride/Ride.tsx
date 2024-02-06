import { IRide } from "../../type/interface";
import { useState } from "react";
import { RideForm } from "../rideForm/RideForm";
import Button from 'react-bootstrap/Button';
import './ride.css';

interface IRideComponent {
    ride: IRide
}

export function Ride({ ride }: IRideComponent) {
    const [isSetting, setIsSetting] = useState<boolean>(true);

    return (
        <div className="ride">
            <Button onClick={() => setIsSetting(!isSetting)}  variant="secondary">Настроить</Button>
            {isSetting ?
                <ul>
                    <li>Время: {ride.time}</li>
                    <li>Водитель: {ride.driver}</li>
                    <li>Машина: {ride.car}</li>
                    <li>Места: {ride.passengers.toString()}</li>
                </ul> :
                <RideForm type='change' ride={ride}/>
            }
        </div>
    )
}