import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { getPizzaReducer, addPizzaReducer, deletePizzaReducer} from "./reducers/pizzaReducer";
import { updatePizzaReducer } from "./reducers/pizzaReducer";
import { cartReducer } from "./reducers/cartReducer";
import { registerUserReducer, loginUserReducer } from "./reducers/userReducer";

const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  user: currentUser,
  cartReducer: { cartItems: cartItems },
  loginUserReducer: { currentUser: currentUser},
};

const middleware = [thunk];

const store = configureStore({
  reducer: {
    getPizzaReducer: getPizzaReducer,
    cartReducer: cartReducer,
    registerUserReducer: registerUserReducer,
    loginUserReducer: loginUserReducer,
    addPizzaReducer: addPizzaReducer,
    deletePizzaReducer: deletePizzaReducer,
    updatePizzaReducer: updatePizzaReducer,
  },
  middleware,
  devTools: true,
  preloadedState: initialState
});

export default store;
