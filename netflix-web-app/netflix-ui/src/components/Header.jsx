import React from "react";

import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Header(props) {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="header">
        <div>
          <img className="img" src={logo} alt="logo" />
        </div>
        <button
          className="button"
          onClick={() => navigate(props.login ? "/login" : "/signup")}
        >
          {props.login ? "Log In" : "Sign Up"}
        </button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .header {
    padding: 0 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .img {
    height: 5rem;
  }

  .button {
    padding: 0.5rem 1rem;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
  }
`;
