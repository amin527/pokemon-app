import TopNavbar from "../TopNavbar/TopNavbar";
import { Outlet } from "react-router";

function Layout() {
  return (
    <>
      <TopNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default Layout;
