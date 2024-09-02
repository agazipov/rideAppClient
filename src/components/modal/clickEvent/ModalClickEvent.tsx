import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IModalClickEvent } from '../../../type/interface';
import './modalClickEvent.css'
import { useState } from 'react';
import RideForm from '../../rideForm/RideForm';
import RideContainer from '../../rideContainer/RideContainer';
import { useDeleteRouteMutation, useGetRideQuery, useGetRouteState } from '../../../redux/api/api';
import { useAuth } from '../../../hooks/useAuth';

export default function ModalClickEvent({
    id,
    setShow
}: IModalClickEvent) {   
    const [isAddRide, setIsAddRide] = useState<boolean>(false);
    const auth = useAuth();

    const handleClose = () => setShow(null);

    const { data: rides } = useGetRideQuery(id);

    const [deleteRoute] = useDeleteRouteMutation();
    // получаю евент из стейта
    const { data } = useGetRouteState();
    const findEvent = data?.find(e => e.id === id);

    return (
        <>
            {rides && findEvent &&
                <Modal show={!!rides} onHide={handleClose} fullscreen='xxl-down'>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Маршрут {findEvent.title} / {findEvent.seats !== 0 ? findEvent.seats : 'нет мест'} от {findEvent.start.toString()}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='rideList'>
                            {rides.map((ride) => {
                                return (
                                    <RideContainer ride={ride} event={findEvent} key={ride.id} />
                                )
                            })}
                            {auth.token && <div className={isAddRide ? 'addRideGroupe_stretch' : 'addRideGroupe_right'}>
                                {isAddRide && <RideForm show={setIsAddRide} event={findEvent} />}
                                <div>
                                    <Button onClick={() => setIsAddRide(!isAddRide)}>
                                        {isAddRide ? 'Не добавлять' : 'Добавить поездку'}
                                    </Button>
                                </div>
                            </div>}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Закрыть
                        </Button>
                        {auth.token && <Button variant="danger" onClick={() => {
                            deleteRoute(findEvent.id);
                            handleClose();
                        }}>
                            Удалить маршрут
                        </Button>}
                    </Modal.Footer>
                </Modal>}
        </>
    );
}