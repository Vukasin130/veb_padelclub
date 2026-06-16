import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import { setCredentials } from '../slices/authSlice';
import { useLoginMutation } from '../slices/usersApiSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirect = new URLSearchParams(search).get('redirect') || '/';
  const { userInfo } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await login({ email, password }).unwrap();
      dispatch(setCredentials(data));
      toast.success('Uspesno ste se prijavili');
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <FormContainer>
      <h1>Prijava</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className='my-2'>
          <Form.Label>Email adresa</Form.Label>
          <Form.Control
            type='email'
            placeholder='Unesite email'
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='password' className='my-2'>
          <Form.Label>Lozinka</Form.Label>
          <Form.Control
            type='password'
            placeholder='Unesite lozinku'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button type='submit' variant='primary' className='my-2' disabled={isLoading}>
          Prijavi se
        </Button>
      </Form>

      <p className='mt-3'>
        Nemate nalog? <Link to={`/register?redirect=${redirect}`}>Registrujte se</Link>
      </p>
    </FormContainer>
  );
};

export default LoginScreen;
