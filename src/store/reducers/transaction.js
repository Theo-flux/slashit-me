import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: null,
  preferredCard: null,
  orderDetails: null,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    //Set Debit Cards
    setCards: (state, action) => {
      state.cards = action.payload;
    },
    //Set Preferred
    setPreferredCard: (state, action) => {
      state.preferredCard = action.payload;
    },
    //Set Order details
    setOrderDetails: (state, action) => {
      state.orderDetails = action.payload;
    },
  },
});

export const { setCards, setPreferredCard, setOrderDetails } =
  transactionSlice.actions;

export default transactionSlice.reducer;
