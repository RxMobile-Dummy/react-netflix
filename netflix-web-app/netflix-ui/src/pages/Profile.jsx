import React, { useEffect, useState } from "react";
import { auth } from "../App";
import PlansScreen from "./PlansScreen";
// import "../pages/Profile.css";
import styled from "styled-components";
import NavForProfile from "../components/NavForProfile";

import Navbar from "../components/Navbar";

export default function Profile() {
  const [email, setEmail] = useState(undefined);

  auth.onAuthStateChanged((currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    }
  });

  return (
  <Container>
        <div className="profileScreen">
          {/* <NavForProfile /> */}
          <Navbar />

          <div className="profileScreen__body">
            <h1>Edit Profile</h1>
            <div className="profileScreen__info">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt=""
              />
              <div className="profileScreen__details">
                <h2>{email}</h2>
                <div className="profileScreen__plans">
                  <h3>Plans</h3>
                  <PlansScreen />
                  <button
                    onClick={() => auth.signOut()}
                    className="profileScreen_signOut"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    
  );
}

const Container = styled.div`
  .profileScreen {
    color: white;
    height: 100vh;
  }

  .profileScreen__body {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 8%;
    max-width: 800px;
  }

  .profileScreen__body > h1 {
    font-size: 60px;
    font-weight: 400;
    border-bottom: 1px solid #282c2d;
    margin-bottom: 20px;
  }

  .profileScreen__info {
    display: flex;
  }

  .profileScreen__info > img {
    height: 100px;
  }

  .profileScreen__details {
    color: white;
    margin-left: 25px;
    flex: 1;
  }

  .profileScreen__details > h2 {
    background-color: gray;
    padding: 15px;
    font-size: 15px;
    padding-left: 20px;
  }

  .profileScreen_signOut {
    padding: 10px 20px;
    font-size: 1rem;
    margin-top: 5%;
    width: 100%;
    color: #fff;
    background-color: #e50914;
    font-weight: 600;
    border: none;
    cursor: pointer;
  }
  .profileScreen__plans > h3 {
    border-bottom: 1px solid #282c2d;
    padding-bottom: 10px;
    margin-top: 1rem;
  }
`;
