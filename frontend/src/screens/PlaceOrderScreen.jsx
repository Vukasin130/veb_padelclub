import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { clearCartItems } from '../slices/cartSlice';
import { saveReservation } from '../services/reservationService';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    const placeOrderHandler = () => {
        const reservation = {
            id: Date.now(),
            items: cart.cartItems,
            reservationDetails: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            totalPrice: cart.totalPrice,
        };

        saveReservation(reservation);
        dispatch(clearCartItems());
        toast.success('Rezervacija je uspesno zabelezena');
        navigate('/');
    };

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Podaci za rezervaciju</h2>
                            <p>
                                <strong>Ime:</strong> {cart.shippingAddress.address}<br />
                                <strong>Email:</strong> {cart.shippingAddress.city}<br />
                                <strong>Telefon:</strong> {cart.shippingAddress.postalCode}<br />
                                <strong>Napomena:</strong> {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Nacin placanja</h2>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Izabrane stavke</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>Nema izabranih stavki</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.productId || item._id}`} >
                                                        {item.name}
                                                    </Link>
                                                    {item.selectedSlot && (
                                                        <div className='cart-slot-note'>
                                                            {item.selectedSlot.date} | {item.selectedSlot.time} | {item.selectedSlot.duration}
                                                        </div>
                                                    )}
                                                    {item.addOns?.length > 0 && (
                                                        <div className='cart-slot-note'>
                                                            Dodatno: {item.addOns.map((addOn) => addOn.name).join(', ')}
                                                        </div>
                                                    )}
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x {item.price} RSD = {item.qty * item.price} RSD
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Rezime rezervacije</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Stavke</Col>
                                    <Col>{cart.itemsPrice} RSD</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Naknada</Col>
                                    <Col>{cart.shippingPrice} RSD</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>PDV</Col>
                                    <Col>{cart.taxPrice} RSD</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Ukupno</Col>
                                    <Col>{cart.totalPrice} RSD</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Potvrdi rezervaciju
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;
