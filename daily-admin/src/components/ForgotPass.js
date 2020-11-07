import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import Logo from "../images/Logo.png";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function ForgotPass() {
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);
  const { ResetPass } = useAuth();
  const [message, setMessage] = useState("")

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("i am triggered");

    try {
      setMessage("");
      setloading(true);
      setError("");
      await ResetPass(emailRef.current.value);
      setMessage("Set Your inbox for further instruction");
    } catch (err) {
      setError("Failed to Reset Password ");
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
            <h2 className="text-center mb-4">Reset Password</h2>
            <img className="logo-img" alt="logo" src={Logo} />
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="sucess">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email :</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                ></Form.Control>
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Reset Password
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/login">Login</Link>
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
