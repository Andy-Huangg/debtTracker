import React from "react";
import LogOut from "./LogOut";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-2 bg-gray-800 text-white shadow-md">
      <h1 className="text-2xl font-bold ml-5 ">Debt Tracker</h1>
      <div className="mr-5">
        <LogOut />
      </div>
    </div>
  );
};

export default Header;
