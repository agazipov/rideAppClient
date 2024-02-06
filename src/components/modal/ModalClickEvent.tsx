import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IModalClickEvent } from '../../type/interface';
import './modalClickEvent.css'
import React, { useState } from 'react';
import { RideForm } from '../rideForm/RideForm';
import { Ride } from '../ride/Ride';
import { fetchDeleteEvent, fetchDeleteRide } from '../../api/api';

export default function ModalClickEvent({ show, setShow, content: { event, rides } }: IModalClickEvent) {
  const [isVisibleForm, setVisibleForm] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleDeleteEvent = () => {
    fetchDeleteEvent(event)
      .then(response => console.log(response))
      .catch(err => console.log('ивент не удалось удалить', err))
    setShow(false);
  };
  const handleDeleteRide = (index: number) => {
    fetchDeleteRide(rides[index])
      .then(response => console.log(response))
      .catch(err => console.log('поездку не удалось удалить', err))
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Маршрут {event.title} от {event.start}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='rideList'>
            {rides.map((ride, index) => {
              return (
                <div key={ride.id}>
                  <Button onClick={() => handleDeleteRide(index)} variant="secondary">Удалить поездку</Button>
                  <Ride ride={ride} />
                </div>
              )
            })}
            <div>
              <Button onClick={() => setVisibleForm(!isVisibleForm)}>
                {!isVisibleForm ? 'Добавить поездку' : 'Не добавлять'}
              </Button>
              {isVisibleForm && <RideForm type='add' event={event} />}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={handleDeleteEvent}>
            Удалить евент
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}