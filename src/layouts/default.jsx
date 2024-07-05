import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <main className="flex flex-col min-h-screen p-4 overflow-auto items-center justify-center">
      <NavLink to="/pdf-viewer" className="text-lg font-semibold md:text-base">
        PDF Viewer
      </NavLink>
      <Outlet />
    </main>
  );
};

export default Layout;