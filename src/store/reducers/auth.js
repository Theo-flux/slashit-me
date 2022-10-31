import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  email: null,
  isLoading: true,
  userEmail: null,
  userPhone: null,
  userFirstname: null,
  userLastname: null,
  userBirthday: null,
  userPassword: null,
  session: "inactive",
  authCode: null,
  profileUpdate: {},
  user: {
    country: null,
    avatar: null,
    business: null,
  },
  clique: {
    cliqueReceived: [],
    cliqueSent: [],
    cliqueActive: [],
  },
  phoneVerified: false,
};

const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    //Sign in
    setSignIn: (state, action) => {
      state.token = action.payload.token;
    },
    //Sign out
    setSignOut: (state) => {
      state.token = null;
      state.user = {
        country: null,
        avatar: null,
      };
    },

    //Fetch User
    fetchUserById: (state, action) => {
      state.user = action.payload;
    },
    //Set user email
    setEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    //Set user phone number
    setPhone: (state, action) => {
      state.userPhone = action.payload;
    },
    //Set user first name
    setFirstname: (state, action) => {
      state.userFirstname = action.payload;
    },
    //Set user last name
    setLastname: (state, action) => {
      state.userLastname = action.payload;
    },
    //Set user birthday
    setBirthday: (state, action) => {
      state.userBirthday = action.payload;
    },
    //Set user password
    setPassword: (state, action) => {
      state.userPassword = action.payload;
    },
    //Set Code
    setAuthCode: (state, action) => {
      state.authCode = action.payload;
    },
    //Set Clique
    setClique: (state, action) => {
      state.clique = action.payload;
    },

    //Set Phone Verified
    setPhoneVerified: (state, action) => {
      state.phoneVerified = action.payload;
    },
    //Set Session
    setSession: (state, action) => {
      state.session = action.payload;
    },
  },
});

export const {
  setSignIn,
  setSignOut,
  setBirthday,
  setEmail,
  setPassword,
  fetchUserById,
  setFirstname,
  setLastname,
  setPhone,
  setAuthCode,
  setClique,
  setPhoneVerified,
  setSession,
} = authSlice.actions;

export default authSlice.reducer;
