import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useForm, SubmitHandler } from "react-hook-form";
import { IEvent, IRide } from '../../type/interface';
import { fetchAddRide, fetchChangeRide } from '../../api/api';

type UseForm = 'add' | 'change';

interface IRideComponent {
    type: UseForm,
    ride?: IRide,
    event?: IEvent,
}

export function RideForm({ type, ride, event }: IRideComponent) {
    const { register, handleSubmit } = useForm<IRide>({
        defaultValues: {
            time: ride?.time,
            driver: ride?.driver,
            car: ride?.car,
            passengers: ride?.passengers
        }
    });
    const onSubmit: SubmitHandler<IRide> = (data) => {
        if (!event) return;
        switch (type) {
            case 'add':
                fetchAddRide(data, event)
                    .then((response) => console.log('response', response))
                    .catch((err) => console.log('ошибка при дообавлении поездки', err))
                break;
            case 'change':
                fetchChangeRide(data, event)
                    .then((response) => console.log('response', response))
                    .catch((err) => console.log('ошибка при изминении поездки', err))
                break;
            default:
                break;
        }
        console.log('rideForm', data);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Время</InputGroup.Text>
                    <Form.Control
                        {...register("time")}
                        placeholder="morning"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon2">Водитель</InputGroup.Text>
                    <Form.Control
                        {...register("driver")}
                        placeholder="ivan"
                        aria-describedby="basic-addon2"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">Машина</InputGroup.Text>
                    <Form.Control
                        {...register("car")}
                        placeholder="pejo"
                        aria-describedby="basic-addon3"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon4">Места</InputGroup.Text>
                    <Form.Control
                        {...register("passengers")}
                        placeholder="5"
                        aria-describedby="basic-addon4"
                    />
                </InputGroup>
            </Form.Group>
            <Button variant="primary" type="submit">
                Save Changes
            </Button>
        </Form>
    )
}