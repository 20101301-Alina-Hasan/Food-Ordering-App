import { useState } from "react";
import { clearCart } from "../actions/cartAction";
import { useDispatch } from "react-redux";

export default function Bkash() {
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccessMessage("Payment Successful!");
    dispatch(clearCart());
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">BKash Payment</h1>
              {successMessage ? (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="contactNumber">BKash Contact Number</label>
                    <input
                      required
                      type="tel"
                      className="form-control"
                      id="contact"
                      pattern="[0-9]{11}"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block p-2"
                  >
                    Pay
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
