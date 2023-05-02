import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../reducers/cartReducer";
import { addToCart, deleteFromCart, clearCart } from "./cartAction";
import { waitFor } from "@testing-library/react";

const middleware = [thunk];

const createTestStore = (initialState) => {
  return configureStore({
    reducer: { cartReducer: cartReducer },
    middleware,
    devTools: true,
    preloadedState: initialState,
  });
};

const setupInitialState = (initialState) => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("cartItems", JSON.stringify(initialState.cartItems));
  });
};

describe("cartAction.js: ", () => {
  describe("ADD_TO_CART", () => {
    const pizza = {
      _id: 1,
      name: "Margherita",
      prices: [{ "12''": 10, "16''": 20 }],
      image: "margherita.jpg",
    };
    const quantity = 2;
    const size = "12''";

    const expectedCartItem = {
      name: "Margherita",
      _id: 1,
      image: "margherita.jpg",
      size: "12''",
      quantity: 2,
      prices: [{ "12''": 10, "16''": 20 }],
      totalPrice: 20,
    };

    const initialState = {
      cartReducer: { cartItems: [] },
    };

    setupInitialState(initialState);

    it("should add item to cart", () => {
      const store = createTestStore(initialState);
      store.dispatch(addToCart(pizza, quantity, size));
      expect(store.getState().cartReducer.cartItems).toEqual([
        expectedCartItem,
      ]);
      expect(JSON.parse(localStorage.getItem("cartItems"))).toEqual([
        expectedCartItem,
      ]);
    });
  });

  describe("DELETE_FROM_CART", () => {
    const initialState = {
      cartReducer: {
        cartItems: [
          {
            name: "Margherita",
            _id: 1,
            image: "margherita.jpg",
            size: "12''",
            quantity: 2,
            prices: [{ "12''": 10, "16''": 20 }],
            totalPrice: 20,
          },
        ],
      },
    };

    setupInitialState(initialState);

    it("should delete item from cart", async () => {
      const store = createTestStore(initialState);
      store.dispatch(deleteFromCart(initialState.cartReducer.cartItems[0]));
      await waitFor(() => {
        expect(store.getState().cartReducer.cartItems).toEqual([]);
      });
      expect(JSON.parse(localStorage.getItem("cartItems"))).toEqual([]);
    });
  });

  describe("CLEAR_CART", () => {
    const initialState = {
      cartReducer: {
        cartItems: [
          {
            name: "Margherita",
            _id: 1,
            image: "margherita.jpg",
            size: "12''",
            quantity: 2,
            prices: [{ "12''": 10, "16''": 20 }],
            totalPrice: 20,
          },
        ],
      },
    };

    localStorage.setItem(
      "cartItems",
      JSON.stringify(initialState.cartReducer.cartItems)
    );

    it("should clear cart after confirming delivery", () => {
      const store = createTestStore(initialState);
      store.dispatch(clearCart());

      const state = store.getState();
      expect(state.cartReducer.cartItems).toEqual([]);

      const cartItems = JSON.parse(localStorage.getItem("cartItems"));
      expect(cartItems).toBeNull();
    });
  });
});
