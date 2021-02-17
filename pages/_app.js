import { Provider } from "react-redux";
import "../styles/globals.css";
import store from "../store";
import Layout from "../components/Layout";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default MyApp;
