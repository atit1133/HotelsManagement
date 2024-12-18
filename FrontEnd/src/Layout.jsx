import React from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="layout-content">
        <Menu />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
