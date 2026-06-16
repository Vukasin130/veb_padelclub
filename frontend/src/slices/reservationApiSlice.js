import { RESERVATIONS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const reservationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReservation: builder.mutation({
      query: (reservation) => ({
        url: RESERVATIONS_URL,
        method: 'POST',
        body: reservation,
      }),
      invalidatesTags: ['Reservation', 'Product', 'Slot'],
    }),
    getReservationDetails: builder.query({
      query: (reservationId) => ({
        url: `${RESERVATIONS_URL}/${reservationId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyReservations: builder.query({
      query: () => ({
        url: `${RESERVATIONS_URL}/mine`,
      }),
      providesTags: ['Reservation'],
      keepUnusedDataFor: 5,
    }),
    getReservations: builder.query({
      query: () => ({
        url: RESERVATIONS_URL,
      }),
      providesTags: ['Reservation'],
      keepUnusedDataFor: 5,
    }),
    cancelReservation: builder.mutation({
      query: (reservationId) => ({
        url: `${RESERVATIONS_URL}/${reservationId}/cancel`,
        method: 'PUT',
      }),
      invalidatesTags: ['Reservation', 'Product', 'Slot'],
    }),
  }),
});

export const {
  useCreateReservationMutation,
  useGetReservationDetailsQuery,
  useGetMyReservationsQuery,
  useGetReservationsQuery,
  useCancelReservationMutation,
} = reservationsApiSlice;
