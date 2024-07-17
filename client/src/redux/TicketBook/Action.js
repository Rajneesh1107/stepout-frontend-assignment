import axios from "axios";
const {
  TICKET_REQUEST,
  TICKET_SUCCESS,
  TICKET_FAILURE,
} = require("./ActionType");

export const getAllTrains = (payload) => async (dispatch) => {
  const getToken = localStorage.getItem("access_token");
  if (!getToken) {
    throw new Error("First login again");
  }

  console.log(payload, getToken);
  dispatch({ type: TICKET_REQUEST });
  try {
    const res = await axios.get(
      `http://localhost:3001/api/trains/availability?source=${payload.source}&destination=${payload.destination}`,
      {
        headers: {
          Authorization: `Bearer ${getToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res, "Hello"); // Assuming you're interested in the data part of the response
  } catch (error) {
    console.error("Error:", error?.message || error); // Improved error logging
  }
};
