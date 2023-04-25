import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPizza } from "../../actions/pizzaAction";

export default function Add() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [prices, setPrices] = useState([]);
  const [message, setMessage] = useState(null);

  const sizes = ["12''", "16''"];

  const submitHandler = (e) => {
    e.preventDefault();

    const pizza = {
      name,
      size: ["12''", "16''"],
      prices: [
        {
          "12''": parseInt(prices[0], 10),
          "16''": parseInt(prices[1], 10),
        },
      ],
      category,
      image,
      description,
    };

    dispatch(addPizza(pizza));
    setMessage("New pizza added successfully!");
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-4 p-4">
      <div className="text-center shadow p-4">
        <h1>Add Pizza</h1>
        <div className="form-group">
          <form onSubmit={submitHandler}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="name">Name:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter pizza name"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="description">Description:</label>
                  </td>
                  <td>
                    <textarea
                      className="form-control"
                      id="description"
                      placeholder="Add description"
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="category">Category:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      placeholder="Enter Category"
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="image">Image URL:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      id="image"
                      placeholder="Enter Image URL"
                      onChange={(e) => setImage(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="prices">Prices:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      id="prices"
                      placeholder="Enter Prices (Seperate by Comma)"
                      onChange={(e) =>
                        setPrices(
                          e.target.value
                            .split(",")
                            .map((price) => Number(price))
                        )
                      }
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <button type="submit" className="btn btn-primary mt-3 p-2">
                      Add Pizza
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          {message && <h3 className="mt-3">{message}</h3>}
        </div>
      </div>
    </div>
  );
}
