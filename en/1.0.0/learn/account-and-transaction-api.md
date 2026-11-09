# Account and Transaction API

info

Some content in this documentation is subject to the [MIT Open Licence](https://www.openbanking.org.uk/open-licence/). For further information, see [Copyright and Licence](/en/1.0.0/learn/copyright-and-licence/.md).

## Introduction[​](#introduction "Direct link to Introduction")

This page explains the flow of the [Account Information and Transaction API by OBIE](https://openbankinguk.github.io/read-write-api-site3/v3.1.10/profiles/account-and-transaction-api-profile.html). The Account Information Service Provider (AISP) can use the API endpoints described here to do the following:

* Register a resource to retrieve account information by creating an account access consent. This registers data that the customer (PSU) has consented to provide to the AISP such as data permissions, expiration, and historical period allowed for transactions/statements.
* Subsequently, retrieve account and transaction data.

## Basic flow[​](#basic-flow "Direct link to Basic flow")

See the below diagram describing the basic accounts information flow:

![uk accounts information flow](/en/1.0.0/assets/images/uk-accounts-information-flow-dd6b2b3ab569a4232e63a5d95f40a40a.png)

The PSU requests to access account information data using an AISP solution (A third-party provider). The AISP connects to the ASPSP that services the PSU's accounts and creates an `account-access-consent` resource. This informs the ASPSP that one of its PSUs is granting access to account and transaction information to an AISP. In this case, the AISP makes a `POST` request to ASPSP's `/account-access-consents` endpoint. The ASPSP responds with an identifier for the resource (the `ConsentId`). The `account-access-consent` resource will include the following fields which describe the data that the PSU has consented with the AISP:

* Permissions - a list of data clusters that have been consented for access
* Expiration Date - an optional expiration for when the AISP will no longer have access to the PSU's data
* Transaction Validity Period - the From/To date range which specifies a historical period for transactions and statements which may be accessed by the AISP

The AISP acts as a mediator for data to other parties, so it is valid for a PSU to have multiple `account-access-consents` for the same accounts, with different consent/authorisation parameters agreed. The AISP requests the PSU to authorise the consent. The ASPSP uses the redirection flow for this.

1. In a redirection flow, the AISP redirects the PSU to the ASPSP
2. The redirect includes `ConsentId` generated in the previous step
3. This allows the ASPSP to correlate the `account-access-consent` that was setup
4. The ASPSP authenticates the PSU
5. The ASPSP updates the state of the `account-access-consent` resource internally to indicate that the account access consent has been authorised
6. Once the consent has been authorised, the PSU is redirected back to the AISP

Once the PSU authorises the consent for the TPP to access account information, the AISP makes an API call to the ASPSP to retrieve account information. When the ASPSP provides account information, the TPP can expose the information via the AISP solution.

For more information, see [Account and Transaction API Flow](/en/1.0.0/try-out/account-and-transaction-flow/.md).

## Endpoints[​](#endpoints "Direct link to Endpoints")

To access account information and transaction data, you can use the following available API endpoints:

| Endpoint Name           | Supported Version                                                    | Resource                  | Endpoint URL                                                      | Mandatory/Optional |
| ----------------------- | -------------------------------------------------------------------- | ------------------------- | ----------------------------------------------------------------- | ------------------ |
| Account Access Consents | v3.1.5<br />v3.1.6<br />v3.1.8<br />v3.1.9<br />v3.1.10<br />v3.1.11 | `account-access-consents` | `POST /account-access-consents`                                   | Mandatory          |
|                         |                                                                      |                           | `GET /account-access-consents/{ConsentId}`                        | Mandatory          |
|                         |                                                                      |                           | `DELETE /account-access-consents/{ConsentId}`                     | Mandatory          |
| Accounts                | v3.1.5<br />v3.1.6<br />v3.1.8<br />v3.1.9<br />v3.1.10<br />v3.1.11 | `accounts`                | `GET /accounts`                                                   | Mandatory          |
|                         |                                                                      |                           | `GET /accounts/{AccountId}`                                       | Mandatory          |
| Balances                | v3.1.5<br />v3.1.6<br />v3.1.8<br />v3.1.9<br />v3.1.10<br />v3.1.11 | `balances`                | `GET /accounts/{AccountId}/balances`                              | Mandatory          |
|                         |                                                                      |                           | `GET /balances`                                                   | Optional           |
| Transactions            | v3.1.5<br />v3.1.6<br />v3.1.8<br />v3.1.9<br />v3.1.10<br />v3.1.11 | `transactions`            | `GET /accounts/{AccountId}/transactions`                          | Mandatory          |
|                         |                                                                      |                           | `GET /transactions`                                               | Optional           |
| Beneficiaries           | v3.1.5<br />v3.1.6<br />v3.1.8<br />v3.1.9<br />v3.1.10<br />v3.1.11 | `beneficiaries`           | `GET /accounts/{AccountId}/beneficiaries`                         | Conditional        |
|                         |                                                                      |                           | `GET /beneficiaries`                                              | Optional           |
| Direct Debits           | v3.1.5<br />v3.1.6<br />v3.1.8<br />v3.1.9<br />v3.1.10<br />v3.1.11 | `direct-debits`           | `GET /accounts/{AccountId}/direct-debits`                         | Conditional        |
|                         |                                                                      |                           | `GET /direct-debits`                                              | Optional           |
| Standing Orders         | v3.1.5<br />v3.1.6<br />v3.1.8<br />v3.1.9<br />v3.1.10<br />v3.1.11 | `standing-orders`         | `GET /accounts/{AccountId}/standing-orders`                       | Conditional        |
|                         |                                                                      |                           | `GET /standing-orders`                                            | Optional           |
| Products                | v3.1.5<br />v3.1.6<br />v3.1.8<br />v3.1.9<br />v3.1.10<br />v3.1.11 | `products`                | `GET /accounts/{AccountId}/product`                               | Conditional        |
|                         |                                                                      |                           | `GET /products`                                                   | Optional           |
| Offers                  | v3.1.5<br />v3.1.6<br />v3.1.8<br />v3.1.9<br />v3.1.10<br />v3.1.11 | `offers`                  | `GET /accounts/{AccountId}/offers`                                | Conditional        |
|                         |                                                                      |                           | `GET /offers`                                                     | Optional           |
| Party                   | v3.1.5<br />v3.1.6<br />v3.1.8<br />v3.1.9<br />v3.1.10<br />v3.1.11 | `party`                   | `GET /accounts/{AccountId}/parties
`                               | Conditional        |
|                         |                                                                      |                           | `GET /accounts/{AccountId}/party`                                 | Conditional        |
|                         |                                                                      |                           | `GET /party`                                                      | Conditional        |
| Parties                 | v3.1.5<br />v3.1.6<br />v3.1.8<br />v3.1.9<br />v3.1.10<br />v3.1.11 | `parties`                 | `GET /accounts/{AccountId}/parties`                               | Conditional        |
|                         |                                                                      |                           | `GET /accounts/{AccountId}/party`                                 | Conditional        |
|                         |                                                                      |                           | `GET /party`                                                      | Conditional        |
| Scheduled Payments      | v3.1.5<br />v3.1.6<br />v3.1.8<br />v3.1.9<br />v3.1.10<br />v3.1.11 | `scheduled-payments`      | `GET /accounts/{AccountId}/scheduled-payments
`                    | Conditional        |
|                         |                                                                      |                           | `GET /scheduled-payments`                                         | Optional           |
| Statements              | v3.1.5<br />v3.1.6<br />v3.1.8<br />v3.1.9<br />v3.1.10<br />v3.1.11 | `statements`              | `GET /accounts/{AccountId}/statements`                            | Conditional        |
|                         |                                                                      |                           | `GET /accounts/{AccountId}/statements/{StatementId}`              | Conditional        |
|                         |                                                                      |                           | `GET /accounts/{AccountId}/statements/{StatementId}/file`         | Optional           |
|                         |                                                                      |                           | `GET /accounts/{AccountId}/statements/{StatementId}/transactions` | Conditional        |
|                         |                                                                      |                           | `GET /statements`                                                 | Optional           |
