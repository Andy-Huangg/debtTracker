import React from "react";
import useAuth from "../../hooks/useAuth";
import LogOut from "../Common/LogOut";
import RedirectButton from "../Common/RedirectButton";
import Debts from "../Common/Debts";

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
