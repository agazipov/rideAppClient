import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useForm, SubmitHandler } from "react-hook-form";
import { IClient, Position } from '../../type/interface';
import { POSITION_KEY } from '../../libs/constant';

interface IPassengerComponent {
    passenger: IClient,
    setPassenger: SubmitHandler<IClient>,
}

export default function AddPassenger({ passenger, setPassenger }: IPassengerComponent) {
    const { register, handleSubmit, setValue } = useForm<IClient>({
        defaultValues: passenger
    });
    
    // useEffect(() => {
    //     for (const key in passenger) {
    //         let value = passenger[key as keyof IClient];
    //         setValue(key as keyof IClient, value);
    //     }
    // }, [passenger, setValue])

    return (
        <Form onSubmit={handleSubmit(setPassenger)}>
            {/* <Form.Label htmlFor={passenger.position}>Введите имя пассажира с номером: {phone}</Form.Label> */}
            <span>Добавить нового пассажира на место {POSITION_KEY[passenger.position]}</span>
            <InputGroup className="mb-3" size="sm">
                <InputGroup.Text id="position_name">Имя</InputGroup.Text>
                <Form.Control
                    {...register("name")}
                    aria-describedby="position_name"
                />
            </InputGroup>
            <InputGroup className="mb-3" size="sm">
                <InputGroup.Text id="position_phone">Телефон</InputGroup.Text>
                <Form.Control
                    {...register("phone")}
                    aria-describedby="position_phone"
                />
            </InputGroup>
            <Button variant="primary" type="submit">
                Добавить
            </Button>
        </Form>
    )
}