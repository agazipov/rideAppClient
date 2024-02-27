import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from "react";
import { IClient, Position } from "../../type/interface"
import { useForm, SubmitHandler } from "react-hook-form";
import "./salon.css"

interface ISalon {
    passengers: IClient[],
    setPassenger?: SubmitHandler<IClient>,
}

export default function Salon({ passengers, setPassenger }: ISalon) {
    const { register, handleSubmit, setValue, reset } = useForm<IClient>();
    const [position, setPosition] = useState<Position | null>(null);

    // функция для открытия/закрытия формы и передачи value в форму
    const handleSeat = (key: Position) => {
        if (key === position) {
            setPosition(null);
            return;
        }
        setValue('position', key);
        typeof key === 'string' ? setPosition(key) : setPosition(null);
        // приминяет к форме состояние открытого места
        const passenger = passengers.find(elem => elem.position === key);
        reset(passenger);
    };

    // перенести в тег??
    const onSubmit: SubmitHandler<IClient> = async (form) => {
        setPassenger && setPassenger(form);
        setPosition(null);
    };

    // если компонент не принимает функцию именения, то отрисовывает элементы без возможности клика
    return (
        <div className="salon-container">
            <div className="grid-container">
                <div className="grid-item-1"></div>
                {setPassenger ?
                    passengers.map((seat, index) => {
                        return (
                            <div className={`grid-item-${index + 2}`} key={index}>
                                <div
                                    className={`${seat.position === position ? 'isChange' : (seat.name ? 'busy' : 'free')}`}
                                    onClick={() => {
                                        handleSeat(seat.position);
                                    }}
                                ></div>
                            </div>
                        )
                    })
                    :
                    passengers.map((seat, index) => {
                        return (
                            <div className={`grid-item-${index + 2}`} key={index}>
                                <div className={`${seat.name ? 'busy' : 'free'}`}></div>
                            </div>
                        )
                    })
                }
            </div>
            {setPassenger && position &&
                <div className="salon_form">
                    <Form onSubmit={handleSubmit(onSubmit)}
                        autoComplete="off">
                        <h3>Добавте пасcажира</h3>
                        <Form.Group className="mb-3">
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Имя</InputGroup.Text>
                                <Form.Control
                                    {...register("name")}
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon2">Телефон</InputGroup.Text>
                                <Form.Control
                                    {...register("phone")}
                                    aria-describedby="basic-addon2"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3 modify_input">
                                <InputGroup.Text id="basic-addon2">Позиция</InputGroup.Text>
                                <Form.Control
                                    {...register("position")}
                                    aria-describedby="basic-addon2"
                                />
                            </InputGroup>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Добавить
                        </Button>
                        <Button variant="primary" type="button" onClick={() => setPosition(null)}>
                            Не добавлять
                        </Button>
                    </Form>
                </div>}
        </div>
    )
}