import React, { useState } from "react";
import { fetchSpreedly, handleResponse } from "./api";

function Settings({ token, retain, setRetain, setErrors }) {
  const [success, setSuccess] = useState(null);
  const saveCreditCard = async token => {
    const res = await fetchSpreedly("/retain", "PUT", {
      payment_method_token: token
    });
    handleResponse(res, setErrors) && setSuccess(true);
  };
  return (
    <div
      style={{
        display: "grid",
        gridRow: 3,
        background: "#e8ecf9",
        width: "50%",
        gridTemplateColumns: "2fr 1fr",

        justifyItems: "center",
        alignItems: "center"
      }}
    >
      {token && (
        <>
          <h3 style={{ gridColumn: 1 }}> Save Card for Future Trips</h3>
          {success ? (
            <div style={{ gridColumn: 2 }}>Saved!</div>
          ) : (
            <button
              style={{ gridColumn: 2 }}
              onClick={e => {
                saveCreditCard(token);
                setRetain(true);
              }}
            >
              Save Credit Card
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Settings;
