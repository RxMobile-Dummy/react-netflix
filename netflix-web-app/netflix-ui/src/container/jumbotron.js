import React from "react";
import jumboData from "../fixtures/jumbo.json";

import styled from "styled-components/macro";

export function JumbotronContainer({ direction = "row" }) {
  return (
    <Container>
      {jumboData.map((item) => (
        <div className="item" key={item.id} direction={item.direction}>
          <div className="inner" direction={direction}>
            <div className="pane">
              <h1>{item.title}</h1>
              <h2>{item.subTitle}</h2>
            </div>
            <div className="pane">
              <img className="image" src={item.image} alt={item.alt} />
            </div>
          </div>
        </div>
      ))}
    </Container>
  );
}

export const Container = styled.div`
  @media (max-width: 1000px) {
    margin-bottom: 50px;
  }
  .item {
    display: flex;
    border-bottom: 8px solid #222;
    padding: 50px 5%;
    color: white;
    overflow: hidden;
  }
  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: ${({ direction }) => direction};
    max-width: 1100px;
    margin: auto;
    width: 100%;
    @media (max-width: 1000px) {
      flex-direction: column;
    }
  }

  .pane {
    width: 50%;
    @media (max-width: 1000px) {
      width: 100%;
      padding: 0 45px;
      text-align: center;
    }
  }
  .title {
    font-size: 50px;
    line-height: 1.1;
    margin-bottom: 8px;
    @media (max-width: 600px) {
      font-size: 35px;
    }
  }
  .subTitle {
    font-size: 26px;
    font-weight: normal;
    line-height: normal;
    @media (max-width: 600px) {
      font-size: 18px;
    }
  }
  .image {
    max-width: 100%;
    height: auto;
  }
`;
