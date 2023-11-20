import React from "react";
import { Navbar, Container, Nav, NavDropdown, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "../Components/SearchBox";
// import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { userLogoutAction } from "../redux/actions/userAction";
import { USER_DETAILS_RESET } from "../redux/constants/userConstants";

const Header = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);

  const logoutHandler = (e) => {
    dispatch(userLogoutAction());
    dispatch({ type: USER_DETAILS_RESET });
  };
  return (
    <header>
      <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>SmartShop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            <SearchBox />
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fa-solid fa-cart-shopping" /> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown
                  title={
                    <>
                      <Image
                        src="../user.png"
                        fluid
                        style={{ width: "20px" }}
                      />{" "}
                      {userInfo.name}
                    </>
                  }
                  id="username"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      {" "}
                      <i className="fa-solid fa-user"></i> Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <i className="fas fa-sign-out"></i> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fa-solid fa-user" /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title={"Admin"} id="adminmenu">
                  <LinkContainer to="/admin/usersList">
                    <NavDropdown.Item>
                      <i className="fa-solid fa-users fa-xl"></i> Users
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productsList">
                    <NavDropdown.Item>
                      <i className="fa-solid fa-boxes-stacked fa-xl"></i>{" "}
                      Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/ordersList">
                    <NavDropdown.Item>
                      <i className="fa-solid fa-list-check fa-xl"></i> Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
