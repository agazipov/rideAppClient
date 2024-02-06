import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import { IEvent, IModalAddEvent, IRide } from '../../type/interface';
import { useForm, SubmitHandler } from "react-hook-form"
import { fetchAddEvent } from '../../api/api';

export default function ModalAddEvent({ show, setShow, addEvent }: IModalAddEvent) {
  const { register, handleSubmit } = useForm<IEvent>();
  const onSubmit: SubmitHandler<IEvent> = (data) => {
    fetchAddEvent(data)
      .then(() => addEvent(data))
      .catch((err) => console.log('ошибка отправки формы', err.message))
    setShow(false);
  }
  console.log('render modal add event');
  

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить маршрут</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Дата поездки</InputGroup.Text>
                <Form.Control
                  {...register("start")}
                  placeholder="2024-02-10"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon2">Места</InputGroup.Text>
                <Form.Control
                  {...register("seats")}
                  placeholder="9"
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Select aria-label="Default select example" {...register("title")}>
                <option>Выберите направление маршрута</option>
                <option value="Бак-Чел">Бакал-Сатка-Челябинск</option>
                <option value="Чел-Бак">Челябинск-Сатка-Бакал</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}