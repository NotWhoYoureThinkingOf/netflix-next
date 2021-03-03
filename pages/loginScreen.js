import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SignUp from "../components/SignUp";
import { grabInput } from "../lib/slices/inputSlice";
import { selectUser } from "../lib/slices/userSlice";
import styles from "../styles/Login.module.css";

const loginScreen = () => {
  const [signIn, setSignIn] = useState(false);
  const [input, setInput] = useState(null);
  const user = useSelector(selectUser);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleInput = (e) => {
    e.preventDefault();
    setSignIn(true);
    dispatch(grabInput(input));
  };

  useEffect(() => {
    if (user) {
      router.push("/profileScreen");
    }
  }, [user]);

  return (
    <div className={styles.loginScreen}>
      <div className={styles.loginScreen__background}>
        <img
          onClick={
            !user ? () => router.push("/loginScreen") : () => router.push("/")
          }
          className={styles.loginScreen__logo}
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt=""
        />
        <button
          onClick={() => setSignIn(true)}
          className={styles.loginScreen__button}
        >
          Sign In
        </button>

        <div className={styles.loginScreen__gradient}></div>
      </div>

      <div className={styles.loginScreen__body}>
        {signIn ? (
          <SignUp />
        ) : (
          <>
            <h1>Unlimited Films, TV Programs, and more.</h1>
            <h2>Watch anywhere. Cancel at any time.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>

            <div className={styles.loginScreen__input}>
              <form>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  onClick={(e) => handleInput(e)}
                  className={styles.loginScreen__getStarted}
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default loginScreen;
