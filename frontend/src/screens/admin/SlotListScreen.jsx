import { useState } from 'react';
import { Badge, Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useGetProductsQuery } from '../../slices/productApiSlice';
import {
  useCreateSlotMutation,
  useDeleteSlotMutation,
  useGetSlotsQuery,
} from '../../slices/slotApiSlice';

const SlotListScreen = () => {
  const [product, setProduct] = useState('');
  const [dateLabel, setDateLabel] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('60 min');
  const [court, setCourt] = useState('Teren 1');
  const [price, setPrice] = useState(2400);

  const { data: products, isLoading: loadingProducts } = useGetProductsQuery();
  const { data: slots, isLoading, error, refetch } = useGetSlotsQuery();
  const [createSlot, { isLoading: loadingCreate }] = useCreateSlotMutation();
  const [deleteSlot, { isLoading: loadingDelete }] = useDeleteSlotMutation();

  const selectedProduct = product || products?.[0]?._id || '';

  const createSlotHandler = async (e) => {
    e.preventDefault();

    try {
      await createSlot({
        product: selectedProduct,
        dateLabel,
        time,
        duration,
        court,
        price: Number(price),
      }).unwrap();
      toast.success('Termin je dodat');
      setDateLabel('');
      setTime('');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const deleteHandler = async (slotId) => {
    if (window.confirm('Da li ste sigurni da zelite da uklonite termin?')) {
      try {
        await deleteSlot(slotId).unwrap();
        toast.success('Termin je uklonjen');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <h1>Termini</h1>
      {(loadingCreate || loadingDelete) && <Loader />}
      <Row className='g-4'>
        <Col lg={4}>
          <Card className='admin-panel'>
            <Card.Body>
              <h4>Dodaj slobodan termin</h4>
              {loadingProducts ? (
                <Loader />
              ) : (
                <Form onSubmit={createSlotHandler}>
                  <Form.Group className='my-2' controlId='product'>
                    <Form.Label>Ponuda</Form.Label>
                    <Form.Select
                      value={selectedProduct}
                      onChange={(e) => setProduct(e.target.value)}
                      required
                    >
                      {products.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className='my-2' controlId='dateLabel'>
                    <Form.Label>Dan</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Ponedeljak, 15. jun'
                      value={dateLabel}
                      required
                      onChange={(e) => setDateLabel(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className='my-2' controlId='time'>
                    <Form.Label>Vreme</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='18:00'
                      value={time}
                      required
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className='my-2' controlId='duration'>
                    <Form.Label>Trajanje</Form.Label>
                    <Form.Control
                      type='text'
                      value={duration}
                      required
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className='my-2' controlId='court'>
                    <Form.Label>Teren</Form.Label>
                    <Form.Control
                      type='text'
                      value={court}
                      required
                      onChange={(e) => setCourt(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className='my-2' controlId='price'>
                    <Form.Label>Cena</Form.Label>
                    <Form.Control
                      type='number'
                      value={price}
                      required
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Group>

                  <Button type='submit' className='my-2'>
                    Dodaj termin
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error?.data?.message || error.error}</Message>
          ) : slots.length === 0 ? (
            <Message>Nema termina.</Message>
          ) : (
            <Table responsive hover className='admin-table'>
              <thead>
                <tr>
                  <th>Ponuda</th>
                  <th>Dan</th>
                  <th>Vreme</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {slots.map((slot) => (
                  <tr key={slot._id}>
                    <td>{slot.product?.name}</td>
                    <td>{slot.dateLabel}</td>
                    <td>{slot.time}</td>
                    <td>
                      {slot.reservedBy ? (
                        <Badge bg='danger'>{slot.reservedBy.contactName}</Badge>
                      ) : (
                        <Badge bg={slot.isActive ? 'success' : 'secondary'}>
                          {slot.isActive ? 'Slobodan' : 'Uklonjen'}
                        </Badge>
                      )}
                    </td>
                    <td>
                      {!slot.reservedBy && slot.isActive && (
                        <Button
                          variant='outline-danger'
                          size='sm'
                          onClick={() => deleteHandler(slot._id)}
                        >
                          Ukloni
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default SlotListScreen;
