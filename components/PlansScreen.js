import React, { useEffect, useState } from "react";
import firebase from "../services/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../lib/slices/userSlice";
import styles from "../styles/PlansScreen.module.css";
import { loadStripe } from "@stripe/stripe-js";

const PlansScreen = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const db = firebase.firestore();
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    db.collection("customers")
      .doc(user?.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start: subscription.data().current_period_start
              .seconds,
          });
        });
      });
  }, []);

  // .get() is there because the plans probably will stay static where as .onSnapshot() could be for more dynamic or changing data
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
      });
  }, []);

  console.log("products", products);

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        // show an error to your customer and inspect your Cloud Function logs in the Firebase console
        alert(`An error occured ${error.message}`);
      }

      if (sessionId) {
        // we have a session, let's redirect to Checkout, Init Stripe

        const stripe = await loadStripe(
          "pk_test_51IQdJ0KjW1A3K4rCDNCHEeXnaqWZ3uRL5rehevR4XXva2fexiIO6dTfHBp8dhXWLdUAnrQFWysiSuMBGVrxJOPPP00lhuQv5NM"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className={styles.plansScreen}>
      {Object.entries(products).map(([productId, productData]) => {
        // add some logiv to check if the user's seubscription is active
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);

        return (
          <div
            key={productId}
            className={` ${
              isCurrentPackage && styles.plansScreen__planDisabled
            } ${styles.plansScreen__plan}`}
          >
            <div className={styles.plansScreen__info}>
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>

            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData?.prices?.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PlansScreen;
