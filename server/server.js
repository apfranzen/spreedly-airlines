const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

app.use(bodyParser.json());

app.post("/api/purchase", (req, res) => {
  const {
    body: {
      token,
      price,
      flight: { number }
    }
  } = req;
  useApi(
    `https://core.spreedly.com/v1/gateways/${process.env.APP_TOKEN}/purchase.json`,
    "post",
    {
      transaction: {
        payment_method_token: token,
        amount: price,
        currency_code: "USD",

        order_id: number
      }
    }
  )
    .then(response => {
      const {
        data: {
          transaction: { succeeded, order_id }
        }
      } = response;
      console.log("response from spreedly: ", response.data);
      res.send(JSON.stringify({ succeeded, order_id }));
    })
    .catch(error => {
      const {
        response: {
          status,
          data: {
            transaction: { message }
          }
        }
      } = error;
      res.status(status);
      res.send(JSON.stringify({ message }));
    });
});

app.post("/api/deliver", (req, res) => {
  const {
    body: {
      token,
      flight: { number }
    }
  } = req;

  useApi(
    `https://core.spreedly.com/v1/receivers/${process.env.APP_PMD_TOKEN_ECHO}/deliver.json`,
    "post",
    {
      delivery: {
        payment_method_token: token,
        url: process.env.APP_RECEIVER_URL,
        headers: "Content-Type: application/json",
        body: JSON.stringify({
          order_id: number,
          card_number: "{{credit_card_number}}"
        })
      }
    }
  )
    .then(response => {
      const {
        data: {
          transaction: {
            succeeded,
            response: { status }
          }
        }
      } = response;
      res.status(status);
      res.send(
        JSON.stringify({
          succeeded,
          order_id: number
        })
      );
    })
    .catch(error => {
      const {
        response: { status }
      } = error;
      res.status(status);
      res.send(error);
    });
});

app.put("/api/retain", (req, res) => {
  const {
    body: { payment_method_token }
  } = req;
  useApi(
    `https://core.spreedly.com/v1/payment_methods/${payment_method_token}/retain.json`,
    "put"
  ).then(response => {
    const {
      data: {
        transaction: { succeeded }
      }
    } = response;

    res.send(
      JSON.stringify({
        succeeded
      })
    );
  });
});

app.get("/api/flights", (reg, res) => {
  res.sendFile(__dirname + "/flight_seed.json");
});

app.get("/api/transactions", (reg, res) => {
  useApi("https://core.spreedly.com/v1/transactions.json?order=desc", "get")
    .then(response => {
      res.send(response.data.transactions);
    })
    .catch(error => error);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function useApi(url, method, data = undefined) {
  return axios(url, {
    method,
    withCredentials: true,
    auth: {
      username: process.env.APP_ENV_KEY,
      password: process.env.APP_ACCESS_SECRET
    },
    data
  });
}
