import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useForm, SubmitHandler } from "react-hook-form";
import { IEvent, IRide, Position } from '../../type/interface';
import { useAddRideMutation, useChangeRideMutation, useGetRouteState } from '../../redux/api/api';
import Salon from '../salon/Salon';
import './rideForm.css'
import { usePassenger } from '../../hooks/usePassenger';
import { Row, Col } from 'react-bootstrap';
import PassengerContainer from '../passengerContainer/PassengerContainer';
import Passengers from '../passengers/Passengers';

const SALON_STATE: Position[] = ['front', 'left', 'mid', 'right']

interface IRideComponent {
    show: (e: boolean) => void,
    event?: IEvent,
    ride?: IRide,
}

export function RideForm({ show, ride, event }: IRideComponent) {
    // добавить проверку
    const { register, handleSubmit } = useForm<IRide>({
        defaultValues: {
            time: ride?.time,
            driver: ride?.driver,
            car: ride?.car,
            passengers: ride?.passengers
        }
    });

    const [updateRide] = useChangeRideMutation();
    const [addRide] = useAddRideMutation();
    const { salon, setPassenger, freeSeatsAdd, freeSeatsChange } = usePassenger(ride?.passengers);

    const onSubmit: SubmitHandler<IRide> = (data) => {
        ride ?
            updateRide({
                ...ride,
                ...data,
                passengers: salon,
                freeSeats: freeSeatsChange(),
            })
            :
            addRide({
                ...data,
                passengers: salon,
                route: event?.id,
                freeSeats: freeSeatsAdd(),
            });
        show(false);
    }

    return (
        <div className="rideForm">
            <Form onSubmit={handleSubmit(onSubmit)} className="rideForm_ride">
                <Form.Group className="mb-3" as={Col}>
                    <h4>Поездка</h4>
                    <InputGroup className="mb-3" size="sm">
                        <InputGroup.Text id="basic-addon1">Время</InputGroup.Text>
                        <Form.Control
                            {...register("time")}
                            placeholder="morning"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3" size="sm">
                        <InputGroup.Text id="basic-addon2">Водитель</InputGroup.Text>
                        <Form.Control
                            {...register("driver")}
                            placeholder="ivan"
                            aria-describedby="basic-addon2"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3" size="sm">
                        <InputGroup.Text id="basic-addon3">Машина</InputGroup.Text>
                        <Form.Control
                            {...register("car")}
                            placeholder="pejo"
                            aria-describedby="basic-addon3"
                        />
                    </InputGroup>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Сохранить
                </Button>
            </Form>
            {/* <div className="rideForm_passenger">
                <h4>Пассажиры</h4>
                {salon.map((passenger, index) => {
                    return (
                        <PassengerContainer passenger={passenger} setPassenger={setPassenger} key={index} />
                    )
                })}
            </div> */}
            <Passengers clients={salon} setPassenger={setPassenger}/>
            {/* <Salon passengers={salon} /> */}
        </div>
    )
}