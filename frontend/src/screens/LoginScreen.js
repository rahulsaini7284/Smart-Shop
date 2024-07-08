import React, { useState, useEffect } from "react";
import FormContainer from "../Components/FormContainer";
import { Button, Col, Form, FormGroup, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import {
  userDetailsAction,
  userLoginAction,
  userRegisterAction,
} from "../redux/actions/userAction";
import { Message } from "../Components/Message";
import Meta from "../Components/Meta";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { FacebookLoginButton } from "react-social-login-buttons";
import { LoginSocialFacebook } from "reactjs-social-login";

const LoginScreen = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [appId, setAppId] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const location = useLocation();
  const userLogin = useSelector((state) => state.userLogin);
  const { error: userDetailsError, user } = useSelector(
    (state) => state.userDetails
  );
  const [googleData, setGoogleData] = useState({ email: "", password: "" });
  const [facebookData, setFacebookData] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const { error, loading, userInfo } = userLogin;
  const { error: registerErr } = useSelector((state) => state.userRegister);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (!userDetailsError && user && userInfo) {
      navigate(redirect);
    }
  }, [user, redirect, userInfo, userDetailsError, navigate]);

  useEffect(() => {
    async function getAppId() {
      const { data } = await axios("/app_id");
      setAppId(data);
    }
    getAppId().catch((err) => console.log(err.message));
    if (userInfo) {
      dispatch(userDetailsAction("profile"));
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (
      registerErr === "User Already Exist" &&
      googleData.email &&
      googleData.password
    ) {
      dispatch(
        userLoginAction({
          email: googleData.email,
          password: googleData.password,
        })
      );
    }

    setFacebookData({ email: "", password: "" });
  }, [registerErr, dispatch, googleData]);
  useEffect(() => {
    if (
      registerErr === "User Already Exist" &&
      facebookData.email &&
      facebookData.password
    ) {
      dispatch(
        userLoginAction({
          email: facebookData.email,
          password: facebookData.password,
        })
      );
      setGoogleData({ email: "", password: "" });
    }
  }, [registerErr, dispatch, facebookData]);

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
        <FormGroup controlId="password" style={{ position: "static" }}>
          <Form.Label>Password</Form.Label>
          <div style={{ position: "relative" }}>
            <Form.Control
              type={show ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
            <span style={{ position: "absolute", right: "1rem", top: "13px" }}>
              {show ? (
                <i
                  onClick={() => setShow(false)}
                  className="fa-solid fa-eye-slash fa-lg"
                ></i>
              ) : (
                <i
                  onClick={() => setShow(true)}
                  className="fa-solid fa-eye fa-lg"
                ></i>
              )}
            </span>
          </div>
        </FormGroup>
        <Row>
          <Col xs={8} sm={7} lg={6} xl={5} md={10}>
            <Button
              className="py-2.5 my-3 "
              disabled={loading}
              variant="dark"
              type="submit"
              style={{ width: "209.5px", borderRadius: "3px" }}
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
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                var decodedRes = jwtDecode(credentialResponse.credential);
                setGoogleData({
                  email: decodedRes.email,
                  password: `@{[($${decodedRes.name}`,
                });
                dispatch(
                  userRegisterAction({
                    email: decodedRes.email,
                    name: decodedRes.name,
                    password: `@{[($${decodedRes.name}`,
                  })
                );
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            {appId && (
              <LoginSocialFacebook
                appId={appId}
                onResolve={(res) => {
                  setFacebookData({
                    email: res.data.email,
                    password: `${res.data.id}+${res.data.first_name}+${res.data.email}`,
                  });
                  dispatch(
                    userRegisterAction({
                      email: res.data.email,
                      password: `${res.data.id}+${res.data.first_name}+${res.data.email}`,
                      name: res.data.name,
                    })
                  );
                }}
                onReject={(err) => console.log(err)}
              >
                <FacebookLoginButton
                  style={{
                    width: "210.5px",
                    marginTop: "1rem",
                    marginLeft: "0",
                    fontSize: "1rem",
                  }}
                />
              </LoginSocialFacebook>
            )}
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
