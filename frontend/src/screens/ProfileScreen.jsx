import { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { setCredentials } from '../slices/authSlice';
import { useGetMyReservationsQuery } from '../slices/reservationApiSlice';
import { useProfileMutation } from '../slices/usersApiSlice';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const { data: reservations, isLoading, error } = useGetMyReservationsQuery();
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Lozinke se ne poklapaju');
      return;
    }

    try {
      const res = await updateProfile({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Profil je azuriran');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>Profil korisnika</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group className='my-2' controlId='name'>
            <Form.Label>Ime</Form.Label>
            <Form.Control
              type='text'
              placeholder='Unesite ime'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='my-2' controlId='email'>
            <Form.Label>Email adresa</Form.Label>
            <Form.Control
              type='email'
              placeholder='Unesite email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='my-2' controlId='password'>
            <Form.Label>Lozinka</Form.Label>
            <Form.Control
              type='password'
              placeholder='Unesite novu lozinku'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='my-2' controlId='confirmPassword'>
            <Form.Label>Potvrdite lozinku</Form.Label>
            <Form.Control
              type='password'
              placeholder='Potvrdite novu lozinku'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {loadingUpdateProfile && <Loader />}
          <Button type='submit' variant='primary' className='mt-2'>
            Azurirajte profil
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h2>Moje rezervacije</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error?.data?.message || error.error}</Message>
        ) : (
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Datum</th>
                <th>Ukupna cena</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation._id}>
                  <td>{reservation._id}</td>
                  <td>{reservation.createdAt.substring(0, 10)}</td>
                  <td>{reservation.totalPrice} RSD</td>
                  <td>
                    {reservation.status === 'active' ? (
                      'Aktivna'
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <Button
                      as={Link}
                      to={`/reservation/${reservation._id}`}
                      variant='light'
                      className='btn-sm'
                    >
                      Detalji
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
