import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import { IEvent, IModalAddEvent, IRide } from '../../../type/interface';
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { timeZoneSkip } from '../../../libs/dateConvert';
import { useAddRouteMutation } from '../../../redux/api/api';
import "./modalAddEvent.css"

export default function ModalAddEvent({ show, setShow }: IModalAddEvent) {
  const { register, handleSubmit, control } = useForm<IEvent>({
    defaultValues: {
        seats: 12,
    }
});

  const [addRoute] = useAddRouteMutation();

  const onSubmit: SubmitHandler<IEvent> = (data) => {
    const fixData = {
      // число мест по дефолту установлено в -1, что значит не объявлено (обновляется при добавлении поездки)
      ...data, start: timeZoneSkip(data.start), seats: -1
    }
    addRoute(fixData);
    setShow(false);
  }

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
                <Controller
                  control={control}
                  name="start"
                  defaultValue={new Date()}
                  render={({ field: { onChange, value} }) => (
                    <ReactDatePicker
                      // wrapperClassName="customDatePicker"
                      onChange={onChange}
                      selected={value}
                    />
                  )}
                />
              </InputGroup>
              {/* <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon2">Места</InputGroup.Text>
                <Form.Control
                  {...register("seats")}
                  placeholder="12"
                  aria-describedby="basic-addon2"
                />
              </InputGroup> */}
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
              Закрыть
            </Button>
            <Button variant="primary" type="submit">
              Сохранить
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}