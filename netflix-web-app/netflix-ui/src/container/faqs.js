import React, { useState } from "react";

import faqsData from "../fixtures/faqs.json";
import styled from "styled-components/macro";
import EmailForm from "../components/EmailForm";

export function FaqsContainer() {
  const [toggleShow, setToggleShow] = useState("");

  return (
    <Container>
      <div className="inner">
        <h1 className="title">Frequently Asked Questions</h1>
        <div className="frame">
          {faqsData.map((item) => (
            <div className="item" key={item.id}>
              <div
                className="header"
                onClick={() => {
                  if (item.id === toggleShow) {
                    setToggleShow("");
                    return;
                  }
                  setToggleShow(item.id);
                }}
              >
                {item.header}
                {toggleShow === item.id ? (
                  <img src="/icons/close-slim.png" alt="Close" />
                ) : (
                  <img src="/icons/add.png" alt="Open" />
                )}
              </div>
              <Body className={toggleShow === item.id ? "open" : "closed"}>
                <span>{item.body}</span>
              </Body>
            </div>
          ))}
        </div>

        <EmailForm />
      </div>
    </Container>
  );
}

export const Body = styled.div`
  font-size: 26px;
  font-weight: normal;
  line-height: normal;
  background: #303030;
  white-space: pre-wrap;
  user-select: none;
  overflow: hidden;
  &.closed {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.25s cubic-bezier(0.5, 0, 0.1, 1);
  }
  &.open {
    max-height: 1200px;
    transition: max-height 0.25s cubic-bezier(0.5, 0, 0.1, 1);
  }
  span {
    display: block;
    padding: 0.8em 2.2em 0.8em 1.2em;
  }
  @media (max-width: 600px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

export const Container = styled.div`
  display: flex;
  border-bottom: 8px solid #222;
  .inner {
    display: flex;
    padding: 70px 45px;
    flex-direction: column;
    max-width: 815px;
    margin: auto;
  }
  .title {
    font-size: 50px;
    line-height: 1.1;
    margin-top: 0;
    margin-bottom: 8px;
    color: white;
    text-align: center;
    @media (max-width: 600px) {
      font-size: 35px;
    }
  }
  .frame {
    margin-bottom: 40px;
  }
  .item {
    color: white;
    margin: auto;
    margin-bottom: 10px;
    max-width: 728px;
    width: 100%;
    &:first-of-type {
      margin-top: 3em;
    }
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    margin-bottom: 1px;
    font-size: 26px;
    font-weight: normal;
    background: #303030;
    padding: 0.8em 1.2em 0.8em 1.2em;
    user-select: none;
    align-items: center;
    img {
      filter: brightness(0) invert(1);
      width: 24px;
      user-select: none;
      @media (max-width: 600px) {
        width: 16px;
      }
    }
    @media (max-width: 600px) {
      font-size: 16px;
    }
  }
  .body {
    font-size: 26px;
    font-weight: normal;
    line-height: normal;
    background: #303030;
    white-space: pre-wrap;
    user-select: none;
    overflow: hidden;
    &.closed {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.25s cubic-bezier(0.5, 0, 0.1, 1);
    }
    &.open {
      max-height: 1200px;
      transition: max-height 0.25s cubic-bezier(0.5, 0, 0.1, 1);
    }
    span {
      display: block;
      padding: 0.8em 2.2em 0.8em 1.2em;
    }
    @media (max-width: 600px) {
      font-size: 16px;
      line-height: 22px;
    }
  }
`;

// import React from "react";

// import Accordion from "../components/accordion";
// import OptForm from "../components/opt-form";
// import faqsData from "../fixtures/faqs.json";

// export function FaqsContainer() {
//   return (
//     <Accordion>
//       <Accordion.Title>Frequently Asked Questions</Accordion.Title>
//       <Accordion.Frame>
//         {faqsData.map((item) => (
//           <Accordion.Item key={item.id}>
//             <Accordion.Header>{item.header}</Accordion.Header>
//             <Accordion.Body>{item.body}</Accordion.Body>
//           </Accordion.Item>
//         ))}
//       </Accordion.Frame>

//       <OptForm>
//         <OptForm.Input placeholder="Email address" />
//         <OptForm.Button>Try it now</OptForm.Button>
//         <OptForm.Break />
//         <OptForm.Text>
//           Ready to watch? Enter your email to create or restart your membership.
//         </OptForm.Text>
//       </OptForm>
//     </Accordion>
//   );
// }
