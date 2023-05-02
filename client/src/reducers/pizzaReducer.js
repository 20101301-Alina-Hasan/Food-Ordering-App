export const getPizzaReducer = (state = { pizza: [] }, action) => {
  switch (action.type) {
    case "GET_PIZZA_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "GET_PIZZA_SUCCESS":
      return {
        loading: false,
        pizza: action.payload,
      };
    case "GET_PIZZA_FAILED":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const addPizzaReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_PIZZA_REQUEST":
      return {
        loading: true,
      };
    case "ADD_PIZZA_SUCCESS":
      return {
        loading: false,
        success: true,
        pizza: action.payload,
      };
    case "ADD_PIZZA_FAILED":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deletePizzaReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_PIZZA_REQUEST":
      return {
        loading: true,
      };
    case "DELETE_PIZZA_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "DELETE_PIZZA_FAILED":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updatePizzaReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_PIZZA_REQUEST":
      return {
        loading: true,
      };
    case "UPDATE_PIZZA_SUCCESS":
      return {
        loading: false,
        success: true,
        pizza: action.payload,
      };
    case "UPDATE_PIZZA_FAILED":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

