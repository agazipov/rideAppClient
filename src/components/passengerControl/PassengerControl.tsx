import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { IClient } from '../../type/interface';
import { useLazyGetClientByPhoneQuery } from '../../redux/api/api';
import { POSITION_KEY } from '../../libs/constant';
import { useMask } from '@react-input/mask';

interface IPassengerComponent {
    passenger: IClient,
    setPassenger: SubmitHandler<IClient>,
}

export default function PassengerControl({ passenger, setPassenger }: IPassengerComponent) {
    const { register, handleSubmit, control, setValue } = useForm<IClient>({
        defaultValues: passenger
    });
    const [getPhone, { data, isLoading, isError, error }] = useLazyGetClientByPhoneQuery(); // api для запроса по событию
    const [isFind, setIsFind] = useState<boolean>(false);
     
    const onSubmit: SubmitHandler<IClient> = async (data) => {        
        try {
            const response = await getPhone(data.phone).unwrap();
            if (response.message === 'dont client') {
                setValue('isFind', false);
                setIsFind(true);
            } else {
                const copyResponse = { ...response, position: passenger.position, isFind: true }
                setPassenger(copyResponse);
                setIsFind(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const inputRef = useMask({
        mask: "+7 (___) ___-__-__",
        replacement: { _: /\d/ },
        showMask: true,
    });

return (
    <>
        <Form onSubmit={!isFind ? handleSubmit(onSubmit) : handleSubmit(setPassenger)} style={{width: '100%'}}>
            {isFind ?
                <span>Пассажир не найден. Добавте нового.</span>
                :
                <span>Ведите номер телефона</span>
            }
            <InputGroup className="mb-3" size="sm">
                <InputGroup.Text id={passenger.position}>{POSITION_KEY[passenger.position]}</InputGroup.Text>
                <Controller
                    control={control}
                    name="phone"
                    render={({ field }) => (
                        <Form.Control
                            {...field}
                            ref={inputRef}
                            placeholder="+7 (___) ___-__-__"
                            aria-describedby={passenger.position}
                        />
                    )}
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