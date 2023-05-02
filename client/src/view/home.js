import "./css/pizza.css";
import Pizza from "./components/pizza";
import Search from "./components/search";
import Filter from "./components/filter";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPizza } from "../actions/pizzaAction";

export default function Home() {
  const dispatch = useDispatch();
  const pizzaState = useSelector((state) => state.getPizzaReducer);
  const { pizza, error, loading } = pizzaState;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(getPizza());
  }, [dispatch]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (value) => {
    setSelectedCategory(value);
  };

  const filteredPizza = Object.values(pizza)
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (item) => selectedCategory === "" || item.category === selectedCategory
    );

  return (
    <div>
      <div class="custom-search-box">
        <Search searchTerm={searchTerm} onChange={handleSearch} />
        <Filter pizza={pizza} onFilter={handleFilter} />
      </div>
      <div className="row">
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
          filteredPizza.map((pizza) => {
            return (
              <div className="col-md-4 mt-4" key={pizza._id}>
                <div>
                  <Pizza pizza={pizza} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
