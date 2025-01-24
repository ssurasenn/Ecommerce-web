import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";

const Layout = () => {
  return (
    <div>
      <MainNav />

      <main className="h-full px-5 mt-3 mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
