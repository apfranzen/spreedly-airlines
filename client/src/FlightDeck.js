import React, { useState, useEffect } from "react";
import { fetchSpreedly, handleResponse } from "./api";
import Flight from "./Flight";
import { toDollars } from "./helpers";

function FlightDeck({ token, setToken, setPaymentMethod, retain, setErrors }) {
  const [reservations, setReservations] = useState([]);
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const getFlights = async () => {
      const flights = await fetchSpreedly("/flights", "GET");
      console.log(flights);

      handleResponse(flights, setErrors) && setFlights(flights.flights);
    };
    getFlights();
    // eslint-disable-next-line
  }, []);

  const handleExpress = (onTransaction, flight) => {
    const SpreedlyExpress = global.SpreedlyExpress;
    const { price } = flight;
    SpreedlyExpress.init(
      process.env.REACT_APP_ENV_KEY,
      {
        amount: toDollars(price),
        company_name: "Spreedly Airlines",
        sidebar_top_description: "Come Fly Away",
        sidebar_bottom_description:
          "Your order total today, including all taxes and fees",
        submit_label: "Purchase Now"
      },
      {
        email: "customer@gmail.com"
      }
    );
    SpreedlyExpress.openView();

    SpreedlyExpress.onPaymentMethod((token, paymentMethod) => {
      console.log("onPaymentMethod", token, paymentMethod);
      // unload regardless of success, show error message in app if needed
      // todo check if need do anything on failed attempt
      SpreedlyExpress.unload();
      if (token) {
        console.log("onPaymentMethod", token, paymentMethod);
        setToken(token);
        setPaymentMethod(paymentMethod);
        onTransaction(paymentMethod, flight, token);
      } else {
        setErrors("Cannot Connect to Spreedly");
      }
    });
  };

  async function purchase(paymentMethod, flight, token) {
    const { price } = flight;

    const res = await fetchSpreedly("/purchase", "POST", {
      token,
      paymentMethod,
      price,
      flight
    });
    handleResponse(res, setErrors) &&
      setReservations(reservations.concat(res.order_id));
  }

  async function deliver(paymentMethod, flight, token) {
    const res = await fetchSpreedly("/deliver", "POST", {
      token,
      paymentMethod,
      flight
    });

    handleResponse(res, setErrors) &&
      setReservations(reservations.concat(res.order_id));
  }

  // if existing token, purchase or deliver
  // if no token, get one from spreedly, then purchase or deliver
  const handlePurchase = async (onTransaction, flight) => {
    if (!token && !retain) {
      handleExpress(onTransaction, flight);
    } else {
      onTransaction(onTransaction, flight, token);
    }
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridRow: 2,
          cellpadding: "10rem",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 2fr",
          gridGap: "1rem",
          justifyItems: "center"
        }}
      >
        <div
          style={{
            gridRow: 1,
            gridColumn: "1 / -1",
            color: "#304CB2",
            display: "contents"
          }}
        >
          <h3 style={{ gridColumn: 1 }}>Flight Number</h3>
          <h3 style={{ gridColumn: 2 }}>Origin</h3>
          <h3 style={{ gridColumn: 3 }}>Departure</h3>
          <h3 style={{ gridColumn: 4 }}>Destination</h3>
          <h3 style={{ gridColumn: 5 }}>Arrival</h3>
          <h3 style={{ gridColumn: 6 }}>Price</h3>
        </div>
        {flights.map((flight, idx) => (
          <Flight
            {...{
              key: idx,
              flight,
              handlePurchase,
              booked: reservations.includes(flight.number),
              purchase,
              deliver,
              token,
              retain
            }}
          />
        ))}
      </div>
    </>
  );
}
export default FlightDeck;
