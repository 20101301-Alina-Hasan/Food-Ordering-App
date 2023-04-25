import { useSelector, useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../actions/cartAction";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const cartState = useSelector((state) => state.cartReducer);
  const cartItems = cartState.cartItems;
  var subTotal = cartItems.reduce((x, item) => x + item.totalPrice, 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleConfirmOrder = () => {
    navigate("/checkout");
  };

  return (
    <div>
      <div class="row justify-content-center">
        <div className="col-md-6">
          <h1 className="p-4 mt-4" style={{ backgroundColor: "orange"}}>
            Shopping Cart
          </h1>
          {cartItems.map((item) => {
            return (
              <>
                <div
                  className="flex-container"
                  style={{ boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
                >
                  <div className="m-1 w-100 p-2">
                    <p>
                      {item.size} {item.name}
                      {" x"}
                      {item.quantity}
                    </p>
                    <img
                      src={item.image}
                      alt="Example"
                      style={{ height: "200px", width: "200px" }}
                    />
                    <p style={{ marginTop: "2rem" }}>
                      Price: {item.totalPrice} TK
                    </p>
                    <i
                      class="fa fa-plus"
                      aria-hidden="true"
                      onClick={() => {
                        dispatch(addToCart(item, item.quantity + 1, item.size));
                      }}
                    ></i>{" "}
                    {item.quantity}{" "}
                    <i
                      class="fa fa-minus"
                      aria-hidden="true"
                      onClick={() => {
                        dispatch(addToCart(item, item.quantity - 1, item.size));
                      }}
                    ></i>
                  </div>
                  <i
                    class="fa fa-trash"
                    aria-hidden="true"
                    onClick={() => dispatch(deleteFromCart(item))}
                  ></i>
                </div>
              </>
            );
          })}
          <h2
            className="p-4"
            style={{
              marginTop: "18px",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            Total: {subTotal} Tk{" "}
            <div className="m-2 mt-3">
              <button onClick={handleConfirmOrder}className="btn p-2">Confirm Order</button>
            </div>
          </h2>
        </div>
      </div>
    </div>
  );
}
