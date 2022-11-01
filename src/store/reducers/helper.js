import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterSearchPhrase: "",
  dateFilterParams: null,
  cliqueUserSelected: null,
  itemSelected: null,
  shippingDetails: {
    shippingName: "",
    shippingAddress: "",
    shippingZipcode: "",
    shippingCity: "",
    shippingState: "",
    shippingCountry: "",
  },
  anyAmount: "",
  anyAction: false,
  anyTab: "",
};

const helperSlice = createSlice({
  name: "helper",
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
} = helperSlice.actions;

export default helperSlice.reducer;