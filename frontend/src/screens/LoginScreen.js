import React, { useState, useEffect } from "react";
import FormContainer from "../Components/FormContainer";
import { Button, Col, Form, FormGroup, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  userDetailsAction,
  userLoginAction,
} from "../redux/actions/userAction";
import { Message } from "../Components/Message";
import Meta from "../Components/Meta";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const location = useLocation();
  const userLogin = useSelector((state) => state.userLogin);
  const { error: userDetailsError, user } = useSelector(
    (state) => state.userDetails
  );

  const dispatch = useDispatch();
  const { error, loading, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (!userDetailsError && user && userInfo) {
      navigate(redirect);
    }
  }, [user, redirect, userInfo, userDetailsError, navigate]);

  useEffect(() => {
    if (userInfo) {
      dispatch(userDetailsAction("profile"));
    }
  }, [dispatch, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLoginAction({ email, password }));
  };

  return (
    <FormContainer>
      <Meta title={"Login"} />
      <h1>Sign In</h1>
      {error && <Message varient={"danger"} message={error} />}
      {userDetailsError && (
        <Message varient={"danger"} message={userDetailsError} />
      )}
      {/* {loading && <Loader />} */}
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </FormGroup>
        <FormGroup controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </FormGroup>
        <Row>
          <Col xs={8} sm={7} lg={6} xl={5} md={10}>
            <Button
              className="py-2.5 my-3 w-50 "
              disabled={loading}
              variant="dark"
              type="submit"
            >
              {loading ? (
                <>
                  {" "}
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden" />
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </Col>
        </Row>
      </Form>
      <Row className="">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
