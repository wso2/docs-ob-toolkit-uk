This document provides step by step instructions to deploy, subscribe, and invoke the Variable Recurring Payments (VRP) API.

## Creating a Shared Scope

Follow the steps and create a new shared scope for the Variable Recurring Payments API.

1. Sign in to API Publisher Portal at `https://<APIM_HOST>:9443/publisher`. ![create_shared_scope](../assets/img/try-out/payment-initiation-flow/create-shared-scope.png)

2. Navigate to **Scopes** from the top menu and click the **Scopes** button.

3. In the Create New Scope wizard, create a new scope named `payments`.  ![payments_shared_scope](../assets/img/try-out/payment-initiation-flow/create-shared-scope-wizard.png)

4. Click the **Save** button.

5. Now deploy the API. The scope will be automatically added to the resources. For more information, see
   [WSO2 API Manager - Shared Scopes](https://apim.docs.wso2.com/en/latest/design/api-security/oauth2/oauth2-scopes/fine-grained-access-control-with-oauth-scopes/#creating-a-shared-scope).

## Deploying Variable Recurring Payments API

1. Sign in to the API Publisher Portal at `https://<APIM_HOST>:9443/publisher` with creator/publisher privileges.

    ![sign_in](../assets/img/get-started/quick-start-guide/sign-in.png)

2. In the homepage, go to **REST API** and select **Import Open API**. ![let's_get_started](../assets/img/get-started/quick-start-guide/lets-get-started.png)

3. Select **OpenAPI File/Archive**. ![create-an-api](../assets/img/get-started/quick-start-guide/create-an-api.png)

4. Click **Browse File to Upload** and select the `<APIM_HOME>/<OB_APIM_ACCELERATOR_HOME>/repository/resources/apis/VRP/vrp-openapi.yaml` file.

5. Click **Next**.

6. Set the context value as follows:

    ```
    /open-banking/{version}/vrp
    ```
   
7. Set the version value to `v3.1`. ![create-an-api](../assets/img/try-out/payment-initiation-flow/create-api.png)

8. Leave the **Endpoint** field empty as it is and click **Create**.

9. After the API is successfully created, go to **Portal Configurations** using the left menu panel. ![portal-configurations](../assets/img/get-started/quick-start-guide/portal-configurations.png)

10. Select **Subscriptions** from the left menu pane and set the business plan to **Unlimited: Allows unlimited requests**. ![business-plan](../assets/img/get-started/quick-start-guide/business-plan.png)

11. Click **Save**.

12. Toggle the **Schema Validation** button to enable Schema Validation for all APIs except for the Dynamic Client Registration API. ![schema-validation](../assets/img/get-started/quick-start-guide/schema-validation.png)

13. Click the **Edit** button under **Request > Message Mediation**. ![edit_message_mediation](../assets/img/get-started/quick-start-guide/edit-message-mediation.png)

14. Now, select the **Custom Policy** option.

15. Upload the `<APIM_HOME>/<OB_APIM_ACCELERATOR_HOME>/repository/resources/apis/VRP/vrp-dynamic-endpoint-insequence-3.1.9.xml` insequence file. 

    ![select_endpoints](../assets/img/try-out/payment-initiation-flow/adding-insequence.png)

16. Click **Select**.

17. Scroll down and click **SAVE**.

18. Use the left menu panel and go to **API Configurations > Endpoints**.

    ![select_endpoints](../assets/img/get-started/quick-start-guide/select-endpoints.png)

19. Add a **Dynamic Endpoint**. ![add_dynamic_endpoint](../assets/img/get-started/quick-start-guide/add_dynamic_endpoint.png)

20. Go to **Deployments** using the left menu pane.

    ![select_deployments](../assets/img/get-started/quick-start-guide/select-deployments.png)

21. Select the API Gateway type, in this scenario, it is **Default**. ![api_gateway](../assets/img/get-started/quick-start-guide/dcr-api-gateway.png)

22. Click **Deploy**.

23. Go to **Overview** using the left menu pane.

    ![select_overview](../assets/img/get-started/quick-start-guide/select-overview.png)

24. Click **Publish**. ![publish_api](../assets/img/get-started/quick-start-guide/publish-api.png)

## Subscribing to Variable Recurring Payments

1. The deployed API is now available in the Developer Portal at `https://<APIM_HOST>:9443/devportal`.

2. Select the VRP V3.1 API.

3. Locate **Subscriptions** from the left menu pane.

    ![select_subscriptions](../assets/img/get-started/quick-start-guide/select-subscriptions.png)

4. From the **Application** dropdown, select the application that you want to be subscribed to the VRP API V3.1. ![select_subscriptions](../assets/img/try-out/payment-initiation-flow/select-subscriptions.png)

5. Click **Subscribe**.

## Invoking Variable Recurring Payments API

### Generating application access token

Once you register the application, generate an application access token.

1. Generate the client assertion by signing the following JSON payload using supported algorithms.

    !!! note
        If you have configured the [OB certificates](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/252018873/OB+Root+and+Issuing+Certificates+for+Sandbox),

         - Use the [transport private key](../../assets/attachments/transport-certs/obtransport.key) and
          [transport public certificate](../../assets/attachments/transport-certs/obtransport.pem) for Transport layer security testing purposes.

        - Use the [signing certificate](../../assets/attachments/signing-certs/obsigning.pem) and
          [signing private keys](../../assets/attachments/signing-certs/obsigning.key) for signing purposes.

    ``` tab='Format'
    
    {
    "alg": "<The algorithm used for signing.>",
    "kid": "<The thumbprint of the certificate.>",
    "typ": "JWT"
    }
     
    {
    "iss": "<This is the issuer of the token. For example, client ID of your application>",
    "sub": "<This is the subject identifier of the issuer. For example, client ID of your application>",
    "exp": <This is the epoch time of the token expiration date/time>,
    "iat": <This is the epoch time of the token issuance date/time>,
    "jti": "<This is an incremental unique value>",
    "aud": "<This is the audience that the ID token is intended for. For example, https://<IS_HOST>:9446/oauth2/token>"
    }
     
    <signature: For DCR, the client assertion is signed by the private key of the signing certificate. For other scenarios, use the private signature of the application certificate.>
    ```
    
    ``` tab='Sample'
    eyJraWQiOiIyTUk5WFNLaTZkZHhDYldnMnJoRE50VWx4SmMiLCJhbGciOiJQUzI1NiJ9.eyJzdWIiOiJZRGNHNGY0OUcxM2tXZlZzbnFkaHo4Z2JhMndhIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6OTQ0Ni9vYXV0aDIvdG9rZW4iLCJpc3MiOiJZRGNHNGY0OUcxM2tXZlZzbnFkaHo4Z2JhMndhIiwiZXhwIjoxNjI4Nzc0ODU1LCJpYXQiOjE2Mjg3NDQ4NTUsImp0aSI6IjE2Mjg3NDQ4NTUxOTQifQ.PkKRSDtkCyXabzLgGwAoy5C3jSORVU8X8sGDVrKpetPnjbCNx2wPlH-PzWUU1n05gdC7lDmoU21nsKLF_nE3iC-9hKEy4YsvJ7PFjNBPMOMUYDhRh9PCkPnec6f042zonb_ZifBq8r1aScUDoZ1L0hq7yjfZubwReFCWbESQ8PauuBuHRl7__kWvglthfgruQ7TTiIWiM60LWYct5TQWSF1IDcYGy03l-9OV5l260JBHPT4heLXzUQTarsh0PoWpv09xYLu8uGCexEt-HtRH8qwJGiFi5PiCA09_KyWVqbrcdjBloCmD5Kiqa1X0AnEbf9kKs0fqvcl7NN5-yVQUjg
    ```

3. Run the following cURL command in a command prompt to generate the access token. Update the placeholders with relevant values.
    ``` curl
    curl -X POST \
    https://<IS_HOST>:9446/oauth2/token \
    --cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH> \
    -d 'grant_type=client_credentials&scope=payments%20openid&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&client_assertion=<CLIENT_ASSERTION_JWT>&redirect_uri=<REDIRECT_URI>&client_id=<CLIENT_ID>'
    ```

4. Upon successful token generation, you can obtain a token as follows:
    ``` json
    {
       "access_token":"eyJ4NXQiOiJOVGRtWmpNNFpEazNOalkwWXpjNU1tWm1PRGd3TVRFM01XWXdOREU1TVdSbFpEZzROemM0WkEiLCJraWQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZ19SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhZG1pbkB3c28yLmNvbUBjYXJib24uc3VwZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6IllEY0c0ZjQ5RzEza1dmVnNucWRoejhnYmEyd2EiLCJuYmYiOjE2Mjg3NDQ4NTYsImF6cCI6IllEY0c0ZjQ5RzEza1dmVnNucWRoejhnYmEyd2EiLCJzY29wZSI6ImFjY291bnRzIiwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQ2XC9vYXV0aDJcL3Rva2VuIiwiY25mIjp7Ing1dCNTMjU2IjoidllvVVlSU1E3Q2dvWXhOTVdXT3pDOHVOZlFyaXM0cFhRWDBabWl0Unh6cyJ9LCJleHAiOjE2Mjg3NDg0NTYsImlhdCI6MTYyODc0NDg1NiwianRpIjoiNzBjZDIzYzItMzYxZS00YTEwLWI4YTQtNzg2MTljZmQ2MWJmIn0.WT9d2ov9kfSe75Q6ia_VNvJ12lNkrkMZNWdHu_Ata_nEpM8AWj4Mtc0e8Yb0oZFif_ypNgBtE2ck29nQLFgQ1IicL_OMIFUuwykro2oOCcFAbz7o_rhGsh39aW-ORlxm11_csmNeaWZNfC7lPp-9hBmNt9Sons_pCm2beTMFreZQyywPrJoQ9vwt1QCmkAlTP33YnPrf0u0RQePQvUq81RiJiokhZvwVufHARZv8KLtS8VLrpfbEoSglON_XkumydVjvRWs17I3Ot9zUj6kndHBsqMPZdq_aNQHntftdSI7TVNj5f66Q_4Uafz_hMXADS46pw87rTgzENHHf-5SRhw",
       "scope":"payments",
       "token_type":"Bearer",
       "expires_in":3600
    }
    ```

### Initiating a variable-recurring-payment consent

In this step, the PISP generates a request to get the consent of the PSU to access the payment account and create a new
payment-order. This informs the ASPSP that one of its PSUs intends to make a recurring payment-order.

1. Create a payment consent using the following request format:

    ```
    curl --location --request POST 'https://<APIM_HOST>:8243/open-banking/v3.1/vrp/domestic-vrp-consents' \
    --header 'Content-Type: application/json' \
    --header 'x-jws-signature: eyJhbGciOiJQUzI1NiIsImtpZCI6IkdxaEtWVEFObkxNWXBHR2ZBdEoxTmhka2dqdyIsImNyaXQiOlsiaHR0cDovL29wZW5iYW5raW5nLm9yZy51ay9pYXQiLCJodHRwOi8vb3BlbmJhbmtpbmcub3JnLnVrL3RhbiIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvaXNzIl0sImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvaWF0IjoxNjQ5NjIyNzQ1LCJodHRwOi8vb3BlbmJhbmtpbmcub3JnLnVrL3RhbiI6Im9wZW5iYW5raW5nLm9yZy51ayIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvaXNzIjoiQ049dTNaV2xmOVl0NDJkeVpnSXZ6a3ZxYiwgT1U9MDAxNTgwMDAwMUhRUXJaQUFYLCBPPU9wZW5CYW5raW5nLCBDPUdCIn0..o0LEsQFSdTMU_OezHtNfYA25bxnkGwDmmaraVDhIcoI8j7asmIwfPx0dp1pITdne3FUvjqsPs741FV87t_DJznK_3GxrNqnr-PDgKGQWKgcptHz8iFOUmYsO-DyNdwhjBOJoLUuwMK463_sVGeMkFMPSTEVmXApe9wBNbKOMHmKLEyEzB1ta9f8YaKm4QtnvbbyNq3jLYeTkTkhlSgJrjTaIST3FjRIfQQk49dvppY8GgazBaHnzgzo3wSGEAgj2m6lb70IDaxcj_xFsFQ0APTdKCAFXdAfnpDEEbtTz_q9Ypljs3qoRXt35_6nQkvpqJkLdOrY5JEpRFWt4nZok-Q' \
    --header 'x-idempotency-key: 32' \
    --header 'charset: UTF-8' \
    --header 'x-fapi-financial-id: open-bank' \
    --cert <PUBLIC_KEY_FILE_PATH> --key <PRIVATE_KEY_FILE_PATH> \
    --header 'Authorization: Bearer eyJ4NXQiOiJNR0l4TVRrMlpXTTJaVEZqTmpOall6WXdOV0ZsWm1OalpHWTRabVk0T1RVd1l6ZGhNRFF4TnciLCJraWQiOiJaREJoT1RjMlpqZzNZV0poWVdVelpUWXlNbVJrWm1JM09EbGpOalV5TXpBd01UYzFObUppTmpnNE56SmxOMlJsT0RFMVpHUTJNVEJqTmpZek9ETmtNQV9SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhZG1pbkB3c28yLmNvbUBjYXJib24uc3VwZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6IjZDRGk3N0M1WlFqYndvMmR4Wk56QldVakhUVWEiLCJuYmYiOjE2NTQ4MzgxODMsImF6cCI6IjZDRGk3N0M1WlFqYndvMmR4Wk56QldVakhUVWEiLCJzY29wZSI6InBheW1lbnRzIiwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQ2XC9vYXV0aDJcL3Rva2VuIiwiY25mIjp7Ing1dCNTMjU2IjoiMmh5ZjBBdGtkNkZqNHJ6bi12c0Q3R09uOGlLZ2NiYkhKVUpYTGxtcjFJcyJ9LCJleHAiOjE2NTQ4NDE3ODMsImlhdCI6MTY1NDgzODE4MywianRpIjoiMDI0YjE3YTUtNjFmZC00N2ZiLThlZGItM2U0OTlkMTlhMmVhIn0.dUzGuBfGqWEbZKO2LZUGXmfFGwBCXNP8PLhg8Z9r27baTSz5tK5P2zxz5OJcA1QD4iahef1vMPE4MoBbFtHiqqz_c8JSKK0iVTXTN--lIbh2NZSnDTYesUQV8yep6PU7_lVMMHa35kwMH_G7Cnjr3EzuJccyxpzxU0Lu_Dwm74ZzQ1doYFNtmM4R4EXYaKcaJkREJuwYt2AyAXuaB4GOpIUX-noJ-IfAmccP7dmGeJl8zwCKR-zUNqR9Ap9tPOnBexlhkul6hbMdHK8ACCLf9GdAASjpg_U3RpvH5vMbNI6jMuJJYD7ts8TEcUKcTTJsPeh4fK3wCpOsMPybGHLqjA' \
    --data-raw '{
       "Data": {
           "ReadRefundAccount": "true",
           "ControlParameters": {
               "PSUAuthenticationMethods": [
                   "UK.OBIE.SCA"
               ],
               "VRPType": ["UK.OBIE.VRPType.Sweeping"],
               "ValidFromDateTime": "2022-05-12T12:43:07.956Z",
               "ValidToDateTime": "2023-05-12T12:43:07.956Z",
               "MaximumIndividualAmount": {
                   "Amount": "180.00",
                   "Currency": "GBP"
               },
               "PeriodicLimits": [
                   {
                       "Amount": "2000.00",
                       "Currency": "GBP",
                       "PeriodAlignment": "Consent",
                       "PeriodType": "Half-year"
                   }
               ]
           },
           "Initiation": {
               "DebtorAccount": {
                   "SchemeName": "UK.OBIE.IBAN",
                   "Identification": "30080012343456",
                   "Name": "Marcus Sweepimus"
               },
               "CreditorAccount": {
                   "SchemeName": "UK.OBIE.IBAN",
                   "Identification": "30949330000010",
                   "SecondaryIdentification": "Roll 90210",
                   "Name": "Marcus Sweepimus"
               },
               "RemittanceInformation": {
                   "Reference": "Sweepco"
               }
           }
       },
       "Risk": {
           "PaymentContextCode": "PartyToParty"
       }
    }'
    ```
   
   Add all mandatory headers:

   - **Authorization**: An Authorisation Token as per the [OAuth 2.0 specification](https://tools.ietf.org/html/rfc6750).
         User the application access token you generated from the above step.
   - **x-idempotency-key**: Every request will be processed only once per x-idempotency-key. The Idempotency key will be valid for 24 hours.
   - **x-jws-signature**: A detached JWS signature of the body of the payload.

3. The response contains a Consent Id. A sample response is as follows:

   ```
   {
      "Meta":{
         
      },
      "Risk":{
         "PaymentContextCode":"PartyToParty"
      },
      "Links":{
         "Self":"https://localhost:8243/open-banking/3.1/vrp/domestic-vrp-consents/480edc52-dacf-4d3d-a272-e8636b0add6b"
      },
      "Data":{
         "Status":"AwaitingAuthorisation",
         "StatusUpdateDateTime":"2022-06-15T00:24:33+05:30",
         "CreationDateTime":"2022-06-15T00:24:33+05:30",
         "ControlParameters":{
            "PSUAuthenticationMethods":[
               "UK.OBIE.SCA"
            ],
            "ValidToDateTime":"2023-05-12T12:43:07.956Z",
            "ValidFromDateTime":"2022-05-12T12:43:07.956Z",
            "VRPType":[
               "UK.OBIE.VRPType.Sweeping"
            ],
            "MaximumIndividualAmount":{
               "Amount":"180.00",
               "Currency":"GBP"
            },
            "PeriodicLimits":[
               {
                  "PeriodAlignment":"Consent",
                  "PeriodType":"Half-year",
                  "Amount":"2000.00",
                  "Currency":"GBP"
               }
            ]
         },
         "ReadRefundAccount":"true",
         "ConsentId":"480edc52-dacf-4d3d-a272-e8636b0add6b",
         "Initiation":{
            "DebtorAccount":{
               "SchemeName":"UK.OBIE.IBAN",
               "Identification":"30080012343456",
               "Name":"Marcus Sweepimus"
            },
            "RemittanceInformation":{
               "Reference":"Sweepco"
            },
            "CreditorAccount":{
               "SecondaryIdentification":"Roll 90210",
               "SchemeName":"UK.OBIE.IBAN",
               "Identification":"30949330000010",
               "Name":"Marcus Sweepimus"
            }
         }
      }
   }
   ```

### Authorizing a consent

The PISP application redirects the bank customer to authenticate and approve/deny application-provided consents.

1. Generate the request object by signing the following JSON payload using supported algorithms.

    ``` tab="Format"
    {
      "kid": "<CERTIFICATE_FINGERPRINT>",
      "alg": "<SUPPORTED_ALGORITHM>",
      "typ": "JWT"
    }
    {
      "max_age": 86400,
      "aud": "<This is the audience that the ID token is intended for. e.g., https://<IS_HOST>:9446/oauth2/token>",
      "scope": "payments openid",
      "iss": "<APPLICATION_ID>",
      "claims": {
        "id_token": {
          "acr": {
            "values": [
              "urn:openbanking:psd2:sca",
              "urn:openbanking:psd2:ca"
            ],
            "essential": true
          },
          "openbanking_intent_id": {
            "value": "<CONSENTID>",
            "essential": true
          }
        },
        "userinfo": {
          "openbanking_intent_id": {
            "value": "<CONSENTID>",
            "essential": true
          }
        }
      },
      "response_type": "<code:Retrieves authorize code/code id_token: Retrieves authorize token and ID token>",  
      "redirect_uri": "<CLIENT_APPLICATION_REDIRECT_URI>",
      "state": "YWlzcDozMTQ2",
      "exp": <EPOCH_TIME_OF_TOKEN_EXPIRATION>,
      "nonce": "<PREVENTS_REPLAY_ATTACKS>",
      "client_id": "<APPLICATION_ID>"
    }
    ```

    ``` tab="Sample"
    eyJraWQiOiIyTUk5WFNLaTZkZHhDYldnMnJoRE50VWx4SmMiLCJhbGciOiJQUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXhfYWdlIjo4NjQwMCwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6OTQ0Ni9vYXV0aDIvdG9rZW4iLCJzY29wZSI6ImFjY291bnRzIG9wZW5pZCIsImlzcyI6IllEY0c0ZjQ5RzEza1dmVnNucWRoejhnYmEyd2EiLCJjbGFpbXMiOnsiaWRfdG9rZW4iOnsiYWNyIjp7InZhbHVlcyI6WyJ1cm46b3BlbmJhbmtpbmc6cHNkMjpzY2EiLCJ1cm46b3BlbmJhbmtpbmc6cHNkMjpjYSJdLCJlc3NlbnRpYWwiOnRydWV9LCJvcGVuYmFua2luZ19pbnRlbnRfaWQiOnsidmFsdWUiOiJkYzY0ZTI3Yy03MTM5LTQ0MGUtOGI0Zi1jZDcwYzY0OWUwOTYiLCJlc3NlbnRpYWwiOnRydWV9fSwidXNlcmluZm8iOnsib3BlbmJhbmtpbmdfaW50ZW50X2lkIjp7InZhbHVlIjoiZGM2NGUyN2MtNzEzOS00NDBlLThiNGYtY2Q3MGM2NDllMDk2IiwiZXNzZW50aWFsIjp0cnVlfX19LCJyZXNwb25zZV90eXBlIjoiY29kZSBpZF90b2tlbiIsInJlZGlyZWN0X3VyaSI6Imh0dHBzOi8vd3NvMi5jb20iLCJzdGF0ZSI6IllXbHpjRG96TVRRMiIsImV4cCI6MTYzMzU4NjQwOCwibm9uY2UiOiJuLTBTNl9XekEyTWoiLCJjbGllbnRfaWQiOiJZRGNHNGY0OUcxM2tXZlZzbnFkaHo4Z2JhMndhIn0.OK0G0hxKQwBYEV8G9cDZAMkuLYU0Go3O8DhphzlYXpaTxPTpNUGFuUk6wiDNh0SGt-bBg6lC0mv7FrfBMv9r79yuDME6iqefgVB3PXhqWfGfRvhDY0wW9HvfGsWdrJ3MUxV0RomZeEyoooD3TrRItsc8-CsmAz5_BbCgSwYRGMcAwS89P-twlc3CE7YYru1ktGkoVQ8UvQA8IiXoomq-eS3oebRTD8DmYkjpeKURkO0rrssMuxOcN64GcgEAQeDW_dANSq_YSX9yTGGFWIzVmkafT5qzz0792VIGDtxx5Tr7keuDWIR_2SBdo_49oVLHttLu_kwNhN9u-Ed2Hx1wPQ
    ```

2. The ASPSP sends the request to the customer stating the accounts and information that the API consumer wishes to access.
   This request is in the format of a URL as follows.

   Update the placeholders with relevant values and run the following in a browser to prompt the invocation of the authorize API.

    ```
    https://<IS_HOST>:9446/oauth2/authorize?response_type=code%20id_token&client_id=<CLIENT_ID>&scope=payments%20op
    enid&redirect_uri=<APPLICATION_REDIRECT_URI>&state=YWlzcDozMTQ2&request=<REQUEST_OBJECT>&prompt=login&nonce=<REQUEST_OBJECT_NONCE>
    ```

3. Upon successful authentication, the user is redirected to the consent authorize page. Use the login credentials of a
   user that has a `subscriber` role.

4. The page displays the data requested by the consent such as permissions, transaction period, and expiration date. ![select accounts](../assets/img/get-started/quick-start-guide/consent-page-select-accounts.png)

5. At the bottom of the page, a list of bank accounts that the PISP wishes to access is displayed.

6. Select one or more accounts from the list and click **Confirm**. ![confirm_consent](../assets/img/get-started/quick-start-guide/consent-page-confirm.png)

7. Upon providing consent, an authorization code is generated on the web page of the **redirect_uri**. See the sample given below:

    ```
    https://wso2.com/#code=5591c5a0-14d0-3ca9-bec2-c1efe86e32ce&id_token=eyJ4NXQiOiJOVGRtWmpNNFpEazNOalkwWXpjNU1tWm1PRGd3TVRFM01XWXdOREU1TVdSbFpEZzROemM0WkEiLCJraWQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZ19SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiWC14OFhwV2I3cGIyYnU2NHVLYktTUSIsInN1YiI6ImFkbWluQHdzbzIuY29tQGNhcmJvbi5zdXBlciIsImFtciI6WyJCYXNpY0F1dGhlbnRpY2F0b3IiXSwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQ2XC9vYXV0aDJcL3Rva2VuIiwibm9uY2UiOiJuLTBTNl9XekEyTSIsInNpZCI6ImM5MDViNmFhLTBiNWEtNGM4Ni04NWYzLTk0MTI5YWRlMTVjNiIsImF1ZCI6IllEY0c0ZjQ5RzEza1dmVnNucWRoejhnYmEyd2EiLCJjX2hhc2giOiJ5Y3lhNHBBN2ZfSW9uQzlpaWl1TnZ3Iiwib3BlbmJhbmtpbmdfaW50ZW50X2lkIjoiNjFmOWEzNTctNDE2MC00OGE2LTg0NWMtYzM3ZjEwN2ZlNjQ4Iiwic19oYXNoIjoiMWNIaVdBMVN2NmpKc0t6SDRFbnk1QT09XHJcbiIsImF6cCI6IllEY0c0ZjQ5RzEza1dmVnNucWRoejhnYmEyd2EiLCJleHAiOjE2Mjg3NTMxODIsImlhdCI6MTYyODc0OTU4Mn0.mGgNWc12T8a5pW6QQRF6RXoVci0ToHLCttLiCGY6KraHMzGmRFUm6jz6Clbxk_447DdoKONAqY_2uCQCRkudjMk_7sTCV-DxOIbFYctrTiU01CvjKLbNcr8tjHaaIp8rhft1K0q3h0kVxyRoo3A1WQDBJFpp2jWqqJMyjShzEf6bbojtpBw2kyAazInhnm4XFSYchGPDF7XP-vRwCHNG532dg0kXvUrdA9B7RQGnQlay296rN1pRN-GTnC6_io_anf6a5Q3ovuaxcODnbb540hnjty3scPISj38La21iQTWEBTGlBUPnXs10pXjzCmib5wng37rXV8PDslbMfRqMhg&state=YWlzcDozMTQ2&session_state=507a0e617fe39feae18795b746c09fc44dd7e8658348a6c1ce2e91778224a5a4.IFBUQh0silRELhJocuhouw
    ```

   The authorization code from the below URL is in the code parameter (code=`5591c5a0-14d0-3ca9-bec2-c1efe86e32ce`).

### Generating user access token

In this section, you will be generating an access token using the authorization code generated in the section [above](authorizing-a-consent).

1. Generate the client assertion by signing the following JSON payload using supported algorithms.

    !!! note
        If you have configured the [OB certificates](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/252018873/OB+Root+and+Issuing+Certificates+for+Sandbox),

         - Use the [transport private key](../../assets/attachments/transport-certs/obtransport.key) and
          [transport public certificate](../../assets/attachments/transport-certs/obtransport.pem) for Transport layer security testing purposes.

        - Use the [signing certificate](../../assets/attachments/signing-certs/obsigning.pem) and
          [signing private keys](../../assets/attachments/signing-certs/obsigning.key) for signing purposes.

    ``` tab="Format"
    Format:
    {
    "alg": "<The algorithm used for signing.>",
    "kid": "<The thumbprint of the certificate.>",
    "typ": "JWT"
    }
     
    {
    "iss": "<This is the issuer of the token. For example, client ID of your application>",
    "sub": "<This is the subject identifier of the issuer. For example, client ID of your application>",
    "exp": <This is the epoch time of the token expiration date/time>,
    "iat": <This is the epoch time of the token issuance date/time>,
    "jti": "<This is an incremental unique value>",
    "aud": "<This is the audience that the ID token is intended for. For example, https://<IS_HOST>:9446/oauth2/token>"
    }
     
    <signature: For DCR, the client assertion is signed by the private key of the signing certificate. Otherwise, the private signature of the application certificate is used.>
    ```

    ``` tab="Sample"
    eyJraWQiOiIyTUk5WFNLaTZkZHhDYldnMnJoRE50VWx4SmMiLCJhbGciOiJQUzI1NiJ9.eyJzdWIiOiJZRGNHNGY0OUcxM2tXZlZzbnFkaHo4Z2JhMndhIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6OTQ0Ni9vYXV0aDIvdG9rZW4iLCJpc3MiOiJZRGNHNGY0OUcxM2tXZlZzbnFkaHo4Z2JhMndhIiwiZXhwIjoxNjI4Nzc0ODU1LCJpYXQiOjE2Mjg3NDQ4NTUsImp0aSI6IjE2Mjg3NDQ4NTUxOTQifQ.PkKRSDtkCyXabzLgGwAoy5C3jSORVU8X8sGDVrKpetPnjbCNx2wPlH-PzWUU1n05gdC7lDmoU21nsKLF_nE3iC-9hKEy4YsvJ7PFjNBPMOMUYDhRh9PCkPnec6f042zonb_ZifBq8r1aScUDoZ1L0hq7yjfZubwReFCWbESQ8PauuBuHRl7__kWvglthfgruQ7TTiIWiM60LWYct5TQWSF1IDcYGy03l-9OV5l260JBHPT4heLXzUQTarsh0PoWpv09xYLu8uGCexEt-HtRH8qwJGiFi5PiCA09_KyWVqbrcdjBloCmD5Kiqa1X0AnEbf9kKs0fqvcl7NN5-yVQUjg
    ```

4. Run the following cURL command in a command prompt to generate the access token. Update the placeholders with relevant values.

    ```
    curl -X POST \
    https://<IS_HOST>:9446/oauth2/token \
    -H 'Cache-Control: no-cache' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    --cert <PUBLIC_KEY_FILE_PATH> --key <PRIVATE_KEY_FILE_PATH> \
    -d 'grant_type=authorization_code&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&client_assertion=<CLIENT_ASSERTION>&code=<CODE_FROM_ABOVE_STEP>&scope=openid%20payments&redirect_uri=<REDIRECT_URI>'
    ```

5. Upon successful token generation, you can obtain a token as follows:

    ``` json
    {
        "access_token": "eyJ4NXQiOiJOVGRtWmpNNFpEazNOalkwWXpjNU1tWm1PRGd3TVRFM01XWXdOREU1TVdSbFpEZzROemM0WkEiLCJraWQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZ19SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhZG1pbkB3c28yLmNvbUBjYXJib24uc3VwZXIiLCJhdXQiOiJBUFBMSUNBVElPTl9VU0VSIiwiYXVkIjoiWURjRzRmNDlHMTNrV2ZWc25xZGh6OGdiYTJ3YSIsIm5iZiI6MTYyODc0NjU5MiwiYXpwIjoiWURjRzRmNDlHMTNrV2ZWc25xZGh6OGdiYTJ3YSIsInNjb3BlIjoiYWNjb3VudHMgY29uc2VudF9pZGRjNjRlMjdjLTcxMzktNDQwZS04YjRmLWNkNzBjNjQ5ZTA5NiBvcGVuaWQiLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDZcL29hdXRoMlwvdG9rZW4iLCJjbmYiOnsieDV0I1MyNTYiOiJ2WW9VWVJTUTdDZ29ZeE5NV1dPekM4dU5mUXJpczRwWFFYMFptaXRSeHpzIn0sImV4cCI6MTYyODc1MDE5MiwiaWF0IjoxNjI4NzQ2NTkyLCJqdGkiOiI3NTA4MmEzYS1iNDllLTRjZjEtYjI4Ni1lMWJiYTYwZTViNTYiLCJjb25zZW50X2lkIjoiZGM2NGUyN2MtNzEzOS00NDBlLThiNGYtY2Q3MGM2NDllMDk2In0.MhNpi0C2vASqrigTE1qGjK_7PY722H4PjzOSwMKcmFo7YgIFIBQdtj2BRJN0y7WAOFYGqh5lUFKMJWrXXtOyo0-6pWheluQfmOMiTyqOzA7WcTZAwYUzeoRmgWtR_LCYNwzm1O7CcNeavLGucLkCmpTW9Xvn3dKkk0XFonzrrCH9QqMrA0iQP6vYgH5wH4rDxcK_6Vk1r0X33sHVM-k4ifbcIzZekUdJIgNQfK1Qosslmvm1LZfEZ1vi63cfkc0IexNW6jJYvvZxdYJVz42EKKIqR_Z_HBs8umamqhUqKAkcv7Q76bNNPpM1iBJK-eDVf8yfIr9243fyictuqhP-2Q",
        "refresh_token": "98dfa00b-a2a4-3ba0-9af2-4fac26f317b3",
        "scope": "payments openid",
        "id_token": "eyJ4NXQiOiJOVGRtWmpNNFpEazNOalkwWXpjNU1tWm1PRGd3TVRFM01XWXdOREU1TVdSbFpEZzROemM0WkEiLCJraWQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZ19SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiUEFGdl9WZFdqREp0bFYyN1U1NEJYdyIsImF1ZCI6IllEY0c0ZjQ5RzEza1dmVnNucWRoejhnYmEyd2EiLCJjX2hhc2giOiJac2l4aVM4c2RBZFJhVHVHZjlYbmxBIiwic3ViIjoiYWRtaW5Ad3NvMi5jb21AY2FyYm9uLnN1cGVyIiwibmJmIjoxNjI4NzQ2NTkyLCJhenAiOiJZRGNHNGY0OUcxM2tXZlZzbnFkaHo4Z2JhMndhIiwiYW1yIjpbIkJhc2ljQXV0aGVudGljYXRvciJdLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDZcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2Mjg3NTAxOTIsImlhdCI6MTYyODc0NjU5Miwibm9uY2UiOiJuLTBTNl9XekEyTSJ9.VRMfZouZTRm0QotoN0g95QjH7qKG_KwLExJyyb6AGbFewulyjwyPTJsHIj7D19ZZuNL14KqdCw51X3QjDXjLuvE6oas12EpKwHBuAAJjRtLf7NbbRPFok8Qlq011U_qNfYgcFubOQ5bXTr1QpwIU8imExvRxYS5UzsGyvluQ9hzjmRZM5cfwJ7hck71joX45Ue3E2tIvWxqyU13EJOyD3gd2QuhM6GSq3oWk8S0N_y7ACWLEHM8nzBUXiRo03D4DIacnmiZeicjIiim-SzF70tDJe70qy_nqbgf6VGqdAAIXyMXAvKxF5QWwYd5seMvt5o-_hCsI6DV69FawGJcbVQ",
        "token_type": "Bearer",
        "expires_in": 3600
    }
    ```

### Invoking Variable Recurring Payments API

Once the PSU approves the payment consent, the PISP can proceed to submit the payment order for processing. The
following request is an instruction to the ASPSP to begin the process of creating a payment resource.

```
curl --location --request POST 'https://localhost:8243/open-banking/v3.1/vrp/domestic-vrps' \
--header 'x-fapi-financial-id: open-bank' \
--header 'x-idempotency-key: 32' \
--header 'Content-Type: application/json; charset=UTF-8' \
--header 'charset: UTF-8' \
--header 'x-jws-signature: eyJhbGciOiJQUzI1NiIsImtpZCI6IkdxaEtWVEFObkxNWXBHR2ZBdEoxTmhka2dqdyIsImNyaXQiOlsiaHR0cDovL29wZW5iYW5raW5nLm9yZy51ay9pYXQiLCJodHRwOi8vb3BlbmJhbmtpbmcub3JnLnVrL3RhbiIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvaXNzIl0sImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvaWF0IjoxNjQ5NjIyNzQ1LCJodHRwOi8vb3BlbmJhbmtpbmcub3JnLnVrL3RhbiI6Im9wZW5iYW5raW5nLm9yZy51ayIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvaXNzIjoiQ049dTNaV2xmOVl0NDJkeVpnSXZ6a3ZxYiwgT1U9MDAxNTgwMDAwMUhRUXJaQUFYLCBPPU9wZW5CYW5raW5nLCBDPUdCIn0..o0LEsQFSdTMU_OezHtNfYA25bxnkGwDmmaraVDhIcoI8j7asmIwfPx0dp1pITdne3FUvjqsPs741FV87t_DJznK_3GxrNqnr-PDgKGQWKgcptHz8iFOUmYsO-DyNdwhjBOJoLUuwMK463_sVGeMkFMPSTEVmXApe9wBNbKOMHmKLEyEzB1ta9f8YaKm4QtnvbbyNq3jLYeTkTkhlSgJrjTaIST3FjRIfQQk49dvppY8GgazBaHnzgzo3wSGEAgj2m6lb70IDaxcj_xFsFQ0APTdKCAFXdAfnpDEEbtTz_q9Ypljs3qoRXt35_6nQkvpqJkLdOrY5JEpRFWt4nZok-Q' \
--header 'Authorization: Bearer eyJ4NXQiOiJNR0l4TVRrMlpXTTJaVEZqTmpOall6WXdOV0ZsWm1OalpHWTRabVk0T1RVd1l6ZGhNRFF4TnciLCJraWQiOiJaREJoT1RjMlpqZzNZV0poWVdVelpUWXlNbVJrWm1JM09EbGpOalV5TXpBd01UYzFObUppTmpnNE56SmxOMlJsT0RFMVpHUTJNVEJqTmpZek9ETmtNQV9SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhZG1pbkB3c28yLmNvbUBjYXJib24uc3VwZXIiLCJhdXQiOiJBUFBMSUNBVElPTl9VU0VSIiwiYXVkIjoiNkNEaTc3QzVaUWpid28yZHhaTnpCV1VqSFRVYSIsIm5iZiI6MTY1NDUwNjgxOCwiYXpwIjoiNkNEaTc3QzVaUWpid28yZHhaTnpCV1VqSFRVYSIsInNjb3BlIjoib3BlbmlkIHBheW1lbnRzIiwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQ2XC9vYXV0aDJcL3Rva2VuIiwiY25mIjp7Ing1dCNTMjU2IjoiMmh5ZjBBdGtkNkZqNHJ6bi12c0Q3R09uOGlLZ2NiYkhKVUpYTGxtcjFJcyJ9LCJleHAiOjE2NTQ1MTA0MTgsImlhdCI6MTY1NDUwNjgxOCwianRpIjoiNzkxYWQwODYtYTc4OC00MmQ1LWI2OTgtMGUzMDU0ZTUyMGE5IiwiY29uc2VudF9pZCI6ImI5N2NlM2YzLWQxYmItNGU5OC05Y2M5LTQ4ODY5ZmUyMzNhMyJ9.Li1FUZaoJ08ma5HxH1mwIMy43vgz-vXvQnQmAE6DzHum0N_uBFW7K9vxz9jK05npbcEC7cU3XK0CCBfNCU67AZAc83DUhTnrYvSrah28Ltb3SGcGPJBI47EqmXY34oyXihqORC7it37EJjKg-Lk0G2FTz1GaJ6Cd4tg-ucZiNLz3FXz3Hop5w46PuMf_HMDjSDfOB-PMVmb3TJ0ze6XGHgasDGk8Or5LSKAWKMt8vrsjvnvzW0D0ur2bhCTl4QyMZpVV1oFHRHsJPI4BeZx88eMW7bUkTf3JR-WXP1fa4AmhkuQn0R_LQlkVzg77DuIMfQSN9GzepyC0KmWymdKwJA' \
--cert <PUBLIC_KEY_FILE_PATH> --key <PRIVATE_KEY_FILE_PATH> \
--data-raw '{
  "Data":{
     "ConsentId":"480edc52-dacf-4d3d-a272-e8636b0add6b",
     "PSUAuthenticationMethod":"UK.OBIE.SCA",
     "Initiation":{
        "DebtorAccount":{
           "SchemeName":"UK.OBIE.IBAN",
           "Identification":"30080012343456",
           "Name":"Marcus Sweepimus"
        },
        "CreditorAccount":{
           "SchemeName":"UK.OBIE.IBAN",
           "Identification":"30949330000010",
           "SecondaryIdentification":"Roll 90210",
           "Name":"Marcus Sweepimus"
        },
        "RemittanceInformation":{
           "Reference":"Sweepco"
        }
     },
     "Instruction":{
        "InstructionIdentification": "ACME412",
        "EndToEndIdentification": "FRESCO.21302.GFX.20",
        "CreditorAccount":{
           "SchemeName":"UK.OBIE.IBAN",
           "Identification":"30949330000010",
           "SecondaryIdentification":"Roll 90210",
           "Name":"Marcus Sweepimus"
        },
        "InstructedAmount":{
           "Amount":"10.00",
           "Currency":"GBP"
        },
        "RemittanceInformation":{
           "Reference":"Sweepco"
        }
     }
  },
  "Risk":{
     "PaymentContextCode":"PartyToParty"
  }
}'
```

The response contains `DomesticVRPId` along with the payment submission details.

```
{
   "Meta":{
      
   },
   "Risk":{
      "PaymentContextCode":"PartyToParty"
   },
   "Links":{
      "Self":"/domestic-vrps/480edc52-dacf-4d3d-a272-e8636b0add6b-94"
   },
   "Data":{
      "Status":"AcceptedSettlementCompleted",
      "StatusUpdateDateTime":"2022-06-15T00:29:49+05:30",
      "DebtorAccount":{
         "SecondaryIdentification":"Roll 2901",
         "SchemeName":"SortCodeAccountNumber",
         "Identification":"30080012343456",
         "Name":"Deb Mal"
      },
      "CreationDateTime":"2022-06-15T00:29:49+05:30",
      "DomesticVRPId":"480edc52-dacf-4d3d-a272-e8636b0add6b-94",
      "ConsentId":"480edc52-dacf-4d3d-a272-e8636b0add6b",
      "Instruction":{
         "RemittanceInformation":{
            "Reference":"Sweepco"
         },
         "EndToEndIdentification":"FRESCO.21302.GFX.20",
         "InstructionIdentification":"ACME412",
         "CreditorAccount":{
            "SecondaryIdentification":"Roll 90210",
            "SchemeName":"UK.OBIE.IBAN",
            "Identification":"30949330000010",
            "Name":"Marcus Sweepimus"
         },
         "InstructedAmount":{
            "Amount":"10.00",
            "Currency":"GBP"
         }
      },
      "Initiation":{
         "DebtorAccount":{
            "SchemeName":"UK.OBIE.IBAN",
            "Identification":"30080012343456",
            "Name":"Marcus Sweepimus"
         },
         "RemittanceInformation":{
            "Reference":"Sweepco"
         },
         "CreditorAccount":{
            "SecondaryIdentification":"Roll 90210",
            "SchemeName":"UK.OBIE.IBAN",
            "Identification":"30949330000010",
            "Name":"Marcus Sweepimus"
         }
      }
   }
}
```