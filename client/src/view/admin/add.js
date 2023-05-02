import "../css/add.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPizza } from "../../actions/pizzaAction";

export default function Add() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [price12, setPrice12] = useState(0);
  const [price16, setPrice16] = useState(0);
  const [message, setMessage] = useState(null);

  const resetForm = () => {
    setName("");
    setDescription("");
    setCategory("");
    setImage("");
    setPrice12(0);
    setPrice12(0);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const pizza = {
      name,
      size: ["12''", "16''"],
      prices: [
        {
          "12''": price12,
          "16''": price16,
        },
      ],
      category,
      image,
      description,
    };

    dispatch(addPizza(pizza))
      .then(() => {
        setMessage("New pizza added successfully!");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => console.log(error));

    resetForm();
  };

  return (
    <body className="bkash-page">
      <div className="justify-content-center d-flex">
        <div className="add-box text-center">
          <h1 className="add-title">Add Pizza</h1>
          <div className="form-group">
            <form onSubmit={submitHandler}>
              <table style={{ fontSize: "1rem" }}>
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
                        value={name}
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
                        value={description}
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
                        value={category}
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
                        value={image}
                        placeholder="Enter Image URL"
                        onChange={(e) => setImage(e.target.value)}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="price12">12'' Price:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        id="price12"
                        value={price12}
                        placeholder="Enter Price"
                        onChange={(e) => setPrice12(e.target.value)}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="price16">16'' Price:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        id="price16"
                        value={price16}
                        placeholder="Enter Price"
                        onChange={(e) => setPrice16(e.target.value)}
                        required
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button type="submit" className="btn btn-primary mt-3">
                Add Pizza
              </button>
            </form>
            {message && <h1 className="add-msg">{message}</h1>}
          </div>
        </div>
      </div>
    </body>
  );
}
