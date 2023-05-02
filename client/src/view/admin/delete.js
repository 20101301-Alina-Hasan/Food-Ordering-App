import "../css/delete.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPizza, deletePizza } from "../../actions/pizzaAction";
import { Link } from "react-router-dom";

export default function Delete() {
  const dispatch = useDispatch();

  const pizzaState = useSelector((state) => state.getPizzaReducer);
  const { pizza, error, loading } = pizzaState;

  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    dispatch(getPizza());
  }, [dispatch]);

  const handleDelete = (_id) => {
    if (window.confirm("Are you sure you want to delete this pizza item?")) {
      dispatch(deletePizza(_id));
      setDeleteId("");
    }
  };

  return (
    <div>
      {loading ? (
        <div className="empty-bg">
          <p
            className="display-4"
            style={{ color: "antiquewhite", fontFamily: "Caveat" }}
          >
            Loading...
          </p>
        </div>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <div style={{ background: "whitesmoke" }}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Description</th>
                <th>12''</th>
                <th>16''</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pizza.map((pizza) => (
                <tr key={pizza._id}>
                  <td>{pizza.name}</td>
                  <td>
                    <img
                      className="delete-img"
                      src={pizza.image}
                      alt={pizza.name}
                      style={{ width: "12rem", height: "12rem" }}
                    />
                  </td>
                  <td>{pizza.description}</td>
                  <td>{pizza.prices[0]["12''"]} TK</td>
                  <td>{pizza.prices[0]["16''"]} TK</td>
                  <td>
                    <Link
                      to={`/update/${pizza._id}`}
                      className="btn-primary up-btn"
                    >
                      Update
                    </Link>
                    <button
                      className="btn-primary del-btn"
                      onClick={() => handleDelete(pizza._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
