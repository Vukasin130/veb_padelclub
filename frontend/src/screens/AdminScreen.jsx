import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminScreen = () => {
  return (
    <>
      <h1>Administracija</h1>
      <Row className='g-3'>
        <Col md={4}>
          <Button as={Link} to='/admin/reservationlist' className='w-100'>
            Rezervacije
          </Button>
        </Col>
        <Col md={4}>
          <Button as={Link} to='/admin/slotlist' className='w-100'>
            Termini
          </Button>
        </Col>
        <Col md={4}>
          <Button as={Link} to='/admin/productlist' className='w-100'>
            Ponuda
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default AdminScreen;
