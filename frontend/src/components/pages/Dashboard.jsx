import React from "react";
import useAuth from "../../hooks/useAuth";
import LogOut from "../LogOut";
import RedirectButton from "../RedirectButton";
import Debts from "../Debts";

const Dashboard = () => {
  useAuth();
  return (
    <div>
      <h1>Dashboard</h1>
      <Debts></Debts>
      <LogOut></LogOut>
      <RedirectButton redirectUrl={"/CreateDebt"}>Create Debt</RedirectButton>
    </div>
  );
};

export default Dashboard;
