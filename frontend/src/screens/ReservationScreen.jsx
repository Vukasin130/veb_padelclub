import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetReservationDetailsQuery } from '../slices/reservationApiSlice';

const ReservationScreen = () => {
  const { id: reservationId } = useParams();
  const {
    data: reservation,
    isLoading,
    error,
  } = useGetReservationDetailsQuery(reservationId);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <>
      <h1>Rezervacija {reservation._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Kontakt podaci</h2>
              <p>
                <strong>Ime:</strong> {reservation.reservationDetails.name}
              </p>
              <p>
                <strong>Email:</strong> {reservation.reservationDetails.email}
              </p>
              <p>
                <strong>Telefon:</strong> {reservation.reservationDetails.phone}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                {reservation.status === 'active' ? 'Aktivna' : 'Ponistena'}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Nacin placanja</h2>
              <p>{reservation.paymentMethod}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Stavke rezervacije</h2>
              {reservation.reservationItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                      {item.selectedSlot && (
                        <div className='cart-slot-note'>
                          {item.selectedSlot.date} | {item.selectedSlot.time} |{' '}
                          {item.selectedSlot.court}
                        </div>
                      )}
                    </Col>
                    <Col md={4}>
                      {item.qty} x {item.price} RSD = {item.qty * item.price} RSD
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Rezime</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Stavke</Col>
                  <Col>{reservation.itemsPrice} RSD</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Naknada</Col>
                  <Col>{reservation.servicePrice} RSD</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>PDV</Col>
                  <Col>{reservation.taxPrice} RSD</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Ukupno</Col>
                  <Col>{reservation.totalPrice} RSD</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button as={Link} to='/' className='btn-block'>
                  Nazad na ponudu
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ReservationScreen;
