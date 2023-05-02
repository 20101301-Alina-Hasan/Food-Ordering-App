import "./css/cart.css";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../actions/cartAction";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subTotal = cartItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  const handleConfirmOrder = () => {
    navigate("/checkout");
  };

  return (
    <>
      {subTotal === 0 ? (
        <div className="empty-bg">
          <p
            className="display-4"
            style={{ color: "antiquewhite", fontFamily: "Caveat" }}
          >
            Your cart is empty!
          </p>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-6 shadow-box">
            <h1 className="cart-title">Shopping Cart</h1>
            {cartItems.map((item) => (
              <>
              <div key={item.id} className="flex-container">
                <div className="m-1 w-100 p-2">
                  <p>
                    {item.size} {item.name} x {item.quantity}
                  </p>
                  <img
                    src={item.image}
                    alt="Example"
                    style={{ height: "24rem", width: "24rem" }}
                  />
                  <p style={{ marginTop: "2rem" }}>
                    Price: {item.totalPrice} Tk
                  </p>
                  <i
                    className="fa fa-plus"
                    aria-hidden="true"
                    onClick={() =>
                      dispatch(addToCart(item, item.quantity + 1, item.size))
                    }
                  ></i>{" "}
                  {item.quantity}{" "}
                  <i
                    className="fa fa-minus"
                    aria-hidden="true"
                    onClick={() =>
                      dispatch(addToCart(item, item.quantity - 1, item.size))
                    }
                  ></i>
                  <div>
                    <i
                      className="fa fa-trash"
                      aria-hidden="true"
                      onClick={() => dispatch(deleteFromCart(item))}
                    ></i>
                  </div>
                </div>
              </div>
               <hr size="5" width="100%" color="black"/>
               </>
            ))}
            <p className="total-box">
              Total: {subTotal} Tk{" "}
              <div className="m-1">
                <button onClick={handleConfirmOrder} className="sml-btn">
                  Confirm Order
                </button>
              </div>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
