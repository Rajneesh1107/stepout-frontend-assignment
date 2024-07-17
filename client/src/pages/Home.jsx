import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllTrains } from "../redux/TicketBook/Action";

const initialState = {
  source: "",
  destination: "",
};
const Home = () => {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    let { name, value } = e.target;
    let newValue = value.trim().toUpperCase();
    setForm((pre) => {
      return { ...pre, [name]: newValue };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getAllTrains(form));
  };

  const { source, destination } = form;
  return (
    <div className="container mt-20 w-full">
      <div className="flex items-center justify-center font-roboto">
        <h1 className="text-3xl font-bold text-primary">
          Fastest Train Ticket Booking
        </h1>
      </div>
      <div className="flex items-center justify-center font-roboto mt-3">
        <p className="text-xl ">Easy IRCTC Login</p>
      </div>

      <div>
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center mt-6"
        >
          <input
            className="w-full px-3 py-2 border rounded-lg rounded-r-none focus:outline-none focus:border-primary text-2xl"
            type="text"
            name="source"
            placeholder="From Source"
            onChange={handleChange}
            value={source}
          />

          <input
            className="w-full px-3 py-2 border focus:outline-none  focus:border-primary text-2xl"
            type="text"
            name="destination"
            placeholder="To Destination"
            onChange={handleChange}
            value={destination}
          />

          <button
            type="submit"
            className=" w-1/2 px-3 py-2 text-white bg-primary text-2xl border border-l-0 rounded-lg rounded-l-none focus:outline-none focus:border-primary"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
