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


