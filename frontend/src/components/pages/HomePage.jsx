import { useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <Link to="/register">Register</Link>
        <br></br>
        <Link to="/login">Login</Link>
      </div>

      <div></div>
    </>
  );
}

export default HomePage;
