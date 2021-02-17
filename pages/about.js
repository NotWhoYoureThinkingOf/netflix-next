import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { grabText, releaseText, selectText } from "../lib/slices/textSlice";
import aboutStyles from "../styles/About.module.css";

export const about = () => {
  const dispatch = useDispatch();
  const text = useSelector(selectText);
  const [inputText, setInputText] = useState("");

  const sendText = (e) => {
    e.preventDefault();
    dispatch(grabText(inputText));
  };

  useEffect(() => {
    console.log(text);
  }, [text]);

  return (
    <div className={aboutStyles.about}>
      <h1>this is the about page</h1>
      <form>
        <input
          type="text"
          placeholder="enter text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={sendText} type="submit">
          Send
        </button>
      </form>

      {text && <h2>{text}</h2>}
      <h3>{inputText}</h3>
    </div>
  );
};

export default about;
