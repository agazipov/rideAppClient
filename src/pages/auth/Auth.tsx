import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm, SubmitHandler } from "react-hook-form";
import './auth.css';
import { useEntryMutation } from '../../redux/api/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/authSlice';
import { ILoginForm } from '../../type/interface';

export default function Auth() {
    const { register, handleSubmit } = useForm<ILoginForm>();
    const [login, {data:  result, isSuccess}] = useEntryMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onsubmit: SubmitHandler<ILoginForm> = async (data) => {
        const { name, password, session } = data;
        try {
            const auth = await login({ name, password }).unwrap();
            session && window.localStorage.setItem('token', auth.token);
            dispatch(setCredentials(auth))
            navigate('/admin');
        } catch (error) {
            console.log('login error', error);
        }
    };

    return (
        <div className='auth'>
            <Form onSubmit={handleSubmit(onsubmit)} autoComplete="off">
                <Form.Group className="mb-3" controlId="formBasicLogin">
                    <Form.Label>Логин</Form.Label>
                    <Form.Control type="text" placeholder="Введте логин" {...register("name")} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="Пароль" {...register("password")} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Запомнить меня" {...register("session")} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Войти
                </Button>
            </Form>
        </div>
    )
}