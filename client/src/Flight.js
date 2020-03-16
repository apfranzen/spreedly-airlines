import React from "react";
import { parseDate, toDollars } from "./helpers";

function Flight({ flight, booked, handlePurchase, purchase, deliver, token }) {
  return (
    <div style={{ gridRow: 2, display: "contents" }}>
      <div style={{ gridColumn: 1 }}>{flight.number}</div>
      <div style={{ gridColumn: 2 }}>{flight.origin}</div>
      <div style={{ gridColumn: 3 }}>{parseDate(flight.departure)}</div>
      <div style={{ gridColumn: 4 }}>{flight.destination}</div>
      <div style={{ gridColumn: 5 }}>{parseDate(flight.arrival)}</div>
      <div style={{ gridColumn: 6 }}>{toDollars(flight.price)}</div>
      <div style={{ gridColumn: 7 }}>
        {booked ? (
          "Purchased!"
        ) : (
          <>
            <button onClick={e => handlePurchase(purchase, flight, token)}>
              Buy
            </button>
            <button onClick={e => handlePurchase(deliver, flight, token)}>
              Buy with Espreedlia
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Flight;
