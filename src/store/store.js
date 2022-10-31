import { configureStore } from "@reduxjs/toolkit";
import userAuth from "./reducers/auth";
import transaction from "./reducers/transaction";
import helper from "./reducers/helper";

export const store = configureStore({
  reducer: {
    userAuth: userAuth,
    transaction: transaction,
    helper: helper,
  },
});
