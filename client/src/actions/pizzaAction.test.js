import axios from "axios";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import {
  getPizzaReducer,
  addPizzaReducer,
  deletePizzaReducer,
  updatePizzaReducer,
} from "../reducers/pizzaReducer";
import { getPizza, addPizza, deletePizza, updatePizza } from "./pizzaAction";

const middleware = [thunk];


jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
}));

const createTestStore = (initialState) => {
  return configureStore({
    reducer: {
      pizzaReducer: getPizzaReducer,
      addPizzaReducer: addPizzaReducer,
      deletePizzaReducer: deletePizzaReducer,
      updatePizzaReducer: updatePizzaReducer,
    },
    middleware,
    devTools: true,
    preloadedState: initialState,
  });
};

describe("PizzaAction.js", () => {
  describe("getPizza: ", () => {
    describe("GET_PIZZA_REQUEST:", () => {
      const pizza = {
        _id: 1,
        name: "Margherita",
        prices: [{ "12''": 10, "16''": 20 }],
        image: "margherita.jpg",
      };

      const initialState = {
        pizzaReducer: { pizza: [] },
      };

      it("GET_PIZZA_SUCCESS:", async () => {
        axios.get.mockResolvedValueOnce({ data: pizza });
        const store = createTestStore(initialState);
        await store.dispatch(getPizza());
        expect(store.getState().pizzaReducer.pizza).toEqual(pizza);
      });

      it("GET_PIZZA_FAILED:", async () => {
        const error = { message: "Error fetching pizza" };
        axios.get.mockRejectedValueOnce(error);
        const store = createTestStore(initialState);
        await store.dispatch(getPizza());
        expect(store.getState().pizzaReducer.error).toEqual(error);
      });
    });
  });

  describe("addPizza:", () => {
    const pizza = {
      name: "Margherita",
      size: ["12''", "16''"],
      prices: [
        {
          "12''": 10,
          "16''": 20,
        },
      ],
      category: "vegetarian",
      image: "margherita.jpg",
      description:
        "A classic pizza topped with tomato sauce, mozzarella cheese, and basil.",
    };

    const initialState = {
      addPizzaReducer: {},
    };

    it("ADD_PIZZA_SUCCESS:", async () => {
      axios.post.mockResolvedValueOnce({ data: pizza });
      const store = createTestStore(initialState);
      await store.dispatch(addPizza(pizza));
      expect(store.getState().addPizzaReducer.pizza).toEqual(pizza);
    });

    it("ADD_PIZZA_FAILED", async () => {
      const error = { message: "Error adding pizza" };
      axios.post.mockRejectedValueOnce(error);
      const store = createTestStore(initialState);
      await store.dispatch(addPizza(pizza));
      expect(store.getState().addPizzaReducer.error).toEqual(error);
    });
  });

  describe("deletePizza:", () => {
    const pizzaId = "12345";
    const initialState = {
      pizzaReducer: { pizza: [] },
    };

    it("DELETE_PIZZA_SUCCESS", async () => {
      axios.delete.mockResolvedValueOnce({ data: {} });
      const store = createTestStore(initialState);
      await store.dispatch(deletePizza(pizzaId));
      expect(store.getState().deletePizzaReducer.success).toEqual(true);
    });

    it("DELETE_PIZZA_FAILED", async () => {
      const error = { message: "Error deleting pizza" };
      axios.delete.mockRejectedValueOnce(error);
      const store = createTestStore(initialState);
      await store.dispatch(deletePizza(pizzaId));
      expect(store.getState().deletePizzaReducer.error).toEqual(error);
    });
  });

  describe("updatePizza:", () => {
    const pizzaId = "12345";
    const updatedPizza = {
      name: "Margherita",
      size: ["12''", "16''"],
      prices: [
        {
          "12''": 10,
          "16''": 20,
        },
      ],
      category: "vegetarian",
      image: "margherita.jpg",
      description:
        "A classic pizza topped with tomato sauce, mozzarella cheese, and basil.",
    };
  
    const initialState = {
      updatePizzaReducer: {},
    };
  
    it("UPDATE_PIZZA_SUCCESS", async () => {
      axios.put.mockResolvedValueOnce({ data: updatedPizza });
      const store = createTestStore(initialState);
      await store.dispatch(updatePizza(pizzaId, updatedPizza));
      expect(store.getState().updatePizzaReducer.pizza).toEqual(updatedPizza);
    });
  
    it("UPDATE_PIZZA_FAILED", async () => {
      const error = { message: "Error updating pizza" };
      axios.put.mockRejectedValueOnce(error);
      const store = createTestStore(initialState);
      await store.dispatch(updatePizza(pizzaId, updatedPizza));
      expect(store.getState().updatePizzaReducer.error).toEqual(error);
    });
  });
  
});
