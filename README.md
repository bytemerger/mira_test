## Description

A task to implement a Foreign Exchange Query Language (FXQL) Statement Parser using nestjs and typescript
## Project setup

```bash
$ docker build -t mira .
$ docker run --env-file /path/to/env/file mira 
```

## env
You can find an env example at .env.example

## Run tests

Tests are run in a docker build process in the development phase to maintain a good delivery culture

You can also run test outside of this scenario with the following commands

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resources and API DOCS


# mira-test



<!--- If we have only one group/collection, then no need for the "ungrouped" heading -->
1. [Parse FXQL](#1-parse-fxql)
   1. [Parse FXQL - error with string](#i-example-request-parse-fxql---error-with-string)
   1. [Parse FXQL - success 1 statement](#ii-example-request-parse-fxql---success-1-statement)
   1. [Parse FXQL - success 3 statements](#iii-example-request-parse-fxql---success-3-statements)
   1. [Parse FXQL - invalid Buy rate](#iv-example-request-parse-fxql---invalid-buy-rate)
1. [Check Healthz](#2-check-healthz)
   1. [health success response](#i-example-request-health-success-response)



## Endpoints


--------



### 1. Parse FXQL



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{base_url}}/fxql-statements
```



***Body:***

```js        
{
    "FXQL": "USD-GBP {\\n  BUY rt\\n  SELL 0.90\\n  CAP 10000\\n}"
}
```



***More example Requests/Responses:***


#### I. Example Request: Parse FXQL - error with string



***Body:***

```js        
{
    "FXQL": "USD-GBP {\\n  BUY rr\\n  SELL 0.90\\n  \\n CAP 10000\\n}\\n\\nEUR-JPY {\\n  BUY 145.20\\n  SELL 146.50\\n  CAP 50000\\n}\\n\\nNGN-USD {\\n  BUY 0.0022\\n  SELL 0.0023\\n  CAP 2000000\\n}"
}
```



#### I. Example Response: Parse FXQL - error with string
```js
{
    "code": "FXQL-400",
    "message": "invalid fxl statement with currency - USD-GBP at fxl string of index - 1 ... rate and cap are exceeding expectations"
}
```


***Status Code:*** 400

<br>



#### II. Example Request: Parse FXQL - success 1 statement



***Body:***

```js        
{
    "FXQL": "USD-GBP {\\n BUY 100\\n SELL 200\\n CAP 93800\\n}"
}
```



#### II. Example Response: Parse FXQL - success 1 statement
```js
{
    "message": "FXQL Statement Parsed Successfully.",
    "code": "FXQL-200",
    "data": [
        {
            "EntryId": 1,
            "SourceCurrency": "USD",
            "DestinationCurrency": "GBP",
            "BuyPrice": 100,
            "SellPrice": 200,
            "CapAmount": 93800
        }
    ]
}
```


***Status Code:*** 200

<br>



#### III. Example Request: Parse FXQL - success 3 statements



***Body:***

```js        
{
    "FXQL": "USD-GBP {\\n  BUY 0.85\\n  SELL 0.90\\n  CAP 10000\\n}\\n\\nEUR-JPY {\\n  BUY 145.20\\n  SELL 146.50\\n  CAP 50000\\n}\\n\\nNGN-USD {\\n  BUY 0.0022\\n  SELL 0.0023\\n  CAP 2000000\\n}"
}
```



#### III. Example Response: Parse FXQL - success 3 statements
```js
{
    "message": "FXQL Statement Parsed Successfully.",
    "code": "FXQL-200",
    "data": [
        {
            "EntryId": 2,
            "SourceCurrency": "USD",
            "DestinationCurrency": "GBP",
            "BuyPrice": 0.85,
            "SellPrice": 0.9,
            "CapAmount": 10000
        },
        {
            "EntryId": 3,
            "SourceCurrency": "EUR",
            "DestinationCurrency": "JPY",
            "BuyPrice": 145.2,
            "SellPrice": 146.5,
            "CapAmount": 50000
        },
        {
            "EntryId": 4,
            "SourceCurrency": "NGN",
            "DestinationCurrency": "USD",
            "BuyPrice": 0.0022,
            "SellPrice": 0.0023,
            "CapAmount": 2000000
        }
    ]
}
```


***Status Code:*** 201

<br>



#### IV. Example Request: Parse FXQL - invalid Buy rate



***Body:***

```js        
{
    "FXQL": "USD-GBP {\\n  BUY rt\\n  SELL 0.90\\n  CAP 10000\\n}"
}
```



#### IV. Example Response: Parse FXQL - invalid Buy rate
```js
{
    "code": "FXQL-400",
    "message": "Invalid Buy rate for USD-GBP"
}
```


***Status Code:*** 400

<br>



### 2. Check Healthz



***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{base_url}}/healthz
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|



***More example Requests/Responses:***

#### I. Example Response: health success response
```js
{
    "message": "Api is live",
    "code": "FXQL-200"
}
```


***Status Code:*** 200

<br>



---
[Back to top](#mira-test)
