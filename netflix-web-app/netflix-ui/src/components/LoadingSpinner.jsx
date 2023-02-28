import React from "react";

import styled from "styled-components";

export default function LoadingSpinner() {
  return (
    <Container>
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 10px solid #d50d0d; /* red */
    border-top: 10px solid #383636; /* Black */
    border-radius: 50%;
    animation: spinner 1.5s linear infinite;
  }

  .spinner-container {
    display: grid;
    justify-content: center;
    align-items: center;
    height: 350px;
  }
`;
