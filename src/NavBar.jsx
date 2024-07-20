import { NavLink, Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <header className="nav-header">
        <NavLink to="/" className="header-logo">
          <h3>Projects Demo</h3>
        </NavLink>
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
