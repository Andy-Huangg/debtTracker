// filepath: /C:/Users/andyh/repos/debtTracker/frontend/src/components/Common/Layout.jsx
import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow xl:p-4 bg-gray-100">{children}</div>
    </div>
  );
};

export default Layout;
