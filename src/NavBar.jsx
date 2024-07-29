import { Menu, MenuButton, Button, Avatar, MenuList, MenuItem } from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import "./NavBar.css";


const getInitials = (userName) => {
  const names = userName.split(" ");
  return names.map(name => name[0]).join("").toUpperCase();
};

const NavBar = ({ loggedIn, name, onLogout }) => {

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
            {loggedIn ? (
              <Menu>
                <MenuButton
                  as={Button}
                  bg="transparent"
                  border="none"
                  _hover={{ bg: "transparent" }}
                >
                  <Avatar
                    name={name}
                    size="sm"
                    bg="teal.500"
                    color="white"
                    src=""
                    style={{ width: '40px', height: '40px', borderRadius: '50%'}}
                  >
                    {getInitials(name)}
                  </Avatar>
                </MenuButton>
                <MenuList width="100px" minHeight="100px" border="1px" borderColor="grey.100">
                  <MenuItem 
                  onClick={onLogout} 
                  padding="10px" 
                  bg="teal.500" 
                  color="whitesmoke" 
                  _hover={{ bg: "teal.300"}} 
                  >Logout
                  <ArrowForwardIcon w={10} h={5} color={"whitesmoke"}/>
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};
export default NavBar;
