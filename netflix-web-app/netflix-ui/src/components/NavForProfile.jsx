import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { auth } from "../App";

export default function NavForProfile() {
  
  const navigate = useNavigate();

  auth.onAuthStateChanged((currentUser) => {
    if (!currentUser) {
      navigate("/login");
    }
  });

  return (
    <Container>
      <nav className={`flex `}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div className="right flex a-center">
          <div className="profile_avatar">
            <img
              onClick={() => navigate("/profile")}
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt=""
            />
          </div>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  .profile_avatar {
    img {
      height: 2rem;
      cursor: pointer;
    }
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
    }
  }
`;
