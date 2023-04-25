import axios from "axios";

export const getPizza = () => async dispatch => {
  dispatch({ type: "GET_PIZZA_REQUEST" });

  try {
    const response = await axios.get("/api/pizza/getPizza");
    console.log(response);
    dispatch({ type: "GET_PIZZA_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_PIZZA_FAILED", payload: error });
  }
};

export const addPizza = (pizza) => async (dispatch) => {
  dispatch({ type: "ADD_PIZZA_REQUEST" });
  try {
    const response = await axios.post("/api/pizza", pizza);
    dispatch({ type: "ADD_PIZZA_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "ADD_PIZZA_FAILED", payload: error });
  }
};

export const updatePizza = (pizzaId, updatedPizza) => async (dispatch) => {
  dispatch({ type: "UPDATE_PIZZA_REQUEST" });
  try {
    const response = await axios.put(`/api/pizza/${pizzaId}`, updatedPizza);
    dispatch({ type: "UPDATE_PIZZA_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "UPDATE_PIZZA_FAILED", payload: error });
  }
};

