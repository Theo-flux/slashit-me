import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterSearchPhrase: '',
  dateFilterParams: null,
  cliqueUserSelected: null,
  itemSelected: null,
  shippingDetails: {
    shippingName: '',
    shippingAddress: '',
    shippingZipcode: '',
    shippingCity: '',
    shippingState: '',
    shippingCountry: '',
  },
  anyAmount: '',
  anyAction: false,
  anyTab: '',
  anySuccess: '',
  extraTab: '',
  cardData: null,
};

const helperSlice = createSlice({
  name: 'helper',
  initialState,
  reducers: {
    //Set Filter Search Phrase
    setFilterSearchPhrase: (state, action) => {
      state.filterSearchPhrase = action.payload;
    },
    //Set filter params
    setDateFilterParams: (state, action) => {
      state.dateFilterParams = action.payload;
    },
    //Set Clique User Selected
    setCliqueUserSelected: (state, action) => {
      state.cliqueUserSelected = action.payload;
    },

    //Set item selected
    setItemSelected: (state, action) => {
      state.itemSelected = action.payload;
    },

    //Set Shipping Details
    setShippingDetails: (state, action) => {
      state.shippingDetails = action.payload;
    },

    //Set Any Amount
    setAnyAmount: (state, action) => {
      state.anyAmount = action.payload;
    },
    //Set Success
    setAnyAction: (state, action) => {
      state.anyAction = action.payload;
    },
    //Set Any Tab
    setAnyTab: (state, action) => {
      state.anyTab = action.payload;
    },
    //Set Any Success
    setAnySuccess: (state, action) => {
      state.anySuccess = action.payload;
    },
    //Set Extra Tab
    setExtraTab: (state, action) => {
      state.extraTab = action.payload;
    },
    //Set Card Data
    setCardData: (state, action) => {
      state.cardData = action.payload;
    },
  },
});

export const {
  setFilterSearchPhrase,
  setCliqueUserSelected,
  setDateFilterParams,
  setItemSelected,
  setShippingDetails,
  setAnyAmount,
  setAnyTab,
  setAnyAction,
  setAnySuccess,
  setCardData,
  setExtraTab,
} = helperSlice.actions;

export default helperSlice.reducer;
