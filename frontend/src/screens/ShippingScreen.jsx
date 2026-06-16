import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { saveReservationContact } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';


const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);
    const reservationContact = cart.reservationContact || cart.shippingAddress || {};

    const [name, setName] = useState(reservationContact?.name || reservationContact?.address || userInfo?.name || '');
    const [email, setEmail] = useState(reservationContact?.email || reservationContact?.city || userInfo?.email || '');
    const [phone, setPhone] = useState(reservationContact?.phone || reservationContact?.postalCode || '');
    const [note, setNote] = useState(reservationContact?.note || reservationContact?.country || '');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveReservationContact({ name, email, phone, note }));
        navigate('/payment');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Kontakt podaci</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='my-2'>
                    <Form.Label>Ime i prezime</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Unesite ime i prezime'
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='email' className='my-2'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Unesite email adresu'
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='phone' className='my-2'>
                    <Form.Label>Kontakt telefon</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Unesite broj telefona'
                        value={phone}
                        required
                        onChange={(e) => setPhone(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='note' className='my-2'>
                    <Form.Label>Napomena</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Broj igraca ili posebna napomena'
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='my-2'>
                    Nastavi
                </Button>
            </Form>
        </FormContainer>
    )
};

export default ShippingScreen;
