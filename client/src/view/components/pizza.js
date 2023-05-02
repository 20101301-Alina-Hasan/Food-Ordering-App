import "../css/pizza.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../actions/cartAction";
import Modal from "react-bootstrap/Modal";

export default function Pizza({ pizza }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.loginUserReducer);

  const [size, setSize] = useState("12''");
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addItem = () => {
    dispatch(addToCart(pizza, quantity, size));
  };

  const renderAddToCartButton = () => {
    return (
      <div className="m-2">
        <button className="sml-btn" onClick={addItem}>
          Add to Cart
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="custom-box">
        <div className="pizza-title">{pizza.name}</div>
        <div onClick={handleShow}>
          <img
            src={pizza.image}
            alt="Example"
            className="img-fluid pizza-img"
          />
        </div>
        <div className="pizza-price m-1 w-100">
          {pizza.prices[0][size] * quantity} TK
        </div>
        <div className="flex-container">
          <div className="m-1 w-100">
            <p className="pizza-choice"> Size </p>
            <select
              className="select-sm"
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            >
              {pizza.size.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="m-1 w-100">
            <p className="pizza-choice"> Quantity </p>
            <select
              className="select-sm"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            >
              {[...Array(5).keys()].map((i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        {(currentUser && !currentUser.isAdmin) || !currentUser
          ? renderAddToCartButton()
          : null}
      </div>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>
            <strong>{pizza.name}</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          <img
            src={pizza.image}
            alt="Example"
            className="img-fluid"
            style={{ height: "18rem", width: "18rem" }}
          />
          <p>
            <strong>{pizza.category}</strong>
          </p>
          <p>{pizza.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <div className="sml-btn" onClick={handleClose}>
            Close
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
