import { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useForm, SubmitHandler } from "react-hook-form";
import { IClient, Position } from '../../type/interface';
import { useLazyGetClientQuery } from '../../redux/api/api';
import AddPassenger from '../addPassenger/AddPassenger';
import FindPassenger from '../findPassenger/FindPassenger';

interface IPassengerComponent {
    passenger: IClient,
    setPassenger: SubmitHandler<IClient>,
}

export default function PassengerContainer({ passenger, setPassenger }: IPassengerComponent) {
    const [isPassenger, setIsPassenger] = useState<string>('');
    const [key, setKey] = useState<string>('add');    

    return (
        <div>
            <Tabs
                id="controlled-tab"
                activeKey={key}
                onSelect={(k) => k && setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="add" title="Создать">
                    <AddPassenger passenger={passenger} setPassenger={setPassenger} />
                </Tab>
                <Tab eventKey="find" title="Найти">
                    <FindPassenger position={passenger.position} setPassenger={setPassenger} />
                </Tab>
            </Tabs>
            {/* {isPassenger ?
                <AddPassenger passenger={passenger} phone={isPassenger} setPassenger={setPassenger} />
                :
                <FindPassenger position={passenger.position} setShow={setIsPassenger} setPassenger={setPassenger} />
            } */}
        </div>
    )
}