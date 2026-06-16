import { Badge, Button, ListGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import {
  useCancelReservationMutation,
  useGetReservationsQuery,
} from '../../slices/reservationApiSlice';

const ReservationListScreen = () => {
  const { data: reservations, isLoading, error, refetch } = useGetReservationsQuery();
  const [cancelReservation, { isLoading: loadingCancel }] =
    useCancelReservationMutation();

  const cancelHandler = async (reservationId) => {
    if (window.confirm('Da li ste sigurni da zelite da ponistite rezervaciju?')) {
      try {
        await cancelReservation(reservationId).unwrap();
        toast.success('Rezervacija je ponistena');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <h1>Rezervacije</h1>
      {loadingCancel && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : reservations.length === 0 ? (
        <Message>Nema rezervacija.</Message>
      ) : (
        <ListGroup variant='flush'>
          {reservations.map((reservation) => (
            <ListGroup.Item key={reservation._id}>
              <div className='admin-reservation-row'>
                <div>
                  <strong>{reservation.reservationDetails.name}</strong>
                  <span>
                    {reservation.user?.email} | {reservation.reservationDetails.phone}
                  </span>
                  {reservation.reservationItems.map((item) => (
                    <small key={`${reservation._id}-${item.name}`}>
                      {item.name} | {item.selectedSlot?.court}
                    </small>
                  ))}
                </div>
                <div className='admin-reservation-actions'>
                  <Badge bg={reservation.status === 'active' ? 'success' : 'secondary'}>
                    {reservation.status === 'active' ? 'Aktivna' : 'Ponistena'}
                  </Badge>
                  {reservation.status === 'active' && (
                    <Button
                      variant='outline-danger'
                      size='sm'
                      onClick={() => cancelHandler(reservation._id)}
                    >
                      Ponisti
                    </Button>
                  )}
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default ReservationListScreen;
