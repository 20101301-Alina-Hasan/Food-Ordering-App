import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions/cartAction";

export default function Pizza({ pizza }) {
  const [size, setSize] = useState("12''");
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  function addItem() {
    dispatch(addToCart(pizza, quantity, size));
  }

  return (
    <div className="m-5">
      <div onClick={handleShow}>
        <h1>{pizza.name}</h1>
        <img
          src={pizza.image}
          alt="Example"
          className="img-fluid"
          style={{ height: "20rem", width: "20rem", padding: "2rem" }}
        />
      </div>
      <div className="flex-container" style={{boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)"}}>
        <div className="m-1 w-100">
          <p> Size </p>
          <select
            className="form-control form-control-sm"
            value={size}
            onChange={(e) => {
              setSize(e.target.value);
            }}
          >
            {pizza.size.map((size) => {
              return <option value={size}> {size} </option>;
            })}
          </select>
        </div>
        
        <div className="m-1 w-100">
          <p> Quantity </p>
          <select
            className="form-control form-control-sm"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          >
            {[...Array(5).keys()].map((x, i) => {
              return <option value={i + 1}> {i + 1} </option>;
            })}
          </select>
        </div>
        <div className="m-1 w-100">
          <h3> {pizza.prices[0][size] * quantity} TK</h3>
        </div>
        <div className="m-1 w-100 mt-3">
          <button className="btn p-2" onClick={addItem}>
            {" "}
            ADD TO CART{" "}
          </button>
        </div>
      </div>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>{pizza.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          <img
            src={pizza.image}
            alt="Example"
            className="img-fluid"
            style={{ height: "26rem", width: "26rem", padding: "2rem" }}
          />
          <p>{pizza.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn p-2" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
