import { NavLink } from "react-router-dom";
import DashboardLinks from "./DashboardLinks";

const NavItems = () => {
  return (
    <>
      <DashboardLinks />
      <li className="px-4 py-1 md:hover:underline">
        <NavLink to={"/"}>Homes</NavLink>
      </li>
    </>
  );
};

export default NavItems;
