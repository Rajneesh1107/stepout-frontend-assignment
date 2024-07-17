import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogOut from "../pages/LogOut";

const Links = () => {
  const { isAuth } = useSelector((store) => {
    return store.AuthReducer.isAuth;
  });
  return (
    <div className="container w-full py-3 flex items-center justify-between">
      <NavLink to={"/"}>
        <img
          src="https://static.vecteezy.com/system/resources/previews/010/140/824/non_2x/transport-train-icon-sign-design-free-png.png"
          alt="logo"
          className="w-12 "
        />
      </NavLink>
      <div className="w-52 text-xl text-primary font-semibold flex items-center  justify-between">
        <NavLink to={"/"}>Home</NavLink>
        {isAuth ? <LogOut /> : <NavLink to={"/login"}>Login</NavLink>}
        <NavLink to={"/register"}>register</NavLink>
      </div>
    </div>
  );
};

export default Links;
