- server on `localhost:3000`
- frontend on `localhost:3001`

* [ ] List a few "Spreedly Airlines" flights with associated prices
* [ ]Let a user (no need for login functionality, just let anybody do this)
  - [ ] Purchase a flight with a test credit card against the Spreedly test gateway
  - [ ] Purchase a flight using `PMD` that sends the card info to a travel partner like Expedia (using the echo endpoint to mimic an Expedia API call - [ ] the request/response format is immaterial).
* [ ] If the credit card is expired or invalid in any way, display an error message back to the user
* [ ] Give the user the option to save their credit card for future payments
* [ ] List all processed transactions (can list all transactions across users, not user-specific)

## Spreedly Airlines should

- be in the smallest amount of PCI compliance scope as possible
- successfully process payments
- display appropriate error messages back to the user
- save credit cards for future use (from those users that approve)

You should:

- be able to show the app running on your machine
- have notes:
  - outlining where you had questions that weren't answered by our user-facing docs
  - identifying flat out omissions or falsehoods in our docs/onboarding process

## scratch

"token": "P5W5KjldjVN9w89Rm7SBedFiXhw",
"hostnames": "https://sa-echo.herokuapp.com",

---

express does it's thing, sending the contents of the form to backend
responds with a token
I, then, make a request with that token to `deliver`

## questions

- [ ] does spreedky API perform expiration validation, etc.?
- [ ]

auth and capture

GET /api/flights
POST /api/charge -- id token paymentMethod
POST /api/retain -- token
POST /api/deliver -- id token
GET /api/transactions

variable -retain_on_success
