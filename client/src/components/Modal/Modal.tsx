import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

interface ModalProps {
  text: string;
  variant: "primary" | "danger" | "secondary";
  isSignupFlow: boolean;
}

const ErrorMessage = styled.p`
  color: red;
`;

const ModalComponent = ({ text, variant, isSignupFlow }: ModalProps) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = async () => {
    let data;
    if (isSignupFlow) {
      const { data: signUpData } = await axios.post(
        "http://localhost:8080/auth/signup",
        {
          email,
          password,
        }
      );
      data = signUpData;
    } else {
      const { data: loginData } = await axios.post(
        "http://localhost:8080/auth/login",
        {
          email,
          password,
        }
      );
      data = loginData;
    }
    if (data.errors) {
      setErrorMsg(data.errors[0].msg);
    }
  };

  return (
    <>
      <Button
        onClick={handleShow}
        variant={variant}
        size="lg"
        style={{ marginRight: "1rem", padding: "0.6rem 2.5rem" }}
      >
        {text}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text>Email</InputGroup.Text>
            <FormControl
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            {text}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;
