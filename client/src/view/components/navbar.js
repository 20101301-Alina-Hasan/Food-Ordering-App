import Logo from "../logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../actions/userAction";

export default function Navbar() {
  const cartState = useSelector((state) => state.cartReducer);
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;

  const dispatch = useDispatch();

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg shadow-lg p-6"
        style={{ backgroundColor: "#f44336" }}
      >
        <custom className="navbar-brand">
          <img
            src={Logo}
            style={{
              height: "42px",
              width: "42px",
              marginRight: "5px",
              marginBottom: "5px",
            }}
          ></img>
          Cheez Bytes
        </custom>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse navbar-expand-lg"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {currentUser ? (
              <li>
                <div className="dropdown mt-2">
                  <a
                    className="dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{
                      fontSize: "5px",
                      color: "darkred",
                      textDecoration: "none",
                    }}
                  >
                    {currentUser.firstName}
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a className="dropdown-item" href="/">
                      View Menu
                    </a>
                    <a className="dropdown-item" href="/cart">
                      View Cart
                    </a>
                    <a
                      onClick={() => dispatch(userLogout())}
                      className="dropdown-item"
                      href="#"
                    >
                      Logout
                    </a>
                  </div>
                </div>
              </li>
            ) : (
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
            )}
            <li className="nav-item">
              <a className="nav-link" href="/">
                Menu
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/cart">
                Cart
              </a>
            </li>
            <notify>{cartState.cartItems.length}</notify>
          </ul>
        </div>
      </nav>
    </div>
  );
}
