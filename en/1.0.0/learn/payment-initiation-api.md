# Payment Initiation API

info

Some content in this documentation is subject to the [MIT Open Licence](https://www.openbanking.org.uk/open-licence/). For further information, see [Copyright and Licence](/en/1.0.0/learn/copyright-and-licence/.md).

## Introduction[​](#introduction "Direct link to Introduction")

This page explains the flow of the [Payment Initiation API by OBIE](https://openbankinguk.github.io/read-write-api-site3/v3.1.10/profiles/payment-initiation-api-profile.html). The API endpoints described here allow a PISP to:

* Register a payment-order consent.
* Optionally confirm available funds for a payment-order (domestic and international immediate payments only).
* Subsequently, submit the payment-order for processing.
* Optionally retrieve the status of a payment-order consent or payment-order resource.

## Basic flow[​](#basic-flow "Direct link to Basic flow")

The diagram below shows the basic payment flow (using the Payment APIs) for all payment-order types:

![uk payment flow](/en/1.0.0/assets/images/uk-payment-flow-d4d8e41a8c0ca5fb8b613cbe67ad7518.png)

PSU requests the PISP to process a transaction. The consent is between the PSU and the PISP. The PISP connects to the ASPSP that services the PSU's payment account and requests the ASPSP to initiate the transaction, a payment-order consent is created. The PISP requests the PSU to authorise the consent. The ASPSP may carry this out by using a redirection flow.

In a redirection flow, the PISP redirects the PSU to the ASPSP.

1. The redirect includes the `ConsentId` generated in the previous step.
2. This allows the ASPSP to correlate the payment order consent that was setup.
3. The ASPSP authenticates the PSU.
4. The PSU selects the debtor account at this stage (if it has not been previously specified).
5. The ASPSP updates the state of the payment order consent resource internally to indicate that the consent has been authorised.
6. Once the consent has been authorised, the PSU is redirected back to the PISP.

Then the PSU approves the consent. The PISP may optionally invoke the following APIs during the flow:

* Confirm available funds for a payment-order - Using an access token of the Client Credentials grant type.
* Retrieve the status of a payment-order consent or payment-order resource - Using an access token of the Authorization Code grant type.

note

The payment-order consent and payment-order resource is generalised for the different payment-order types. For example, for a domestic payment, the payment-order consent resource is `domestic-payment-consents`, and the payment-order resource is `domestic-payments`.

For more information, see [Payment Initiation API Flow](/en/1.0.0/try-out/payment-initiation-flow/.md).

## Endpoints[​](#endpoints "Direct link to Endpoints")

Once you deploy the Payment Initiation API, you can access payment information via the following API endpoints:

| Endpoint Name                    | Supported Version                                                    | Resource                                   | Endpoint URL                                                                   | Mandatory/Optional                       |
| -------------------------------- | -------------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------ | ---------------------------------------- |
| Domestic Payments                | v3.1.5<br />v3.1.6<br />v3.1.8<br />v3.1.9<br />v3.1.10<br />v3.1.11 | `domestic-payment-consents`                | `POST /domestic-payment-consents`                                              | Mandatory                                |
|                                  |                                                                      |                                            | `GET /domestic-payment-consents/{ConsentId}`                                   | Mandatory                                |
|                                  |                                                                      |                                            | `GET /domestic-payment-consents/{ConsentId}/funds-confirmation`                | Mandatory                                |
|                                  |                                                                      | `domestic-payments`                        | `POST /domestic-payments`                                                      | Mandatory                                |
|                                  |                                                                      |                                            | `GET /domestic-payments/{DomesticPaymentId}`                                   | Mandatory                                |
| Domestic Scheduled Payment       | v3.1.5<br />v3.1.6<br />v3.1.8<br />v3.1.9<br />v3.1.10<br />v3.1.11 | `domestic-scheduled-payment-consents`      | `POST /domestic-scheduled-payment-consents`                                    | Conditional                              |
|                                  |                                                                      |                                            | `GET /domestic-scheduled-payment-consents/{ConsentId}`                         | Mandatory (if resource POST implemented) |
|                                  |                                                                      | `domestic-scheduled-payments`              | `POST /domestic-scheduled-payments`                                            | Conditional                              |
|                                  |                                                                      |                                            | `GET /domestic-scheduled-payments/{DomesticScheduledPaymentId}`                | Mandatory (if resource POST implemented) |
| Domestic Standing Orders         | v3.1.5<br />v3.1.6<br />v3.1.8<br />v3.1.9<br />v3.1.10<br />v3.1.11 | `domestic-standing-order-consents`         | `POST /domestic-standing-order-consents`                                       | Conditional                              |
|                                  |                                                                      |                                            | `GET /domestic-standing-order-consents/{ConsentId}`                            | Mandatory (if resource POST implemented) |
|                                  |                                                                      | `domestic-standing-orders`                 | `POST /domestic-standing-orders`                                               | Conditional                              |
|                                  |                                                                      |                                            | `GET /domestic-standing-orders/{DomesticStandingOrderId}`                      | Mandatory (if resource POST implemented) |
| International Payments           | v3.1.5<br />v3.1.6<br />v3.1.8<br />v3.1.9<br />v3.1.10<br />v3.1.11 | `international-payment-consents`           | `POST /international-payment-consents`                                         | Conditional                              |
|                                  |                                                                      |                                            | `GET /international-payment-consents/{ConsentId}`                              | Mandatory (if resource POST implemented) |
|                                  |                                                                      |                                            | `GET /international-payment-consents/{ConsentId}/funds-confirmation`           | Mandatory (if resource POST implemented) |
|                                  |                                                                      | `international-payments`                   | `POST /international-payments`                                                 | Conditional                              |
|                                  |                                                                      |                                            | `GET /international-payments/{InternationalPaymentId}`                         | Mandatory (if resource POST implemented) |
| International Scheduled Payments | v3.1.5<br />v3.1.6<br />v3.1.8<br />v3.1.9<br />v3.1.10<br />v3.1.11 | `international-scheduled-payment-consents` | `POST /international-scheduled-payment-consents`                               | Conditional                              |
|                                  |                                                                      |                                            | `GET /international-scheduled-payment-consents/{ConsentId}`                    | Mandatory (if resource POST implemented) |
|                                  |                                                                      |                                            | `GET /international-scheduled-payment-consents/{ConsentId}/funds-confirmation` | Mandatory (if immediate debit supported) |
|                                  |                                                                      | `international-scheduled-payments`         | `POST /international-scheduled-payments`                                       | Conditional                              |
|                                  |                                                                      |                                            | `GET /international-scheduled-payments/{InternationalScheduledPaymentId}`      | Mandatory (if resource POST implemented) |
| International Standing Orders    | v3.1.5<br />v3.1.6<br />v3.1.8<br />v3.1.9<br />v3.1.10<br />v3.1.11 | `international-standing-order-consents`    | `POST /international-standing-order-consents`                                  | Conditional                              |
|                                  |                                                                      |                                            | `GET /international-standing-order-consents/{ConsentId}`                       | Mandatory (if resource POST implemented) |
|                                  |                                                                      | `international-standing-orders`            | `POST /international-standing-orders`                                          | Conditional                              |
|                                  |                                                                      |                                            | `GET /international-standing-orders/{InternationalStandingOrderPaymentId}`     | Mandatory (if resource POST implemented) |
| File Payments                    | v3.1.5<br />v3.1.6<br />v3.1.8<br />v3.1.9<br />v3.1.10<br />v3.1.11 | `file-payment-consents`                    | `POST /file-payment-consents`                                                  | Conditional                              |
|                                  |                                                                      |                                            | `GET /file-payment-consents/{ConsentId}`                                       | Conditional                              |
|                                  |                                                                      |                                            | `POST /file-payment-consents/{ConsentId}/file`                                 | Mandatory (if resource POST implemented) |
|                                  |                                                                      |                                            | `GET /file-payment-consents/{ConsentId}/file`                                  | Conditional                              |
|                                  |                                                                      | `file-payments`                            | `POST /file-payments`                                                          | Conditional                              |
|                                  |                                                                      |                                            | `GET /file-payments/{FilePaymentId}`                                           | Mandatory (if resource POST implemented) |
|                                  |                                                                      |                                            | `GET /file-payments/{FilePaymentId}/report-file`                               | Conditional                              |
