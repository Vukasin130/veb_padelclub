import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Form, Row, Col, Image, Card, Button, Badge } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { addToCart } from '../slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useGetProductDetailsQuery } from '../slices/productApiSlice'

const ProductScreen = () => {
    const { id: productId } = useParams();
    const [qty, setQty] = useState(1);
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [includeRacket, setIncludeRacket] = useState(false);
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
    const hasSlotPicker = Boolean(product?.availableSlots?.length);
    const activeDay = hasSlotPicker ? product.availableSlots[selectedDayIndex] : null;
    const racketPrice = includeRacket ? 500 : 0;
    const displayPrice = (selectedSlot?.price || product?.price || 0) + racketPrice;

    const addToCartHandler = () => {
        if (!userInfo) {
            navigate(`/login?redirect=/product/${productId}`);
            return;
        }

        if (hasSlotPicker && !selectedSlot) {
            return;
        }

        const reservationItem = hasSlotPicker
            ? {
                ...product,
                _id: `${product._id}-${selectedSlot.id}`,
                productId: product._id,
                product: product._id,
                slot: selectedSlot._id || selectedSlot.id,
                name: `${product.name} - ${selectedSlot.date} u ${selectedSlot.time}`,
                price: selectedSlot.price + racketPrice,
                qty: 1,
                countInStock: 1,
                selectedSlot,
                addOns: includeRacket ? [{ name: 'Iznajmljivanje reketa', price: 500 }] : [],
            }
            : { ...product, product: product._id, qty };

        dispatch(addToCart(reservationItem));
        navigate('/cart');
    }

    return (<>
        <Link className='btn btn-outline-secondary mb-4' to='/'>
            Nazad
        </Link>
        {isLoading ? (
            <Loader />
        ) : error ? (
            <Message variant="danger">{error?.data?.message || error.error}</Message>
        ) : !product ? (
            <Message variant="danger">Ponuda nije pronadjena</Message>
        ) : (
            <><Card className='detail-summary p-4 mb-4'>
                <Row className='align-items-center'>
                    <Col md={8}>
                        <h2 className='mb-2'>{product.name}</h2>
                        <Rating
                            value={product.rating}
                            text={`${product.numReviews} recenzija`} />
                    </Col>
                    <Col md={4} className='text-md-end mt-3 mt-md-0'>
                        <h3 className='text-primary mb-0'>
                            {displayPrice?.toFixed(2)} RSD
                        </h3>
                    </Col>
                </Row>
            </Card><Row className='gy-4'>
                    <Col lg={8}>
                        <Card className='detail-media-card p-4'>
                            <div className='text-center'>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fluid
                                    style={{
                                        maxHeight: '500px',
                                        objectFit: 'cover',
                                        width: '100%'
                                    }} />
                            </div>
                        </Card>
                        {hasSlotPicker && (
                            <Card className='slot-picker-card mt-4'>
                                <Card.Body>
                                    <div className='slot-picker-heading'>
                                        <div>
                                            <span>Slobodni termini</span>
                                            <h4>Izaberi dan i sat</h4>
                                        </div>
                                        <Badge className='slot-count-badge'>
                                            {product.countInStock} termina
                                        </Badge>
                                    </div>
                                    <div className='day-tabs'>
                                        {product.availableSlots.map((day, index) => (
                                            <button
                                                key={day.date}
                                                type='button'
                                                className={index === selectedDayIndex ? 'day-tab active' : 'day-tab'}
                                                onClick={() => {
                                                    setSelectedDayIndex(index);
                                                    setSelectedSlot(null);
                                                }}
                                            >
                                                {day.date}
                                            </button>
                                        ))}
                                    </div>
                                    {activeDay.slots.length === 0 ? (
                                        <Message>Nema vise slobodnih termina za ovaj dan.</Message>
                                    ) : (
                                        <div className='slot-grid'>
                                            {activeDay.slots.map((slot) => {
                                                const slotWithDate = { ...slot, date: activeDay.date };
                                                const isSelected = selectedSlot?.id === slot.id;

                                                return (
                                                    <button
                                                        key={slot.id}
                                                        type='button'
                                                        className={isSelected ? 'slot-card selected' : 'slot-card'}
                                                        onClick={() => setSelectedSlot(slotWithDate)}
                                                    >
                                                        <strong>{slot.time}</strong>
                                                        <span>{slot.duration}</span>
                                                        <small>{slot.court}</small>
                                                        <em>{slot.price} RSD</em>
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        )}
                    </Col>
                    <Col lg={4}>
                        <Card className='detail-info-card'>
                            <Card.Body>
                                <h4 className='mb-4'>Informacije o ponudi</h4>
                                <div className='d-flex justify-content-between mb-3'>
                                    <span>Kategorija:</span>
                                    {product.category}
                                </div>
                                <div className='d-flex justify-content-between align-items-center mb-4'>
                                    <span>Status:</span>
                                    {product.countInStock > 0 ? (
                                        <Badge bg='success'>Slobodno</Badge>
                                    ) : (
                                        <Badge bg='danger'>Nema termina</Badge>
                                    )}
                                </div>
                                {hasSlotPicker && (
                                    <div className='selected-slot-summary'>
                                        <span>Izabrani termin</span>
                                        {selectedSlot ? (
                                            <>
                                                <strong>{selectedSlot.date}</strong>
                                                <p>{selectedSlot.time} | {selectedSlot.duration} | {selectedSlot.court}</p>
                                            </>
                                        ) : (
                                            <p>Izaberi jedan od slobodnih termina.</p>
                                        )}
                                    </div>
                                )}
                                {product.allowRacketRental && (
                                    <label className='addon-option'>
                                        <input
                                            type='checkbox'
                                            checked={includeRacket}
                                            onChange={(e) => setIncludeRacket(e.target.checked)}
                                        />
                                        <span>
                                            <strong>Dodaj iznajmljivanje reketa</strong>
                                            <small>+500 RSD za izabrani termin</small>
                                        </span>
                                    </label>
                                )}
                                {!hasSlotPicker && product.countInStock > 0 && (
                                    <div className='d-flex justify-content-between align-items-center mb-4'>
                                        <span>Kolicina:</span>
                                        <Form.Control
                                            as='select'
                                            value={qty}
                                            onChange={(e) =>
                                                setQty(Number(e.target.value))}
                                            style={{
                                                width: '90px', textAlign:
                                                    'center'
                                            }}
                                        >
                                            {[...Array(product.countInStock).keys
                                                ()].map((x) => (
                                                    <option key={x + 1} value={x +
                                                        1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                        </Form.Control>
                                    </div>
                                )}
                                <div className='d-grid'>
                                    <Button
                                        className='add-to-cart-btn'
                                        type='button'
                                        disabled={product.countInStock === 0 || (hasSlotPicker && !selectedSlot)}
                                        onClick={addToCartHandler}
                                    >
                                        {userInfo ? 'Dodaj u rezervacije' : 'Prijavi se za rezervaciju'}
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row><Card className='detail-description mt-4'>
                    <Card.Body>
                        <h4 className='mb-3'>Opis ponude</h4>
                        <p className='text-muted mb-0'>{product.description}</p>
                    </Card.Body>
                </Card></>
        )}
    </>)
}
export default ProductScreen
