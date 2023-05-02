import "./css/bkash.css";
import { useState } from "react";
import { clearCart } from "../actions/cartAction";
import { useDispatch } from "react-redux";

export default function Bkash() {
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccessMessage("Payment Successful!");
    dispatch(clearCart());
  };

  return (
    <body class="bkash-page">
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
                  <input
                    required
                    type="tel"
                    className="form-control"
                    id="contact"
                    placeholder="Bkash Contact Number"
                    pattern="[0-9]{11}"
                  />
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
    </body>
  );
}
