import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const user = useSelector((state) => state.user.userDetails);

  console.log(user, "user");

  if (!user?.username) return <Navigate to="/" replace />;

  if (user?.role !== "ADMIN" && user?.role !== "SA") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex bg-slate-100 h-screen ">
      <Sidebar />
      <main className="w-full h-screen text-3xl flex flex-col gap-5 p-5 overflow-auto">
        <div className="h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
