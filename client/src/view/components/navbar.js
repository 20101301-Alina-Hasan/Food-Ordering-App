import "../css/navbar.css";
import Logo from "../logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../actions/userAction";

export default function Navbar() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const { currentUser } = useSelector((state) => state.loginUserReducer);
  const dispatch = useDispatch();

  const renderLoginLinks =  (
    <>
      <li className="nav-item">
        <a className="nav-link nav-a" href="/login">
          Login
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link nav-a" href="/">
          Menu
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link nav-a" href="/cart">
          Cart
        </a>
      </li>
      <div className="notify">{cartItems.length}</div>
    </>
  );

  const renderAdminLinks = () => (
    <>
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
              fontSize: "16px",
              color: "darkred",
              textDecoration: "none",
            }}
          >
            {currentUser.firstName}
          </a>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="/delete">
              Edit Item
            </a>
            <a className="dropdown-item" href="/add">
              Add Item
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
      <li className="nav-item">
        <a className="nav-link nav-a" href="/">
          Menu
        </a>
      </li>
    </>
  );

  const renderUserLinks = () => (
    <>
      <li>
        <div className="dropdown mt-2" style={{ marginRight: "0.5rem" }}>
          <a
            className="dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{
              fontSize: "16px",
              color: "darkred",
              textDecoration: "none",
            }}
          >
            {currentUser.firstName}
          </a>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
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
      <li className="nav-item">
        <a className="nav-link nav-a" href="/">
          Menu
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link nav-a" href="/cart">
          Cart
        </a>
      </li>
      <div className="notify">{cartItems.length}</div>
    </>
  );

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg shadow-lg p-6"
        style={{ backgroundColor: "#f44336" }}
      >
        <div className="navbar-brand custom">
          <img className="logo-style" src={Logo} alt="logo" />
          {currentUser && currentUser.isAdmin ? (
            <>Admin Dashboard</>
          ) : currentUser ? (
            <>Welcome Back!</>
          ) : (
            <>Cheez Bytes</>
          )}
        </div>
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
              <>
                {currentUser.isAdmin === true
                  ? renderAdminLinks()
                  : renderUserLinks()}
              </>
            ) : (
              renderLoginLinks
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
