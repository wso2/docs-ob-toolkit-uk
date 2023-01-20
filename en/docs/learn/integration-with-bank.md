#Integration With Core Banking System

WSO2 Open Banking can be easily integrated into your current banking system.

By default, WSO2 Open Banking Toolkit contains a mock back end that acts as the bank's back-end server. In a production 
environment, you need to set up and configure the solution with your banking system. This documentation explains the 
integration points and APIs that your banking system needs to provide.

## Bank back end integration

### Account-Request-Information header

WSO2 Open Banking manages the initiation and authorisation of a consent. When a TPP application makes a 
request to retrieve any account information, the toolkit validates the consent against the request. Upon successful 
validation, consent-related information is directed to the core banking system in the form of a header. This header is 
known as **Account-Request-Information**.

The Account-Request-Information header is a signed JWT, which needs to be decoded by the core banking system.

??? tip "Click here to see the fields in the header..."
    | Field | Description |
    |-------|-------------|
    | clientId | The unique ID of the TPP application |
    | currentStatus | The current status of the consent |
    | createdTimestamp| The date and time when the consent was created |
    | recurringIndicator | Specifies if this is a recurring transaction |
    | authorizationResources | Contains details regarding the consent authorization |
    | updatedTimestamp | The last date and time the consent was updated | 
    | validityPeriod | The validity period of the consent in seconds |
    | consentAttributes| Additional attributes related to the consent |
    | consentId | The unique ID of the consent that is being authorized |
    | consentMappingResources | The details of the accounts that the consent is bound to
    | consentType | The type of the consent. For example, accounts, payments |
    | receipt | Details of the consent, such as expiration time, permissions |
    | consentFrequency | The maximum number of times per day that access can be granted without the involvement of a consumer |

The core banking system will perform all required validations and build a response. This response needs to adhere to the 
requirements in the Open Banking Standard.

## Accounts API

A Swagger definition for the back end is available in the following location:

```
<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/openbanking.org.uk/Accounts/3.1.6/account-info-swagger-backend-3.1.6.yaml
```

## Account Information Retrieval

In WSO2 Open Banking, integration of accounts flow with the core banking system is used during account information 
retrieval requests. 

- The URL of the API endpoints of the core banking system, which corresponds to the account's information retrieval 
requests, should be configured in the In sequences of the Accounts API. For more information, see [Configuring Sequence files](#configuring-sequence-files).

In the Open Banking Accounts flow, WSO2 Open Banking manages the consent initiation and authorisation. When the TPP 
makes account information retrieval requests, the WSO2 Open Banking toolkit validates the consent request, and upon 
successful validation, the consent-related information is directed to the core banking system in the form of a header.
This header is known as **Account-Request-Information**.

This header is a signed JWT, which needs to be decoded by the core banking system. A sample decoded JSON is given below:

```
{
  "clientId": "o99wHc2GH04zw5SyCJHywjNIogca",
  "currentStatus": "authorised",
  "createdTimestamp": 1663749378,
  "recurringIndicator": false,
  "authorizationResources": [
    {
      "updatedTime": 1663749397,
      "consentId": "aa5c012c-84fd-4d74-be97-503eb072c6e5",
      "authorizationId": "bb526331-d20d-461c-8c06-fca2789d9e8e",
      "authorizationType": "authorization",
      "userId": "admin@wso2.com@carbon.super",
      "authorizationStatus": "authorised"
    }
  ],
  "updatedTimestamp": 1663749397,
  "validityPeriod": 0,
  "consentAttributes": {},
  "consentId": "aa5c012c-84fd-4d74-be97-503eb072c6e5",
  "consentMappingResources": [
    {
      "mappingId": "5f665fc9-27fb-4ed1-bbc1-cf68ec26ee2c",
      "mappingStatus": "active",
      "accountId": "30080012343456",
      "authorizationId": "bb526331-d20d-461c-8c06-fca2789d9e8e",
      "permission": "n/a"
    }
  ],
  "additionalConsentInfo": {
    "AccountIds": [
      "30080012343456"
    ],
    "TransactionToDateTime": "2022-09-24T14:06:13.473+05:30",
    "Permissions": [
      "ReadAccountsBasic",
      "ReadAccountsDetail",
      "ReadBalances",
      "ReadBeneficiariesBasic",
      "ReadBeneficiariesDetail",
      "ReadDirectDebits",
      "ReadProducts",
      "ReadStandingOrdersBasic",
      "ReadStandingOrdersDetail",
      "ReadTransactionsBasic",
      "ReadTransactionsCredits",
      "ReadTransactionsDebits",
      "ReadTransactionsDetail",
      "ReadStatementsBasic",
      "ReadStatementsDetail",
      "ReadOffers",
      "ReadParty",
      "ReadPartyPSU",
      "ReadScheduledPaymentsBasic",
      "ReadScheduledPaymentsDetail",
      "ReadPAN"
    ],
    "ConsentId": "aa5c012c-84fd-4d74-be97-503eb072c6e5",
    "TransactionFromDateTime": "2022-09-21T14:06:13.473+05:30"
  },
  "consentType": "accounts",
  "receipt": {
    "Risk": {},
    "Data": {
      "TransactionToDateTime": "2022-09-24T14:06:13.473+05:30",
      "ExpirationDateTime": "2022-09-26T14:06:13.396+05:30",
      "Permissions": [
        "ReadAccountsBasic",
        "ReadAccountsDetail",
        "ReadBalances",
        "ReadBeneficiariesBasic",
        "ReadBeneficiariesDetail",
        "ReadDirectDebits",
        "ReadProducts",
        "ReadStandingOrdersBasic",
        "ReadStandingOrdersDetail",
        "ReadTransactionsBasic",
        "ReadTransactionsCredits",
        "ReadTransactionsDebits",
        "ReadTransactionsDetail",
        "ReadStatementsBasic",
        "ReadStatementsDetail",
        "ReadOffers",
        "ReadParty",
        "ReadPartyPSU",
        "ReadScheduledPaymentsBasic",
        "ReadScheduledPaymentsDetail",
        "ReadPAN"
      ],
      "TransactionFromDateTime": "2022-09-21T14:06:13.473+05:30"
    }
  },
  "consentFrequency": 0
}
```

In the core banking system, the required validations should be performed and then the response will be built according to the 
requirements of the Open Banking Accounts specification.

## Payments API

A Swagger definition for the back end is available in the following location:

```
<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/openbanking.org.uk/Payments/3.1.6/paymnet-info-swagger-backend-3.1.6.yaml
```

- The URL of the API endpoints of the core banking system, which corresponds to the payment submission requests, should be 
configured in the In sequences of the Payments API. For more information, see [Configuring Sequence files](#configuring-sequence-files).

### Payments Submission

In WSO2 Open Banking, integration of payments flow with the core banking system is used during payment submission requests.

#### Single Authorisation

In the Open Banking payments flow, the WSO2 Open Banking toolkit manages the consent initiation and authorisation. 
When the TPP makes a payment submission request, it is validated, and upon successful validation, the request is directed 
to the core banking system in the form of a header. This header is known as **Account-Request-Information**.

This header is a signed JWT, which needs to be decoded by the core banking system. A sample decoded JSON is given below:

```
{
  "clientId": "o99wHc2GH04zw5SyCJHywjNIogca",
  "currentStatus": "authorised",
  "createdTimestamp": 1663749005,
  "recurringIndicator": false,
  "authorizationResources": [
    {
      "updatedTime": 1663749029,
      "consentId": "a7705d75-382b-4c40-8bb5-6d95796f7b10",
      "authorizationId": "c4fa8a34-684f-41a5-8e7e-98b15bacaac2",
      "authorizationType": "authorization",
      "userId": "admin@wso2.com@carbon.super",
      "authorizationStatus": "authorised"
    }
  ],
  "updatedTimestamp": 1663749029,
  "validityPeriod": 0,
  "consentAttributes": {
    "IdempotencyKey": "253808",
    "PaymentType": "domestic-payment-consents"
  },
  "consentId": "a7705d75-382b-4c40-8bb5-6d95796f7b10",
  "consentMappingResources": [
    {
      "mappingId": "17b7d1b4-57cc-43c2-ba4d-65f692e1a777",
      "mappingStatus": "active",
      "accountId": "30080012343456",
      "authorizationId": "c4fa8a34-684f-41a5-8e7e-98b15bacaac2",
      "permission": "primary"
    }
  ],
  "additionalConsentInfo": {
    "AccountIds": "30080012343456",
    "AccountIdType": "Identification",
    "Amount": "30.80",
    "Currency": "GBP",
    "ConsentId": "a7705d75-382b-4c40-8bb5-6d95796f7b10"
  },
  "consentType": "payments",
  "receipt": {
    "Risk": {
      "DeliveryAddress": {
        "StreetName": "Acacia Avenue",
        "CountrySubDivision": "Wessex",
        "AddressLine": [
          "Flat 7",
          "Acacia Lodge"
        ],
        "TownName": "Sparsholt",
        "BuildingNumber": "27",
        "Country": "UK",
        "PostCode": "GU31 2ZZ"
      },
      "PaymentContextCode": "EcommerceGoods",
      "MerchantCategoryCode": "5967",
      "MerchantCustomerIdentification": "053598653254"
    },
    "Data": {
      "SCASupportData": {
        "RequestedSCAExemptionType": "BillPayment",
        "AppliedAuthenticationApproach": "CA",
        "ReferencePaymentOrderId": "string"
      },
      "Authorisation": {
        "CompletionDateTime": "2022-09-26T08:29:54.070Z",
        "AuthorisationType": "Any"
      },
      "ReadRefundAccount": "Yes",
      "Initiation": {
        "LocalInstrument": "UK.OBIE.BACS",
        "DebtorAccount": {
          "SecondaryIdentification": "30080012343456",
          "SchemeName": "UK.OBIE.SortCodeAccountNumber",
          "Identification": "30080012343456",
          "Name": "Andrea Smith"
        },
        "RemittanceInformation": {
          "Unstructured": "Internal ops code 5120101",
          "Reference": "FRESCO-101"
        },
        "EndToEndIdentification": "FRESCO.21302.GFX.20",
        "InstructionIdentification": "ACME412",
        "CreditorAccount": {
          "SecondaryIdentification": "0002",
          "SchemeName": "UK.OBIE.SortCodeAccountNumber",
          "Identification": "08080021325698",
          "Name": "ACME Inc"
        },
        "InstructedAmount": {
          "Amount": "30.80",
          "Currency": "GBP"
        },
        "CreditorPostalAddress": {
          "StreetName": "Acacia Avenue",
          "CountrySubDivision": "Wessex",
          "Department": "department1",
          "TownName": "Sparsholt",
          "BuildingNumber": "27",
          "Country": "UK",
          "SubDepartment": "sub dept",
          "PostCode": "GU31 2ZZ",
          "AddressType": "Correspondence"
        }
      }
    }
  },
  "consentFrequency": 0
}
```

The account ID selected by the Payment Service User (PSU), is sent in the Account-Request-Information header as `AccountIds` 
and the account ID type as `AccountIdType`.

#### Multiple- Authorisation

An account can have one or more owners. When there are multiple owners, each and every owner has to authorise the 
account (multiple-authorisation) while if it's a single owner it requires single-authorisation. Let's look at a multiple 
authorisation scenario in the Payments API.

When the TPP makes a multiple-authorised payment submission request, it is validated, and upon successful validation, 
the request is directed to the core banking system. 

The request header is a signed JWT, which needs to be decoded by the core banking system. A sample decoded JSON is given 
below:

```
{
  "clientId": "o99wHc2GH04zw5SyCJHywjNIogca",
  "currentStatus": "authorised",
  "createdTimestamp": 1663749751,
  "recurringIndicator": false,
  "authorizationResources": [
    {
      "updatedTime": 1663749774,
      "consentId": "62cce5b9-9c22-4c3d-8726-1a67896fd763",
      "authorizationId": "374944b6-df92-4782-8bd8-cfad7ed07eb5",
      "authorizationType": "multiAuthorization",
      "userId": "psu2@wso2.com@carbon.super",
      "authorizationStatus": "authorised"
    },
    {
      "updatedTime": 1663749774,
      "consentId": "62cce5b9-9c22-4c3d-8726-1a67896fd763",
      "authorizationId": "767099a3-77b2-4029-ae33-abfd04e0d75b",
      "authorizationType": "authorization",
      "userId": "admin@wso2.com@carbon.super",
      "authorizationStatus": "authorised"
    },
    {
      "updatedTime": 1663749774,
      "consentId": "62cce5b9-9c22-4c3d-8726-1a67896fd763",
      "authorizationId": "925b2cc4-9ce0-49c6-a8a0-6452effd82f4",
      "authorizationType": "multiAuthorization",
      "userId": "psu1@wso2.com@carbon.super",
      "authorizationStatus": "authorised"
    }
  ],
  "updatedTimestamp": 1663749774,
  "validityPeriod": 0,
  "consentAttributes": {
    "IdempotencyKey": "686513",
    "PaymentType": "domestic-payment-consents"
  },
  "consentId": "62cce5b9-9c22-4c3d-8726-1a67896fd763",
  "consentMappingResources": [
    {
      "mappingId": "26d72e02-ece9-4d39-b777-48d30cf15354",
      "mappingStatus": "active",
      "accountId": "30080098971337",
      "authorizationId": "374944b6-df92-4782-8bd8-cfad7ed07eb5",
      "permission": "secondary"
    },
    {
      "mappingId": "2ded6a5f-b983-43c6-a64d-5c31bec14f81",
      "mappingStatus": "active",
      "accountId": "30080098971337",
      "authorizationId": "767099a3-77b2-4029-ae33-abfd04e0d75b",
      "permission": "primary"
    },
    {
      "mappingId": "fa41aab5-c141-4fd3-9f9b-795c7abdc895",
      "mappingStatus": "active",
      "accountId": "30080098971337",
      "authorizationId": "925b2cc4-9ce0-49c6-a8a0-6452effd82f4",
      "permission": "secondary"
    }
  ],
  "additionalConsentInfo": {
    "AccountIds": "30080098971337",
    "AccountIdType": "Identification",
    "Amount": "30.80",
    "Currency": "GBP",
    "ConsentId": "62cce5b9-9c22-4c3d-8726-1a67896fd763"
  },
  "consentType": "payments",
  "receipt": {
    "Risk": {
      "DeliveryAddress": {
        "StreetName": "Acacia Avenue",
        "CountrySubDivision": "Wessex",
        "AddressLine": [
          "Flat 7",
          "Acacia Lodge"
        ],
        "TownName": "Sparsholt",
        "BuildingNumber": "27",
        "Country": "UK",
        "PostCode": "GU31 2ZZ"
      },
      "PaymentContextCode": "EcommerceGoods",
      "MerchantCategoryCode": "5967",
      "MerchantCustomerIdentification": "053598653254"
    },
    "Data": {
      "SCASupportData": {
        "RequestedSCAExemptionType": "BillPayment",
        "AppliedAuthenticationApproach": "CA",
        "ReferencePaymentOrderId": "string"
      },
      "Authorisation": {
        "CompletionDateTime": "2022-09-26T08:42:25.296Z",
        "AuthorisationType": "Any"
      },
      "ReadRefundAccount": "Yes",
      "Initiation": {
        "LocalInstrument": "UK.OBIE.BACS",
        "DebtorAccount": {
          "SecondaryIdentification": "30080012343456",
          "SchemeName": "UK.OBIE.SortCodeAccountNumber",
          "Identification": "30080098971337",
          "Name": "Andrea Smith"
        },
        "RemittanceInformation": {
          "Unstructured": "Internal ops code 5120101",
          "Reference": "FRESCO-101"
        },
        "EndToEndIdentification": "FRESCO.21302.GFX.20",
        "InstructionIdentification": "ACME412",
        "CreditorAccount": {
          "SecondaryIdentification": "0002",
          "SchemeName": "UK.OBIE.SortCodeAccountNumber",
          "Identification": "08080021325698",
          "Name": "ACME Inc"
        },
        "InstructedAmount": {
          "Amount": "30.80",
          "Currency": "GBP"
        },
        "CreditorPostalAddress": {
          "StreetName": "Acacia Avenue",
          "CountrySubDivision": "Wessex",
          "Department": "department1",
          "TownName": "Sparsholt",
          "BuildingNumber": "27",
          "Country": "UK",
          "SubDepartment": "sub dept",
          "PostCode": "GU31 2ZZ",
          "AddressType": "Correspondence"
        }
      }
    }
  },
  "consentFrequency": 0
}
```

### Funds Confirmation

In WSO2 Open Banking, integration of payments flow with the core banking system is used during funds confirmation 
requests.

In the Open Banking payments flow, the WSO2 Open Banking toolkit manages the consent initiation and authorisation. 
When the TPP makes a funds confirmation request for domestic payments, international payments, and international-scheduled 
payments; it is validated. Upon successful validation, the request is directed to the core banking system. The 
funds-confirmation-related information is directed to the core banking system in the form of a 
header known as **Account-Request-Information**.

This header is a signed JWT, which needs to be decoded by the core banking system. A sample decoded JSON is given below:

```
{
  "clientId": "o99wHc2GH04zw5SyCJHywjNIogca",
  "currentStatus": "authorised",
  "createdTimestamp": 1663749005,
  "recurringIndicator": false,
  "authorizationResources": [
    {
      "updatedTime": 1663749029,
      "consentId": "a7705d75-382b-4c40-8bb5-6d95796f7b10",
      "authorizationId": "c4fa8a34-684f-41a5-8e7e-98b15bacaac2",
      "authorizationType": "authorization",
      "userId": "admin@wso2.com@carbon.super",
      "authorizationStatus": "authorised"
    }
  ],
  "updatedTimestamp": 1663749029,
  "validityPeriod": 0,
  "consentAttributes": {
    "IdempotencyKey": "253808",
    "PaymentType": "domestic-payment-consents"
  },
  "consentId": "a7705d75-382b-4c40-8bb5-6d95796f7b10",
  "consentMappingResources": [
    {
      "mappingId": "17b7d1b4-57cc-43c2-ba4d-65f692e1a777",
      "mappingStatus": "active",
      "accountId": "30080012343456",
      "authorizationId": "c4fa8a34-684f-41a5-8e7e-98b15bacaac2",
      "permission": "primary"
    }
  ],
  "additionalConsentInfo": {
    "AccountIds": "30080012343456",
    "AccountIdType": "Identification",
    "Amount": "30.80",
    "Currency": "GBP",
    "ConsentId": "a7705d75-382b-4c40-8bb5-6d95796f7b10"
  },
  "consentType": "payments",
  "receipt": {
    "Risk": {
      "DeliveryAddress": {
        "StreetName": "Acacia Avenue",
        "CountrySubDivision": "Wessex",
        "AddressLine": [
          "Flat 7",
          "Acacia Lodge"
        ],
        "TownName": "Sparsholt",
        "BuildingNumber": "27",
        "Country": "UK",
        "PostCode": "GU31 2ZZ"
      },
      "PaymentContextCode": "EcommerceGoods",
      "MerchantCategoryCode": "5967",
      "MerchantCustomerIdentification": "053598653254"
    },
    "Data": {
      "SCASupportData": {
        "RequestedSCAExemptionType": "BillPayment",
        "AppliedAuthenticationApproach": "CA",
        "ReferencePaymentOrderId": "string"
      },
      "Authorisation": {
        "CompletionDateTime": "2022-09-26T08:29:54.070Z",
        "AuthorisationType": "Any"
      },
      "ReadRefundAccount": "Yes",
      "Initiation": {
        "LocalInstrument": "UK.OBIE.BACS",
        "DebtorAccount": {
          "SecondaryIdentification": "30080012343456",
          "SchemeName": "UK.OBIE.SortCodeAccountNumber",
          "Identification": "30080012343456",
          "Name": "Andrea Smith"
        },
        "RemittanceInformation": {
          "Unstructured": "Internal ops code 5120101",
          "Reference": "FRESCO-101"
        },
        "EndToEndIdentification": "FRESCO.21302.GFX.20",
        "InstructionIdentification": "ACME412",
        "CreditorAccount": {
          "SecondaryIdentification": "0002",
          "SchemeName": "UK.OBIE.SortCodeAccountNumber",
          "Identification": "08080021325698",
          "Name": "ACME Inc"
        },
        "InstructedAmount": {
          "Amount": "30.80",
          "Currency": "GBP"
        },
        "CreditorPostalAddress": {
          "StreetName": "Acacia Avenue",
          "CountrySubDivision": "Wessex",
          "Department": "department1",
          "TownName": "Sparsholt",
          "BuildingNumber": "27",
          "Country": "UK",
          "SubDepartment": "sub dept",
          "PostCode": "GU31 2ZZ",
          "AddressType": "Correspondence"
        }
      }
    }
  },
  "consentFrequency": 0
}
```

###Idempotency key

The Idempotency key is used as an identifier to verify a replication of an action. The use cases of the idempotency key are:

- Payment initiation request
- Payment submission request

In the core banking system, the required validations should be performed and then the response will be built according to 
the Open Banking Payments specification.

## Confirmation of Funds API

A Swagger definition for the back end is available in the following location:

```
<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/openbanking.org.uk/FundsConfirmation/3.1.6/funds-confirmation-swagger-3.1.6.yaml
```

In WSO2 Open Banking, integration of the Confirmation of Funds (CoF) consent flow with the core banking system is used during 
the confirmation of funds request.

- The URL of the API endpoints of the core banking system, which corresponds to the funds confirmation requests, should 
be configured in the In sequences of the Funds Confirmation API. For more information, see [Configuring Sequence files](#configuring-sequence-files).

In the Open Banking funds confirmation consent flow, the WSO2 Open Banking toolkit manages the funds confirmation 
consent requests and authorisation. When the TPP makes a funds confirmation request (`POST /funds-confirmations`), it is 
validated against consent details and directed to the core banking system in the form of a header. This header is known as **Account-Request-Information**.

This header is a signed JWT, which needs to be decoded by the core banking system. A sample decoded JSON is given below:

```
{
  "clientId": "o99wHc2GH04zw5SyCJHywjNIogca",
  "currentStatus": "authorised",
  "createdTimestamp": 1663749298,
  "recurringIndicator": false,
  "authorizationResources": [
    {
      "updatedTime": 1663749317,
      "consentId": "d4c772dd-812c-46fd-9dc4-e4d5a42d6dad",
      "authorizationId": "d2f55131-1fe0-452e-a1f4-6eaaf8b3aa43",
      "authorizationType": "authorization",
      "userId": "admin@wso2.com@carbon.super",
      "authorizationStatus": "authorised"
    }
  ],
  "updatedTimestamp": 1663749317,
  "validityPeriod": 0,
  "consentAttributes": {},
  "consentId": "d4c772dd-812c-46fd-9dc4-e4d5a42d6dad",
  "consentMappingResources": [
    {
      "mappingId": "20725963-8dbf-4ce8-889c-b53cf8d4d1c1",
      "mappingStatus": "active",
      "accountId": "1234",
      "authorizationId": "d2f55131-1fe0-452e-a1f4-6eaaf8b3aa43",
      "permission": "n/a"
    }
  ],
  "additionalConsentInfo": {
    "AccountIds": "1234",
    "ConsentId": "d4c772dd-812c-46fd-9dc4-e4d5a42d6dad"
  },
  "consentType": "fundsconfirmations",
  "receipt": {
    "Data": {
      "DebtorAccount": {
        "SecondaryIdentification": "Account1",
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "1234",
        "Name": "Account1"
      },
      "ExpirationDateTime": "2022-09-26T14:04:53.549+05:30"
    }
  },
  "consentFrequency": 0
}
```

In the core banking system, the required validations should be performed and then the response will be built according to the 
requirements of the Open Banking Confirmation of Funds specification.

## Configuring sequence files

WSO2 Open Banking API Manager contains a mock bank back end, which is configured in the In sequences by default.
Therefore, in order to integrate the toolkit with the banking system the In sequence files for Accounts, Payment, and 
CoF must be updated individually. 

- They are available in the `<APIM_HOME>/repository/resources/finance/apis/openbanking.org.uk/<API_NAME>` directory. 
- Replace the `<WSO2_OB_KM_HOST>` placeholder with the hostname of the Identity Server.
- Replace the `<WSO2_OB_APIM_HOST>` placeholder with the hostname of the API Manager.

Ideally, the two occurrences of `https://<WSO2_OB_APIM_HOST>:9443/open-banking/services/accounts/accountservice` should 
be replaced with the core banking system's API endpoints for production and sandbox environments, respectively.

## Accounts Retrieval Endpoints

In some banks, some PSUs may have a certain number of accounts, but not all accounts have the ability to be shared 
externally or to make a payment online. Therefore, in a bank the shareable account list and the payable account list can 
either be the same or different.

In the default WSO2 Open Banking UK Toolkit, at least two APIs are expected to return shareable and payable accounts. 
When passing the `user_id` a JSON response must be returned. Then it automatically loads the accounts list in the consent page. 

### Payable Accounts API

The back-end endpoint for the Payable Accounts API is used to retrieve the payable accounts of the user during the 
authentication flow. If a TPP has not provided any debtor account in the payment initiation request, the PSU is able to 
select one of the payable accounts when providing the consent to the payment. If the TPP has sent the debtor account in 
the initiation request, this API is used to validate the provided account against actual payable accounts. When invoking this
API, the `consentId` and `userId` (PSU ID) must be sent in the URL as query parameters.

The back end endpoints for payable and sharable accounts retrieval can be configured in the ` <APIM_HOME>/repository/conf/deployment.toml` file as follows.
By default, the mock back end that is deployed in the API Manager is configured in this file.

``` xml
[open_banking_uk.consent]
payable_account_retrieval_endpoint = "http://<APIM_HOST>:9763/api/openbanking/uk/backend/services/bankaccounts/bankaccountservice/payable-accounts”
```

Required parameters can be passed as query parameters to those endpoints. Given below is an example of configuring the 
endpoint to retrieve payable accounts:

``` xml
[open_banking_uk.consent]
sharable_account_retrieval_endpoint = "http://<APIM_HOST>:9763/api/openbanking/uk/backend/services/bankaccounts/bankaccountservice/payable-accounts/{userId}"
```

The response from the API should be formatted as follows:

``` json
{
   "data":[
      {
         "account_id":"30080012343456",
         "display_name":"account_1",
         "accountId":"30080012343456",
         "accountName":"account_1",
         "authorizationMethod":"single",
         "nickName":"not-working",
         "customerAccountType":"Individual",
         "type":"TRANS_AND_SAVINGS_ACCOUNTS"
      },
      {
         "account_id":"30080098971337",
         "display_name":"multi_auth_account",
         "accountId":"30080098971337",
         "accountName":"multi_auth_account",
         "authorizationMethod":"multiple",
         "nickName":"not-working",
         "customerAccountType":"Individual",
         "type":"TRANS_AND_SAVINGS_ACCOUNTS",
         "authorizationUsers":[
            {
               "customer_id":"123",
               "user_id":"psu1@wso2.com@carbon.super"
            },
            {
               "customer_id":"456",
               "user_id":"psu2@wso2.com@carbon.super"
            }
         ]
      }
   ]
}
```

### Shareable Accounts API

The Shareable Accounts API is used in the AISP flow to retrieve the account IDs from the bank during authorization.
The account IDs are then displayed on the consent page.

- In a bank offered consent scenario, the Shareable Accounts API retrieves all available accounts for the user and
  displays them on the consent page for the user to select accounts.
- In a scenario where account IDs are already provided in the consent, the Shareable Accounts API checks whether the
  accounts in the consent are available in the bank backend.

When invoking this API, the `consentId` and `userId` (PSU ID) parameters are required to be sent in the URL as query 
parameters.

The back-end endpoint for shareable accounts retrieval can be configured in 
the ` <APIM_HOME>/repository/conf/deployment.toml` file as follows.
By default, this is connected to the mock back end in the API Manager server.

``` xml
[open_banking_uk.consent]
sharable_account_retrieval_endpoint = "http://<APIM_HOST>:9763/api/openbanking/uk/backend/services/bankaccounts/bankaccountservice/sharable-accounts"
```

Required parameters can be passed as query parameters to those endpoints. Given below is an example of configuring the 
endpoint to retrieve sharable accounts: 

``` xml
[open_banking_uk.consent]
sharable_account_retrieval_endpoint = "http://<APIM_HOST>:9763/api/openbanking/uk/backend/services/bankaccounts/bankaccountservice/sharable-accounts/{userId}"
```

The response from the API should be formatted as follows:

``` json
{
   "data":[
      {
         "account_id":"30080012343456",
         "display_name":"account_1",
         "accountId":"30080012343456",
         "accountName":"account_1",
         "authorizationMethod":"single",
         "nickName":"not-working",
         "customerAccountType":"Individual",
         "type":"TRANS_AND_SAVINGS_ACCOUNTS"
      },
      {
         "account_id":"30080098971337",
         "display_name":"multi_auth_account",
         "accountId":"30080098971337",
         "accountName":"multi_auth_account",
         "authorizationMethod":"multiple",
         "nickName":"not-working",
         "customerAccountType":"Individual",
         "type":"TRANS_AND_SAVINGS_ACCOUNTS",
         "authorizationUsers":[
            {
               "customer_id":"123",
               "user_id":"psu1@wso2.com@carbon.super"
            },
            {
               "customer_id":"456",
               "user_id":"psu2@wso2.com@carbon.super"
            }
         ]
      }
   ]
}
```