import "../css/add.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePizza } from "../../actions/pizzaAction";
import { useParams } from "react-router-dom";

export default function Update() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const pizzaState = useSelector((state) => state.getPizzaReducer);
  const { pizza } = pizzaState;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [price12, setPrice12] = useState(0);
  const [price16, setPrice16] = useState(0);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (pizza.length > 0) {
      const selectedPizza = pizza.find((p) => p._id === id);
      if (!selectedPizza) {
        return;
      }
      setName(selectedPizza.name);
      setImage(selectedPizza.image);
      setDescription(selectedPizza.description);
      setCategory(selectedPizza.category);
      setPrice12(selectedPizza.prices[0]["12''"]);
      setPrice16(selectedPizza.prices[0]["16''"]);
    }
  }, [
    pizza,
    id,
    setName,
    setImage,
    setDescription,
    setCategory,
    setPrice12,
    setPrice16,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedPizza = {
      _id: id,
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

    dispatch(updatePizza(id, updatedPizza))
      .then(() => {
        setMessage("Pizza updated successfully!");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => console.log(error));
  };

  return (
    <body className="bkash-page">
      <div className="justify-content-center d-flex">
        <div className="add-box text-center">
          <h1 className="add-title">Update Pizza</h1>
          <div className="form-group">
            <form onSubmit={handleSubmit}>
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
                      />
                    </td>
                  </tr>
                  <td>
                    <label htmlFor="image">Image:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      id="image"
                      value={image}
                      placeholder="Enter image URL"
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </td>
                  <tr>
                    <td>
                      <label htmlFor="price12">Price 12'':</label>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        id="price12"
                        value={price12}
                        onChange={(e) => setPrice12(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="price16">Price 16'':</label>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        id="price16"
                        value={price16}
                        onChange={(e) => setPrice16(e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button type="submit" className="btn btn-primary mt-3">
                Update Pizza
              </button>
              {message && <p className="add-msg">{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </body>
  );
}
