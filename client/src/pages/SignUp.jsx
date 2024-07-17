import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { register } from "../redux/IsAuth/Action";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    role: "user",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, isRegister, msg } = useSelector((store) => {
    return {
      isLoading: store.RegisterReducer.isLoading,
      isError: store.RegisterReducer.isError,
      isRegister: store.RegisterReducer.isRegister,
      msg: store.RegisterReducer.msg,
    };
  }, shallowEqual);
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(form));
  };
  useEffect(() => {
    if (isRegister) {
      navigate("/login");
    }
  }, [isRegister]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-roboto">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-base font-bold mb-2 tracking-wide">
              Username
            </label>
            <input
              name="username"
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-base font-bold mb-2 tracking-wide">
              Email
            </label>
            <input
              name="email"
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-base font-bold mb-2 tracking-wide">
              Password
            </label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div className="mb-4">
            <select
              name=""
              id=""
              className="w-full py-2 px-2 border focus:border-primary rounded-md text-base "
              onChange={handleChange}
            >
              <option value="">Select User Type</option>
              <option value="admin">Admin</option>
              <option value="user"> User</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-2 px-1 rounded-lg hover:shadow-xl focus:outline-none"
          >
            {isLoading ? "Please wait..." : "Register"}
          </button>
        </form>
        {isError && <p className="text-red-700 mt-3">{msg}</p>}
      </div>
    </div>
  );
};

export default Register;
