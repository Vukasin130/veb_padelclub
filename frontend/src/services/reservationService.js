import { API_BASE_URL } from '../config/apiConfig';

export const saveReservation = (reservation) => {
    if (API_BASE_URL) {
        // Ovde se kasnije povezuje POST /api/reservations.
    }

    localStorage.setItem('lastReservation', JSON.stringify(reservation));
    return reservation;
};
