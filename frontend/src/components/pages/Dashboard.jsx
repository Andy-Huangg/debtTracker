import React from "react";
import useAuth from "../../hooks/useAuth";
import LogOut from "../Common/LogOut";
import RedirectButton from "../Common/RedirectButton";
import Debts from "../Common/Debts";
import Header from "../Common/Header";
import Layout from "../Common/LayOut";

const Dashboard = () => {
  useAuth();
  return (
    <Layout>
      <div className="flex xl:p-8 h-screen">
        <div className="xl:w-1/4"></div>
        <div className="flex-grow p-4 bg-white shadow-md rounded-lg overflow-auto">
          <Debts />
        </div>
        <div className="xl:w-1/4"></div>
      </div>
    </Layout>
  );
};

export default Dashboard;
