export const addToCart = (pizza, quantity, size) => (dispatch, getState) => {
  var cartItem = {
    name: pizza.name,
    _id: pizza._id,
    image: pizza.image,
    size: size,
    quantity: Number(quantity),
    prices: pizza.prices,
    totalPrice: pizza.prices[0][size] * quantity,
  };

  if (cartItem.quantity > 5) {
    alert("You can add at most 5 per menu item!");
  } else if (cartItem.quantity < 1) {
    dispatch({ type: "DELETE_FROM_CART", payload: pizza });
  } else {
    dispatch({ type: "ADD_TO_CART", payload: cartItem });
  }

  const cartItems = getState().cartReducer.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const deleteFromCart = (pizza) => (dispatch, getState) => {
  dispatch({ type: "DELETE_FROM_CART", payload: pizza });
  const cartItems = getState().cartReducer.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const clearCart = () => (dispatch) => {
  dispatch({ type: "CLEAR_CART" });
  localStorage.removeItem("cartItems");
};

