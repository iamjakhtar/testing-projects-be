import {
  Menu,
  MenuButton,
  Button,
  Avatar,
  MenuList,
  MenuItem,
  Box,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router-dom";
import {
  ArrowForwardIcon,
  AddIcon,
  InfoIcon,
  HamburgerIcon,
  EditIcon,
} from "@chakra-ui/icons";

const getInitials = (userName) => {
  const names = userName.split(" ");
  return names
    .map((name) => name[0])
    .join("")
    .toUpperCase();
};

const NavBar = ({ loggedIn, name, onLogout }) => {
  return (
    <>
      <Box bg="teal.500" color="white" p={4} mb={8}>
        <Flex align="center" justify="space-between">
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <Heading as="h3" size="lg" color="white">
              Projects Demo
            </Heading>
          </NavLink>
          <Flex align="center">
            <NavLink
              to="/"
              style={{ textDecoration: "none", marginRight: "15px" }}
            >
              <Button leftIcon={<InfoIcon />} variant="link" color="white">
                Projects
              </Button>
            </NavLink>
            <NavLink
              to="/add-project"
              style={{ textDecoration: "none", marginRight: "15px" }}
            >
              <Button leftIcon={<AddIcon />} variant="link" color="white">
                New Project
              </Button>
            </NavLink>
            {loggedIn ? (
              <Menu>
                <MenuButton as={Button} variant="link" color="white">
                  <Avatar name={name} size="sm" bg="teal.700" color="white" w="40px" h="40px" border={2} borderColor={"white"}>
                    {getInitials(name)}
                  </Avatar>
                </MenuButton>
                <MenuList bg="teal.500" h="auto" p={2} minW={220} mt={4}>
                  <MenuItem onClick={onLogout} icon={<ArrowForwardIcon />}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <>
                <NavLink
                  to="/login"
                  style={{ textDecoration: "none", marginRight: "15px" }}
                >
                  <Button leftIcon={<EditIcon />} variant="link" color="white">
                    Login
                  </Button>
                </NavLink>
                <NavLink to="/register" style={{ textDecoration: "none" }}>
                  <Button
                    leftIcon={<HamburgerIcon />}
                    variant="link"
                    color="white"
                  >
                    Register
                  </Button>
                </NavLink>
              </>
            )}
          </Flex>
        </Flex>
      </Box>
      <Outlet />
    </>
  );
};

export default NavBar;
