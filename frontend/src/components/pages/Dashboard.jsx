import React from "react";
import useAuth from "../../hooks/useAuth";
import LogOut from "../LogOut";
import RedirectButton from "../RedirectButton";

const Dashboard = () => {
  useAuth();
  return (
    <div>
      <h1>Dashboard</h1>
      <LogOut></LogOut>
      <RedirectButton redirectUrl={"/CreateDebt"}>Create Debt</RedirectButton>
    </div>
  );
};

export default Dashboard;
