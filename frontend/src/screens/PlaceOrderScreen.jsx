import React, { useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { clearCartItems } from '../slices/cartSlice';
import { useCreateReservationMutation } from '../slices/reservationApiSlice';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);
    const [createReservation] = useCreateReservationMutation();
    const reservationContact = useMemo(
        () => cart.reservationContact || cart.shippingAddress || {},
        [cart.reservationContact, cart.shippingAddress]
    );

    useEffect(() => {
        if (!reservationContact.name && !reservationContact.address) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.paymentMethod, reservationContact, navigate]);

    const placeOrderHandler = async () => {
        const reservation = {
            reservationItems: cart.cartItems.map((item) => ({
                name: item.name,
                qty: item.qty,
                image: item.image,
                price: item.price,
                product: item.productId || item.product || item._id,
                slot: item.slot,
                selectedSlot: item.selectedSlot,
                addOns: item.addOns || [],
            })),
            reservationDetails: {
                name: reservationContact.name || reservationContact.address,
                email: reservationContact.email || reservationContact.city,
                phone: reservationContact.phone || reservationContact.postalCode,
                note: reservationContact.note || reservationContact.country,
            },
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            taxPrice: cart.taxPrice,
            servicePrice: cart.shippingPrice,
            totalPrice: cart.totalPrice,
        };

        if (!userInfo) {
            navigate('/login?redirect=/placeorder');
            return;
        }

        try {
            const createdReservation = await createReservation(reservation).unwrap();
            dispatch(clearCartItems());
            toast.success('Rezervacija je uspesno zabelezena');
            navigate(`/reservation/${createdReservation._id}`);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
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
                                <strong>Ime:</strong> {reservationContact.name || reservationContact.address}<br />
                                <strong>Email:</strong> {reservationContact.email || reservationContact.city}<br />
                                <strong>Telefon:</strong> {reservationContact.phone || reservationContact.postalCode}<br />
                                <strong>Napomena:</strong> {reservationContact.note || reservationContact.country || 'Nema napomene'}
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
