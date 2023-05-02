import axios from "axios";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./userAction";
import { registerUserReducer, loginUserReducer } from "../reducers/userReducer";

const middleware = [thunk];

jest.mock("axios", () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

const createTestStore = (initialState) => {
  return configureStore({
    reducer: {
      registerUserReducer: registerUserReducer,
      loginUserReducer: loginUserReducer,
    },
    middleware,
    devTools: true,
    preloadedState: initialState,
  });
};

describe("userActions.js", () => {
  describe("registerUser:", () => {
    const user = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "password123",
    };

    const initialState = {
      registerUserReducer: {},
    };

    it("USER_REGISTER_SUCCESS:", async () => {
      axios.post.mockResolvedValueOnce({ data: user });
      const store = createTestStore(initialState);
      await store.dispatch(registerUser(user));
      expect(store.getState().registerUserReducer.loading).toBe(false);
      expect(store.getState().registerUserReducer.success).toBe(true);
    });

    it("USER_REGISTER_FAILED:", async () => {
      const error = { message: "Error registering user" };
      axios.post.mockRejectedValueOnce(error);
      const store = createTestStore(initialState);
      await store.dispatch(registerUser(user));
      expect(store.getState().registerUserReducer.loading).toBe(false);
      expect(store.getState().registerUserReducer.error).toEqual(error);
    });
  });

  describe("loginUser:", () => {
    const user = {
      email: "john@example.com",
      password: "password123",
    };

    const initialState = {
      loginUserReducer: {},
    };

    it("USER_LOGIN_SUCCESS:", async () => {
      axios.post.mockResolvedValueOnce({ data: { token: "jwt_token" } });
      const store = createTestStore(initialState);
      await store.dispatch(userLogin(user));
      const state = store.getState().loginUserReducer;
      expect(state.loading).toBe(false);
      expect(state.success).toBe(true);
      expect(state.currentUser).toEqual({ token: "jwt_token" });
    });

    it("USER_LOGIN_FAILED:", async () => {
      const error = { message: "Invalid email or password" };
      axios.post.mockRejectedValueOnce(error);
      const store = createTestStore(initialState);
      await store.dispatch(userLogin(user));
      const state = store.getState().loginUserReducer;
      expect(state.loading).toBe(false);
      expect(state.error).toEqual(error);
    });
  });

});
