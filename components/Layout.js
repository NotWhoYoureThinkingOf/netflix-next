import React, { useEffect, useState } from "react";
import Head from "next/head";
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
      <Head>
        <meta
          name="viewport"
          content="height=device-height, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, target-densitydpi=device-dpi"
        />
        <meta charSet="utf-8" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/netflix-icon.png" key="ogimage" />
        <title>Nextflix</title>
        <meta
          property="og:description"
          content="A Next.js version of the Netflix clone"
          key="ogdesc"
        />
        <link rel="icon" href="/netflix-icon.png" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
