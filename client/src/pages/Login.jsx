import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { login } from "../redux/IsAuth/Action";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const initState = { email: "", password: "" };
  const [form, setForm] = useState(initState);

  const dispatch = useDispatch();
  const navigate = useNavigate(-1);

  const { isAuth, isLoading, isError, msg, access_token } = useSelector(
    (store) => {
      return {
        isAuth: store.AuthReducer.isAuth,
        isLoading: store.AuthReducer.isLoading,
        isError: store.AuthReducer.isError,
        errorMessage: store.AuthReducer.errorMessage,
        access_token: store.AuthReducer.token,
        msg: store.AuthReducer.msg,
      };
    },
    shallowEqual
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };
  useEffect(() => {
    if (isAuth) {
      localStorage.setItem("access_token", access_token);
      navigate("/");
    }
  }, [isAuth]);

  console.log(isAuth, access_token, msg);
  const { email, password } = form;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-roboto">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isAuth ? "Login Success..." : "User Login"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-base font-bold mb-2 tracking-wide">
              Email
            </label>
            <input
              name="email"
              onChange={handleChange}
              value={email}
              placeholder="Username"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-base font-bold mb-2 tracking-wide">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-1 rounded-lg hover:shadow-xl focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : "Login"}
          </button>
        </form>
        {isError && <p className="text-secondary mt-2">{msg}</p>}
      </div>
    </div>
  );
};

export default Login;
