import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import Logo from "../images/Logo.png";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const userNameRef = useRef();
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const history = useHistory();
  function validateEmail() {
    return /^\"?[\w-_\.]*\"?@dailydishadmin\.com$/.test(emailRef.current.value);
  }
  async function handleSubmit(e) {
    console.log("Validation Function ", validateEmail());
    e.preventDefault();
    console.log("i am triggered");
    console.log(`pass1 ${passwordRef.current.value}`);
    console.log(`pass1 ${passwordConfirmRef.current.value}`);
    console.log(`email ${emailRef.current.value}`);

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords Do not match!");
    } else if (validateEmail() == false) {
      return setError("Not a Valid admin Email Domain!");
    }

    try {
      setloading(true);
      setError("");
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        userNameRef.current.value
      );
      history.push("/");
    } catch (err) {
      setError("Failed to Sign Up ");
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
            <h2 className="text-center mb-4">Sign Up Form</h2>
            <img className="logo-img"  alt="logo" src={Logo} />
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="userName">
                <Form.Label>Enter Your Name :</Form.Label>
                <Form.Control
                  type="text"
                  ref={userNameRef}
                  required
                ></Form.Control>
              </Form.Group>
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
              <Form.Group id="password-confirm">
                <Form.Label>Retype Password :</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                ></Form.Control>
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already Have an Account? <Link to="/login"> Login</Link>
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
