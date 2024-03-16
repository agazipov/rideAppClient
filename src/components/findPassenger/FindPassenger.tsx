import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useForm, SubmitHandler } from "react-hook-form";
import { IClient, Position } from '../../type/interface';
import { useLazyGetClientQuery } from '../../redux/api/api';
import { POSITION_KEY } from '../../libs/constant';

interface IPassengerComponent {
    position: Position,
    setPassenger: (e: IClient) => void,
}

export default function FindPassenger({ position, setPassenger }: IPassengerComponent) {
    const { register, handleSubmit, setValue } = useForm<IClient>();
    const [getPhone, { data, isLoading, isError, error }] = useLazyGetClientQuery();
    const [isFind, setIsFind] = useState<boolean>(false);

    const onSubmit: SubmitHandler<IClient> = async (data) => {
        try {
            // хуйня только для чтения, поэтому копирую в новый объект
            const response = await getPhone(data).unwrap();
            if (response.message === 'dont client') {
                setIsFind(true);
            } else {
                const copyResponse = { ...response, position }
                setPassenger(copyResponse);
                setIsFind(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {isFind &&
                <div>Пассажир не найден</div>
            }
            <Form onSubmit={handleSubmit(onSubmit)}>
                <span>Ведите номер телефона</span>
                <InputGroup className="mb-3" size="sm">
                    <InputGroup.Text id={position}>{POSITION_KEY[position]}</InputGroup.Text>
                    <Form.Control
                        {...register("phone")}
                        aria-describedby={position}
                    />
                    <Button variant="primary" type="submit">
                        Найти
                    </Button>
                </InputGroup>
            </Form>
        </>
    )
}