import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pizza from "./components/pizza";
import { getPizza } from "../actions/pizzaAction";

export default function Home() {
  const dispatch = useDispatch();
  const pizzaState = useSelector((state) => state.getPizzaReducer);
  const { pizza, error, loading } = pizzaState;

  useEffect(() => { dispatch(getPizza()); }, [dispatch]);

  return (
    <div>
      <div className="row">
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1> Something went wrong.</h1>
        ) : (
          pizza.map((pizza) => {
            return (
              <div className="col-md-6 p-4" key={pizza._id}>
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
