import React from "react";
import background from "../assets/login.jpg";
import styled from "styled-components";

export default function BackgroundImage() {
  return (
    <Container>
      <div className="backgroundImage">
        <img className="img" src={background} alt="background" />
      </div>
    </Container>
  );
}

const Container = styled.div`
  .backgroundImage {
    height: 100vh;
    width: 100vw;
  }
  ,
  .img {
    height: 100vh;
    width: 100vw;
  }
`;
