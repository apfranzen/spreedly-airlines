import React, { useState } from "react";

import "./App.css";
import TransactionHistory from "./TransactionHistory";
import Settings from "./Settings";
import FlightDeck from "./FlightDeck";
import Errors from "./Errors";
const Header = () => <h1 style={{ gridRow: 1 }}>Spreedly Airlines</h1>;
function App() {
  const [token, setToken] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [retain, setRetain] = useState(false);
  const [error, setErrors] = useState(null);
  return (
    <div
      style={{
        display: "grid",
        gridGap: "4rem",
        justifyItems: "center",
        width: "100%"
      }}
    >
      <Header />

      <Settings
        {...{
          token,
          setToken,
          paymentMethod,
          setPaymentMethod,
          retain,
          setRetain,
          setErrors
        }}
      />
      {error && <Errors {...{ error }} />}
      <FlightDeck
        {...{
          token,
          setToken,
          paymentMethod,
          setPaymentMethod,
          retain,
          setErrors
        }}
      />

      <TransactionHistory />
    </div>
  );
}

export default App;
