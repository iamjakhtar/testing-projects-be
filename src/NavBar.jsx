import { NavLink, Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <header className="nav-header">
        <h1>Projects Demo</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Projects</NavLink>
            </li>
            <li>
              <NavLink to="/add-project">New Project</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};
export default NavBar;
