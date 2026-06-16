import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import { setCredentials } from '../slices/authSlice';
import { useRegisterMutation } from '../slices/usersApiSlice';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirect = new URLSearchParams(search).get('redirect') || '/';
  const { userInfo } = useSelector((state) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Lozinke se ne poklapaju');
      return;
    }

    try {
      const data = await register({ name, email, password }).unwrap();
      dispatch(setCredentials(data));
      toast.success('Nalog je napravljen');
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <FormContainer>
      <h1>Registracija</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='my-2'>
          <Form.Label>Ime i prezime</Form.Label>
          <Form.Control
            type='text'
            placeholder='Unesite ime i prezime'
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

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

        <Form.Group controlId='confirmPassword' className='my-2'>
          <Form.Label>Potvrda lozinke</Form.Label>
          <Form.Control
            type='password'
            placeholder='Ponovite lozinku'
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button type='submit' variant='primary' className='my-2' disabled={isLoading}>
          Registruj se
        </Button>
      </Form>

      <p className='mt-3'>
        Vec imate nalog? <Link to={`/login?redirect=${redirect}`}>Prijavite se</Link>
      </p>
    </FormContainer>
  );
};

export default RegisterScreen;
