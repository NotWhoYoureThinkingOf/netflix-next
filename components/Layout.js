import React, { useEffect, useState } from "react";
import styles from "../styles/Layout.module.css";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../lib/slices/userSlice";
import firebase from "../services/firebase";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const auth = firebase.auth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        console.log("logged in", userAuth);
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
