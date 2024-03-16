import { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useForm, SubmitHandler } from "react-hook-form";
import { IClient, Position } from '../../type/interface';
import { useLazyGetClientByPhoneQuery } from '../../redux/api/api';
import { POSITION_KEY } from '../../libs/constant';

interface IPassengerComponent {
    passenger: IClient,
    setPassenger: SubmitHandler<IClient>,
}

export default function PassengerControl({ passenger, setPassenger }: IPassengerComponent) {
    const { register, handleSubmit, setValue } = useForm<IClient>({
        defaultValues: passenger
    });
    const [getPhone, { data, isLoading, isError, error }] = useLazyGetClientByPhoneQuery(); // api для запроса по событию
    const [isFind, setIsFind] = useState<boolean>(false);

    const onSubmit: SubmitHandler<IClient> = async (data) => {
        try {
            const response = await getPhone(data).unwrap();
            if (response.message === 'dont client') {
                setIsFind(true);
            } else {
                const copyResponse = { ...response, position: passenger.position }
                setPassenger(copyResponse);
                setIsFind(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Form onSubmit={!isFind ? handleSubmit(onSubmit) : handleSubmit(setPassenger)}>
                {isFind ?
                    <span>Пассажир не найден. Добавте нового.</span>
                    :
                    <span>Ведите номер телефона</span>
                }
                <InputGroup className="mb-3" size="sm">
                    <InputGroup.Text id={passenger.position}>{POSITION_KEY[passenger.position]}</InputGroup.Text>
                    <Form.Control
                        {...register("phone")}
                        aria-describedby={passenger.position}
                    />
                    {!isFind &&
                        <Button variant="primary" type="submit">
                            Найти
                        </Button>
                    }
                </InputGroup>
                {isFind &&
                    <>
                        <InputGroup className="mb-3" size="sm">
                            <InputGroup.Text id="position_name">Имя</InputGroup.Text>
                            <Form.Control
                                {...register("name")}
                                aria-describedby="position_name"
                            />
                        </InputGroup>
                        <Button variant="primary" type="submit">
                            Добавить
                        </Button>
                    </>
                }
            </Form>
        </>
    )
}