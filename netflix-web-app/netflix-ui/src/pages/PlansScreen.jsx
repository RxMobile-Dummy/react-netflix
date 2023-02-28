import React, { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { auth, db } from "../App";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";

export default function PlansScreen() {
  const [products, setProducts] = useState([]);
  const [subScription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log("userrrrr>>>>>", user);
      db.collection("customers")
        .doc(user.uid)
        .collection("subscriptions")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(async (subscription) => {
            setSubscription({
              role: subscription.data().role,
              current_period_end:
                subscription.data().current_period_end.seconds,
              current_period_start:
                subscription.data().current_period_start.seconds,
            });
          });
        });
    });
  }, [auth]);


  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(auth.currentUser.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51MYkDuSI1ceEt67ipTacmCfgEcDUtTdi4HG7qqU1xj0eo2p44GsncNBtpZlYKp9LKTGrcyqxh8CwsbKii5WBZJUf00AHJ1xOkB"
        );

        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <>
      <Container>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="plansScreen">
            <br />
            {subScription && (
              <p>
                Renewal date:{" "}
                {new Date(
                  subScription?.current_period_end * 1000
                ).toLocaleDateString()}
              </p>
            )}
            {Object.entries(products).map(([productId, productData]) => {
              const isCurrentPackage = productData.name
                ?.toLowerCase()
                .includes(subScription?.role);
              return (
                <div
                  key={productId}
                  className={`${
                    isCurrentPackage && "plansScreen__plan--disabled"
                  } plansScreen__plan`}
                >
                  <div className="plansScreen__info">
                    <h5>{productData.name}</h5>
                    <h6>{productData.description}</h6>
                  </div>
                  {loading ? (
                    <LoadingSpinner />
                  ) : (
                    <button
                      onClick={() => {
                        !isCurrentPackage &&
                          loadCheckout(productData.prices.priceId);
                      }}
                    >
                      {isCurrentPackage ? "Current Package" : "Subscribe"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  .plansScreen__plan {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    opacity: 0.8;
  }

  .plansScreen__plan:hover {
    opacity: 1;
  }

  .plansScreen__plan > button {
    padding: 10px 20px;
    font-size: 1rem;
    color: white;
    background-color: #e50914;
    font-weight: 600;
    border: none;
    cursor: pointer;
  }

  .plansScreen__plan--disabled > button {
    background-color: grey;
  }
`;
