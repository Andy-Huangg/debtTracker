import React from "react";
import { Link } from "react-router-dom";
import LogOut from "./LogOut";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-2 bg-gray-800 text-white shadow-md">
      <Link to="/dashboard" className="ml-5">
        <h1 className="text-2xl font-bold hover:scale-110 hover:shadow-lg transition-transform duration-100">
          Debt Tracker
        </h1>
      </Link>
      <div className="mr-5">
        <LogOut />
      </div>
    </div>
  );
};

export default Header;
