import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import Logo from "../images/Logo.png";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import { db } from "../Firebase";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [userStatus, setuserStatus] = useState(false);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);
  const { login, currentUser } = useAuth();

  const history = useHistory();

  function validateEmail() {
    return /^\"?[\w-_\.]*\"?@dailydishadmin\.com$/.test(emailRef.current.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("i am triggered");
    console.log("Email Validation Function ", validateEmail());

    try {
      setError("");
      if (validateEmail() == false) {
        return setError("Invalid Admin Email");
      }

      setloading(true);

      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (err) {
      setError("Failed to Sign In ");
      console.log(err);
    }

    setloading(false);
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log In Form</h2>
            <img className="logo-img" alt="logo" src={Logo} />
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email :</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password :</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  required
                ></Form.Control>
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Login
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an Account? <Link to="/signup">Sign Up</Link>
        </div>
        {/* <Card>
          <Card.Body>
              <h1>Signup</h1>
              <Form>
            <Form.Group id="userName">
              <Form.Label>UserName :</Form.Label>
              <Form.Control
                type="text"
                ref={userNameRef}
                required
              ></Form.Control>
            </Form.Group>
            </Form>
          </Card.Body>
      </Card> */}
      </div>
    </Container>
  );
}
