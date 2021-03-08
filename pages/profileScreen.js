import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logout } from "../lib/slices/userSlice";
import firebase from "../services/firebase";
import Nav from "../components/Nav";
import styles from "../styles/ProfileScreen.module.css";
import PlansScreen from "../components/PlansScreen";
import { grabRole, releaseRole } from "../lib/slices/roleSlice";

const ProfileScreen = () => {
  const user = useSelector(selectUser);
  const [role, setRole] = useState(null);
  const db = firebase.firestore();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    db.collection("customers")
      .doc(user?.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setRole(subscription.data().role);
          dispatch(grabRole({ roleStatus: subscription.data().role }));
        });
      });
  }, []);

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(logout());
        dispatch(releaseRole());
      });
  };

  useEffect(() => {
    if (!user) {
      router.push("/loginScreen");
    }
  }, [user]);

  return (
    // add button that says something like go to movies/shows
    <div className={styles.profileScreen}>
      <Nav />
      <div className={styles.profileScreen__body}>
        <h1>Edit Profile</h1>
        <div className={styles.profileScreen__info}>
          <img
            className={styles.profileScreen__infoImage}
            src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
            alt=""
          />
          <div className={styles.profileScreen__details}>
            <h2>{user?.email}</h2>
            <div className={styles.profileScreen__plans}>
              <h3>
                Plans{" "}
                <span className="current__plan">(Current Plan: {role})</span>
              </h3>
              {/* <PlansScreen /> */}
              <PlansScreen />
              <button
                disabled={role === null}
                onClick={() => role && router.push("/")}
                className={styles.profileScreen__goToMovies}
              >
                {role ? "Go To The Movies Page" : "Pick A Subscription"}
              </button>
              <button
                onClick={signOut}
                className={styles.profileScreen__signOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
