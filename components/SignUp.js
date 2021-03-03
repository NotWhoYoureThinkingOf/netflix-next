import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../services/firebase";
import { selectInput } from "../lib/slices/inputSlice";
import { login } from "../lib/slices/userSlice";
import styles from "../styles/SignUp.module.css";

const SignUp = ({ value }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const inputValue = useSelector(selectInput);
  const dispatch = useDispatch();

  const register = (e) => {
    e.preventDefault();
    return firebase
      .auth()
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        dispatch(login({ email: authUser.user.email, uid: authUser.user.uid }));
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    return firebase
      .auth()
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((response) => {
        console.log(response);
        dispatch(login({ email: response.user.email, uid: response.user.uid }));
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className={styles.signUpScreen}>
      <form>
        <h1>Sign In</h1>
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          value={inputValue && inputValue}
        />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className={styles.signUpScreen__gray}>New to Netflix? </span>
          <span className={styles.signUpScreen__link} onClick={register}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
};

export default SignUp;
