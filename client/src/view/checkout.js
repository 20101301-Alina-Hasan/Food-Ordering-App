import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../actions/cartAction";

export default function Checkout() {
  const cartState = useSelector((state) => state.cartReducer);
  const cartItems = cartState.cartItems;
  const subTotal = cartItems.reduce((x, item) => x + item.totalPrice, 0);

  const dispatch = useDispatch();

  const [successMessage, setSuccessMessage] = useState("");
  const [paymentOption, setPaymentOption] = useState("");

  const handlePaymentOptionChange = (event) => {
    setPaymentOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (paymentOption === "bkash") {
      window.location.href = "/bkash";
    } else if (paymentOption === "cod") {
      setSuccessMessage("Your pizza will be delivered soon!");
      dispatch(clearCart());
    }
    event.target.reset();
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Order Summary</h1>
          <div className="card">
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Item Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.totalPrice} TK</td>
                    </tr>
                  ))}
                  {cartItems.length > 0 && (
                    <>
                      <tr>
                        <th scope="row" colSpan="3" className="text-right">
                          Subtotal
                        </th>
                        <td>{subTotal} TK</td>
                      </tr>
                      <tr>
                        <th scope="row" colSpan="3" className="text-right">
                          Delivery Fee
                        </th>
                        <td>50 Tk</td>
                      </tr>
                      <tr>
                        <th scope="row" colSpan="3" className="text-right">
                          Total
                        </th>
                        <td>{subTotal + 50} TK</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="form-group">
            <h5 className="card-title mt-3 p-4">Payment Method:</h5>
            <select
              required
              className="form-control"
              id="paymentOption"
              value={paymentOption}
              onChange={handlePaymentOptionChange}
            >
              <option value="">Select</option>
              <option value="bkash">BKash</option>
              <option value="cod">COD</option>
            </select>
          </div>
          <div className="my-4">
            <h5 className="card-title mb-3 p-4">Shipping Information</h5>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  required
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  id="name"
                />
              </div>
              <div className="form-group">
                <input
                  required
                  type="tel"
                  placeholder="Contact Number"
                  className="form-control"
                  id="contact"
                  pattern="[0-9]{11}"
                />
              </div>
              <div className="form-group">
                <input
                  required
                  type="text"
                  placeholder="Street Address"
                  className="form-control"
                  id="street-address"
                />
              </div>
              <div className="form-group">
                <input
                  required
                  type="text"
                  placeholder="Street Number"
                  className="form-control"
                  id="street-number"
                />
              </div>
              <div className="form-group">
                <input
                  required
                  type="text"
                  placeholder="Apartment Name"
                  className="form-control"
                  id="apartment-number"
                />
              </div>
              <div className="mt-4">
                {successMessage ? (
                  <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div>
                ) : (
                  <button type="submit" className="btn btn-primary btn-sm p-2">
                    Confirm Delivery
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
