import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards: null,
  preferredCard: null,

};

const transactionSlice = createSlice({
  name: "transaction",
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
  },
});

export const {
  setCards,
  setPreferredCard,

} = transactionSlice.actions;

export default transactionSlice.reducer;
