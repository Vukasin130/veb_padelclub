import { SLOTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const slotsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSlots: builder.query({
      query: () => ({
        url: SLOTS_URL,
      }),
      providesTags: ['Slot'],
      keepUnusedDataFor: 5,
    }),
    createSlot: builder.mutation({
      query: (slot) => ({
        url: SLOTS_URL,
        method: 'POST',
        body: slot,
      }),
      invalidatesTags: ['Slot', 'Product'],
    }),
    deleteSlot: builder.mutation({
      query: (slotId) => ({
        url: `${SLOTS_URL}/${slotId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Slot', 'Product'],
    }),
  }),
});

export const {
  useGetSlotsQuery,
  useCreateSlotMutation,
  useDeleteSlotMutation,
} = slotsApiSlice;
