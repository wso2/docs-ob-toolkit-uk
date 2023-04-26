There are two APIs under the Event Notification API:

- Aggregated Polling API
- Event Subscription API

This page provides step by step instructions to deploy, subscribe, and invoke the Event Notifications Aggregated Polling API.

## Deploying the Aggregated Polling API

1. Sign in to the API Publisher Portal at `https://<APIM_HOST>:9443/publisher` with the creator/publisher privileges.

    ![sign_in](../assets/img/get-started/quick-start-guide/sign-in.png)

2. In the homepage, go to **REST API** and select **Import Open API**. ![let's_get_started](../assets/img/get-started/quick-start-guide/lets-get-started.png)

3. Select **OpenAPI File/Archive**. ![create-an-api](../assets/img/get-started/quick-start-guide/create-an-api.png)

4. Click **Browse File to Upload** and select the `event-notifications-aggregated-polling-openapi-3.1.10.yaml` file from the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/openbanking.org.uk/EventNotifications` directory.

5. Click **Next**.

6. Set the **Context** value as follows:

    ```
    /open-banking/{version}
    ```

7. Click **Create** to create the API. ![create-event-notifications](../assets/img/try-out/event-notification/create-event-notification.png)

8. After the API is successfully created, go to **Portal Configurations** using the left menu panel. ![portal-configurations](../assets/img/get-started/quick-start-guide/portal-configurations.png)

9. Select **Subscriptions** from the left menu pane and set the business plan to **Unlimited: Allows unlimited requests**. ![business-plan](../assets/img/get-started/quick-start-guide/business-plan.png)

10. Click **Save**.

11. Once you get the message that the API is successfully updated, add a custom policy. Follow the instructions given below according to the API Manager version you are using:

    ??? note "Click here to see how to add a custom policy if you are using API Manager 4.0.0..."

         1. Use the left menu panel and select **API Configurations > Runtime**.

         2. Click the **Edit** button under **Request > Message Mediation**.

         3. Select the **Custom Policy** option.
        
         4. Upload the `event-notifications-aggregated-polling-openapi-3.1.10.yaml` file from the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/openbanking.org.uk/EventNotifications/3.1.10` directory. ![accounts_insequence](../assets/img/try-out/event-notification/event-notification-insequence.png)
         
         5. Click **Select**. 
        
         6. Scroll down and click **SAVE**.

    ??? note "Click here to see how to add a custom policy if you are using API Manager 4.1.0..."

         1. Go to **Develop -> API Configurations -> Policies** in the left menu pane.<br><br>
         <div style="width:40%">
         ![select_policies](../assets/img/get-started/quick-start-guide/select-policies.png)
         </div>

         2. On the **Policy List** card, click on **Add New Policy**.

         3. Fill in the **Create New Policy**.

         4. Upload the relevant insequence file from the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/openbanking.org.uk/EventNotifications` directory.

         5. Scroll down and click **Save**. Upon successful creation of the policy, you receive an alert as shown below: <br><br>
         <div style="width:35%">
         ![successful](../assets/img/get-started/quick-start-guide/successful.png)
         </div>

         6. Expand the API endpoint from the list of API endpoints. ![expand_events](../assets/img/try-out/event-notification/expand-events.png)

         7. Drag and drop the previously created policy to the **Request Flow** of the API endpoint. ![events_request_flow](../assets/img/try-out/event-notification/events-request-flow.png)

         8. Select **Apply to all resources** and click **Save**.

         9. Scroll down and click **Save**.

12. Use the left menu panel and go to **API Configurations > Endpoints**.

    ![select_endpoints](../assets/img/get-started/quick-start-guide/select-endpoints.png)

13. Add a **Dynamic Endpoint**. ![add_dynamic_endpoint](../assets/img/get-started/quick-start-guide/add_dynamic_endpoint.png)

14. Go to **Deployments** using the left menu pane.

    ![select_deployments](../assets/img/get-started/quick-start-guide/select-deployments.png)

15. Select the API Gateway type, in this scenario, it is **Default**. ![api_gateway](../assets/img/get-started/quick-start-guide/dcr-api-gateway.png)

16. Click **Deploy**.

17. Go to **Overview** using the left menu pane.

    ![select_overview](../assets/img/get-started/quick-start-guide/select-overview.png)

18. Click **Publish**. ![publish_api](../assets/img/get-started/quick-start-guide/publish-api.png)

## Subscribing to Aggregated Polling API

1. The deployed API is now available in the Developer Portal at `https://<APIM_HOST>:9443/devportal`.

2. Select the **Aggregated Polling API**.

3. Locate **Subscriptions** from the left menu pane. 

    ![select_subscriptions](../assets/img/get-started/quick-start-guide/select-subscriptions.png)

4. From the **Application** dropdown, select the application that you want to be subscribed to the Aggregated Polling API V3.1. For example:

    ![select_application](../assets/img/get-started/quick-start-guide/select-application.png)

6. Click **Subscribe**.

## Invoking the Aggregated Polling API

### Generating Application Access Token

Once you register the application, generate an application access token.

1. Generate the client assertion by signing the following JSON payload using supported algorithms.

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
    eyJraWQiOiJoM1pDRjBWcnpnWGduSENxYkhiS1h6emZqVGciLCJhbGciOiJQUzI1NiJ9.eyJzdWIiOiI5RGtVU21WTEZPeEpESHhldjM1emZGY0pjeTRhIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6OTQ0Ni9vYXV0aDIvdG9rZW4iLCJpc3MiOiI5RGtVU21WTEZPeEpESHhldjM1emZGY0pjeTRhIiwiZXhwIjoxNjgyMTM3NjM5LCJpYXQiOjE2ODE4Nzg0MzksImp0aSI6IjE2Mjg3NDQ4NTUxOTQzMDcifQ.bq1qaXaLRXhtVQcypgRHV2yXZyIl7GsggaGS91CeYTgPagYoYEoLrphJIV54Ua4Lm2TZptAXATXaGjivVN9-bxs5SOvy7POThvi_psWy5re8BkS5PiqzkkEjwhogboVZCMLTHveo2hEl-AAtyg8YDQEPnrdg9HJvDeIFmznQfoNBQY7CO94ms5wk3pH5pgq14L4UatT-k6H-QrYPAP5FaETk94VdhWI7Urz8ibGSbPDseBJl-Zd88cNSydSuPu7uTYltW1-wErmJ0H3nkXfEwuT92Lf1J01rs9T7n9AXwohUYkJe1-8I6NtMW_OB5nFn68mowx1ESLVhWVu3XHkIjg
    ```

2. Run the following cURL command in a command prompt to generate the access token. Update the placeholders with relevant values.

    ``` curl
    curl -X POST \
    https://<IS_HOST>:9446/oauth2/token \
    --cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH> \
    -d 'grant_type=client_credentials&scope=eventpolling%20openid&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&client_assertion=<CLIENT_ASSERTION_JWT>&redirect_uri=<REDIRECT_URI>&client_id=<CLIENT_ID>'
    ```
    
3. Upon successful token generation, you can obtain a token as follows:
    
    ``` json
    {
       "access_token": "eyJ4NXQiOiJOVGRtWmpNNFpEazNOalkwWXpjNU1tWm1PRGd3TVRFM01XWXdOREU1TVdSbFpEZzROemM0WkEiLCJraWQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZ19SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhZG1pbkB3c28yLmNvbUBjYXJib24uc3VwZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6IjlEa1VTbVZMRk94SkRIeGV2MzV6ZkZjSmN5NGEiLCJuYmYiOjE2ODE5OTU5NTIsImF6cCI6IjlEa1VTbVZMRk94SkRIeGV2MzV6ZkZjSmN5NGEiLCJzY29wZSI6ImV2ZW50cG9sbGluZyIsImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0Nlwvb2F1dGgyXC90b2tlbiIsImNuZiI6eyJ4NXQjUzI1NiI6ImswcC0tTUw3bmZrRTJwVUxLcnlzekpSQngyVGhCTWF4SGdKT2VQb3NpdHMifSwiZXhwIjoxNjgxOTk5NTUyLCJpYXQiOjE2ODE5OTU5NTIsImp0aSI6IjBhOWRiZGFjLTQxYjgtNGMyYy05NTA3LWUwNmU2M2E3MmE5NCJ9.ggKeVVRT-PF1xpPaj8wAM1l9K5LXUaHhvnnJFIK--eczoMTjua4408D2MDoiwI1sxZ1R3HqetENSvHGCgv4181VtvXY2EL9pXLpV2UXKTs9gQcdQynY8_vKEYfSNzlnUsW2vroGkasU_6eQF9lxwskPWFMqf_pJs75Qpz1YchpS-9gUM0OmwdefpQ1bK-2PNODGYqooka2HSW_aMDx0Mey7PjfXLJTM3Q_2m6T-kyIu0gWIS_0K65r3DIPSUkxijrgHENU7Qbemw11pQH_I-Dlgf1ruT_i57QUiv-Lnh9e0Azvyd-bxs8uasEnn-dIdrDuQqpiI-ss885zvTsZKedQ",
       "scope": "eventpolling",
       "token_type": "Bearer",
       "expires_in": 3600
    }
    ```

### Polling Events

This endpoint allows applications to poll for, acknowledge, and receive event notifications. You can use this endpoint
when the API consumer applications communicate their polling parameters and event notification acknowledgements. Using
this endpoint the banks can respond accordingly; sending event notifications as indicated by the application's polling
parameters.

Based on the request payloads, the Event Polling (`POST /events`) endpoint performs the following:

- Poll for events
- Acknowledge the received events
- Acknowledge error notifications
- Poll for new events and acknowledge the received events at once

A sample Event Polling request is as follows:

```
curl -X 'POST' \
  'https://<IS_HOST>:8243/open-banking/v3.1/events' \
  -H 'accept: application/json; charset=utf-8' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -H 'Authorization: Bearer undefined' \
  -d '{
      "maxEvents": 5,
      "returnImmediately": true  
  }'
```

Above request is the initial poll with the request payload as follows:

```
{
   "returnImmediately": true,
   "maxEvents": 5
}
```

Sample Response:

The `sets` values consist of notification IDs and the JWT-encoded event notification details pairs.

```
{
   "moreAvailable": true,
   "sets": {
       "8241e34a-adf5-48c3-bb90-4b86abc2d876": "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5RGtVU21WTEZPeEpESHhldjM1emZGY0pjeTRhIiwiYXVkIjoiOURrVVNtVkxGT3hKREh4ZXYzNXpmRmNKY3k0YSIsImlzcyI6Ind3dy53c28yLmNvbSIsInR4biI6IjNkMzJmNTE1LTU5MDYtNGU4My1iMWExLThhOWZlNjc0YjBiYyIsInRvZSI6MTY3OTQwMTc4NzAwMCwiaWF0IjoxNjgxOTk2MjY0LCJqdGkiOiI4MjQxZTM0YS1hZGY1LTQ4YzMtYmI5MC00Yjg2YWJjMmQ4NzYiLCJldmVudHMiOnsidXJuOnVrOm9yZzpvcGVuYmFua2luZzpldmVudHM6Y29uc2VudC1hdXRob3JpemF0aW9uLXJldm9rZWQiOnsicmVzb3VyY2VJRCI6IjFkODA0NzhiLWE2NjItNDViMi04NDMzLWJlZTFjMjQ2ZDM1ZiJ9LCJ1cm46dWs6b3JnOm9wZW5iYW5raW5nOmV2ZW50czpyZXNvdXJjZS11cGRhdGUiOnsicmVzb3VyY2VJRCI6IjFkODA0NzhiLWE2NjItNDViMi04NDMzLWJlZTFjMjQ2ZDM1ZiJ9fX0.BKM9yHOoU515nu2FeaLQYpsANoliDvAtmRm3cfVBGjzRrIkxs0Eag7UvNZospTabtVqAYY60cZF7xh-Of1bGKXI2PasvDxQn7VlnUGurZFhCwyef0b6A77JD2vsvfJN4QvGf3btgkGTvRUIaCjILEUJsuD0OK6GqoKqgiyNg4jyvGczf_QB7nu7ZI5fs42eZLKLtnSMgjJCfFnf92K0Vevhdg46kO_JCbGkquEnp0wYAnDsjSCfI484cQKxqTbhwnGpvNueR448oIZ3ABu76L1J9AVO0I7qoY7bzUEFgd5oZGFZ8M04TS9aos7BiMjke6mPuk9vHU4w22qSa8kX3nQ",
       "8365f73c-0617-4beb-8f3a-ce2fc6d0011b": "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5RGtVU21WTEZPeEpESHhldjM1emZGY0pjeTRhIiwiYXVkIjoiOURrVVNtVkxGT3hKREh4ZXYzNXpmRmNKY3k0YSIsImlzcyI6Ind3dy53c28yLmNvbSIsInR4biI6ImVmOTEyZjFkLTFiZTItNGUzZS04MjE0LWIzNTQ0ZjAxMzgyYiIsInRvZSI6MTY3OTQwODE0MzAwMCwiaWF0IjoxNjgxOTk2MjY0LCJqdGkiOiI4MzY1ZjczYy0wNjE3LTRiZWItOGYzYS1jZTJmYzZkMDAxMWIiLCJldmVudHMiOnsidXJuOnVrOm9yZzpvcGVuYmFua2luZzpldmVudHM6Y29uc2VudC1hdXRob3JpemF0aW9uLXJldm9rZWQiOnsicmVzb3VyY2VJRCI6IjZiNTc0Mzc5LWI0ZDEtNDZkNC04NGFiLTU5NDNlYWIyOTA0MSJ9LCJ1cm46dWs6b3JnOm9wZW5iYW5raW5nOmV2ZW50czpyZXNvdXJjZS11cGRhdGUiOnsicmVzb3VyY2VJRCI6IjZiNTc0Mzc5LWI0ZDEtNDZkNC04NGFiLTU5NDNlYWIyOTA0MSJ9fX0.Akq8xz5a6gBOh2rR074CGGuWA_JRnopBi7xxhenx221Ebl8zVDwUZ8MxLbiDLaEaRjB2wSHAlOqpFf680ds6EuGxUhEpYNj05-DOKpGtHZfl2gYleQkqaWndMWIZXvgN8ETqD3YHY9M9d2y_wmVi0YHviHmqkwBIKBjqpHtegjg6BbfOTZFreFyQskqT8R69gfEIQGwf60h7HeUwRAfXmUzbjgk3YorD2Xa9kQgjSBDMWzo8ldR4aHfATSfuwvqZD4cnDu930cekehqdaJZGKDvhGBhVU001qNzxDLTBoiEfsAyUFPEvhOOXrcjjo3OJ34xX8yOzvPFVtTf9E2VvbA",
       "758270e1-26e6-427d-a10d-8419858e8cb0": "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5RGtVU21WTEZPeEpESHhldjM1emZGY0pjeTRhIiwiYXVkIjoiOURrVVNtVkxGT3hKREh4ZXYzNXpmRmNKY3k0YSIsImlzcyI6Ind3dy53c28yLmNvbSIsInR4biI6IjZjYTBjMDk1LWJkMjItNDc0MC04MjE1LTQ1ZGUwZDk1MTViOCIsInRvZSI6MTY3OTM5MDA3NjAwMCwiaWF0IjoxNjgxOTk2MjY0LCJqdGkiOiI3NTgyNzBlMS0yNmU2LTQyN2QtYTEwZC04NDE5ODU4ZThjYjAiLCJldmVudHMiOnsidXJuOnVrOm9yZzpvcGVuYmFua2luZzpldmVudHM6Y29uc2VudC1hdXRob3JpemF0aW9uLXJldm9rZWQiOnsicmVzb3VyY2VJRCI6IjE0NGVlNDM1LWYyMzEtNGM5Yi04YThkLWFjODI1N2VjZjVkYSJ9LCJ1cm46dWs6b3JnOm9wZW5iYW5raW5nOmV2ZW50czpyZXNvdXJjZS11cGRhdGUiOnsicmVzb3VyY2VJRCI6IjE0NGVlNDM1LWYyMzEtNGM5Yi04YThkLWFjODI1N2VjZjVkYSJ9fX0.cpza7gJatiWisbrZvng7xWU0ijF7ZLU5IRD1eBsiCoV3qwXrTbATKlgaQNeNzwF-EPq0h2_Oj3C7ufGsD9oC8rmG4liGptmBhfB79AzzSIvbQ7cM25aHNXUj6A3glp9DjUye_M1DdUxawT_o-ywhsFMxAL1lxv_LMcytXboqi_eK1bCW6ffUz_P0UUSf1aTzm0TNdfyeQrmFuEupfgz0U4lQ_DWrVdWR73lJbABCN-9ko1ic0CuRLEtTGQmr-qyKE9EoO1iy7iYcSR9e91J-TjGcesPKtgwEveJTexcNZZM9a5QTHzC87sxaiOZ7dehWj7g3N73el2vF1-bS5rZq1g",
       "8ec3cb77-799f-45ca-8ba3-b1c3b563defe": "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5RGtVU21WTEZPeEpESHhldjM1emZGY0pjeTRhIiwiYXVkIjoiOURrVVNtVkxGT3hKREh4ZXYzNXpmRmNKY3k0YSIsImlzcyI6Ind3dy53c28yLmNvbSIsInR4biI6IjM1Yjk5YzI4LTUxYmUtNGNlYi1hMDUwLWY3YzU3YzVjNmQ4NSIsInRvZSI6MTY3OTM5MjIxMzAwMCwiaWF0IjoxNjgxOTk2MjY0LCJqdGkiOiI4ZWMzY2I3Ny03OTlmLTQ1Y2EtOGJhMy1iMWMzYjU2M2RlZmUiLCJldmVudHMiOnsidXJuOnVrOm9yZzpvcGVuYmFua2luZzpldmVudHM6Y29uc2VudC1hdXRob3JpemF0aW9uLXJldm9rZWQiOnsicmVzb3VyY2VJRCI6ImM5YWY3YWJkLWVlYjEtNGMwZS1hODNkLTBhMzU0OWFhMTYxMCJ9LCJ1cm46dWs6b3JnOm9wZW5iYW5raW5nOmV2ZW50czpyZXNvdXJjZS11cGRhdGUiOnsicmVzb3VyY2VJRCI6ImM5YWY3YWJkLWVlYjEtNGMwZS1hODNkLTBhMzU0OWFhMTYxMCJ9fX0.pRYBa9MgzDil5Z8T5Kuhpmc7ueTZWBK7OA9895Hds048qj3QUU21ZGfPy8h_1Tft3dIJtUXjs2gCkdkYulMi7zY2CmqaqyG9NiDHccM-YRUUhNvj9TmmWnGspVwBUQ3Ge1XxIttM9N8VrlDsvGpCD0OKpkLuvtGbcR8kPPczrAossZyP5R9J_wot6CeNU4Vh_sBKgSvqfG6013AeyTxIZiq4ufXj2uiz_t_vj8NEthPfsMIyV5aeInhaFrYaWdMzjg9AAXhPcafufTudQKzazpE466KKDevoqWO1SxlT6QhUJRgnUdVLSFh5m0PDQiCi2PUn28_t8MmJ2tLSqHpnrg",
       "74ef5a43-b68e-4422-8fe4-a616a11b37ee": "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5RGtVU21WTEZPeEpESHhldjM1emZGY0pjeTRhIiwiYXVkIjoiOURrVVNtVkxGT3hKREh4ZXYzNXpmRmNKY3k0YSIsImlzcyI6Ind3dy53c28yLmNvbSIsInR4biI6ImZhMDllMWIzLWFlZDAtNDlmMi1iOGVmLTYxMmVmZmE4MmYyMCIsInRvZSI6MTY3OTM3NjY3NTAwMCwiaWF0IjoxNjgxOTk2MjY0LCJqdGkiOiI3NGVmNWE0My1iNjhlLTQ0MjItOGZlNC1hNjE2YTExYjM3ZWUiLCJldmVudHMiOnsidXJuOnVrOm9yZzpvcGVuYmFua2luZzpldmVudHM6Y29uc2VudC1hdXRob3JpemF0aW9uLXJldm9rZWQiOnsicmVzb3VyY2VJRCI6IjE3MTM2ODQwLTk0ZGUtNDczYi05MTkxLWNjYTZhMjUzMDljNyJ9LCJ1cm46dWs6b3JnOm9wZW5iYW5raW5nOmV2ZW50czpyZXNvdXJjZS11cGRhdGUiOnsicmVzb3VyY2VJRCI6IjE3MTM2ODQwLTk0ZGUtNDczYi05MTkxLWNjYTZhMjUzMDljNyJ9fX0.VQhKx8QyySegptWU07c2LA0LevjNxdQ3oaoqZk9ZCjL1ILoAwXwXf_lPT77Ck2_GFTsMEsVNAla0XvRlAhrCf4IL0tupQf3iEwwBDP-YRHIjxTjI65fEaeXu1kwFlD5qxNYEST4Ayf5w1us-0h_z4hlHv64rKSmE_QN6aM1UZnsE8JPIYdKJEZc_rxxwUiMZCWgA4lcoltJEXDeNVLyVgMno-4FLWy4zGNP1VLV0JQFC7SQ9AxztUpU5CzYtC_OQ_IW5FVPZZfq1aGTS400FaGUaJRx_NoJrbIQtf1LsK5TQ-Zz9yGqOemX0OA59Ljwc5eTb5E6bF9ZVpsw17vGScw"
   }
}
```

Using the following type of payload you can only set error (negative acknowledgement):

```
{
  "setErrs": {
    "6e65eacc-204e-4379-97ac-ae6d5228d7b5": {
      "err": "authentication_failed",
      "description": "The SET could not be authenticated"
    }
  },
  "returnImmediately": true,
  "maxEvents": 0
}
```

Sample Response:

```
{
   "moreAvailable": true,
   "sets": {}
}
```

Using the following type of payload, you can poll for more events and acknowledge polled events by providing the event notification
IDs that need to be acknowledged:

```
{
   "ack": ["8241e34a-adf5-48c3-bb90-4b86abc2d876", "8365f73c-0617-4beb-8f3a-ce2fc6d0011b"],
   "maxEvents": 2
}
```

Sample Response:

```
{
   "moreAvailable": true,
   "sets": {
       "758270e1-26e6-427d-a10d-8419858e8cb0": "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5RGtVU21WTEZPeEpESHhldjM1emZGY0pjeTRhIiwiYXVkIjoiOURrVVNtVkxGT3hKREh4ZXYzNXpmRmNKY3k0YSIsImlzcyI6Ind3dy53c28yLmNvbSIsInR4biI6IjI5ZjY2NWJlLTJlZWUtNDE4ZC05ZmZhLTI1MzVjNGE4MDY2ZCIsInRvZSI6MTY3OTM5MDA3NjAwMCwiaWF0IjoxNjgxOTk2NjYwLCJqdGkiOiI3NTgyNzBlMS0yNmU2LTQyN2QtYTEwZC04NDE5ODU4ZThjYjAiLCJldmVudHMiOnsidXJuOnVrOm9yZzpvcGVuYmFua2luZzpldmVudHM6Y29uc2VudC1hdXRob3JpemF0aW9uLXJldm9rZWQiOnsicmVzb3VyY2VJRCI6IjE0NGVlNDM1LWYyMzEtNGM5Yi04YThkLWFjODI1N2VjZjVkYSJ9LCJ1cm46dWs6b3JnOm9wZW5iYW5raW5nOmV2ZW50czpyZXNvdXJjZS11cGRhdGUiOnsicmVzb3VyY2VJRCI6IjE0NGVlNDM1LWYyMzEtNGM5Yi04YThkLWFjODI1N2VjZjVkYSJ9fX0.K85AC5Cq507_aM0KqigTmf8ZLtbH1rDHnoaFbfEA8dujrKfBlJfw-b-Wp8hFnzQPx8iieu0LfcN4QOQ6qEOyxg0_2dPV-oxQYI7QsHkKNze-rWdkQ_rUpvfBfe0n34lQqslH6iIbfGXRRbYZmd2Ps1ousWslBtj-xNy-wUoi4MQRrrxyVxPB2IGbyThEk0aumvhAn9IBngbZjufyNHZ6Yi2TL83WPohbVpNAK4XBJLclvSB-WC6Z2FSbA5oDq-dEJKVpBKbCMxMw8fqUeKkAZ74YZ1H31XULwSsWnpZ8lwgTr29_qmxaeeefIC5tKTEV-qY-wG9orYanb14U2igOiA",
       "74ef5a43-b68e-4422-8fe4-a616a11b37ee": "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5RGtVU21WTEZPeEpESHhldjM1emZGY0pjeTRhIiwiYXVkIjoiOURrVVNtVkxGT3hKREh4ZXYzNXpmRmNKY3k0YSIsImlzcyI6Ind3dy53c28yLmNvbSIsInR4biI6ImNhMDQwOTU0LWIyZjgtNDU3OS1iZWYxLWY4MmZkYjhjOWIwMyIsInRvZSI6MTY3OTM3NjY3NTAwMCwiaWF0IjoxNjgxOTk2NjYwLCJqdGkiOiI3NGVmNWE0My1iNjhlLTQ0MjItOGZlNC1hNjE2YTExYjM3ZWUiLCJldmVudHMiOnsidXJuOnVrOm9yZzpvcGVuYmFua2luZzpldmVudHM6Y29uc2VudC1hdXRob3JpemF0aW9uLXJldm9rZWQiOnsicmVzb3VyY2VJRCI6IjE3MTM2ODQwLTk0ZGUtNDczYi05MTkxLWNjYTZhMjUzMDljNyJ9LCJ1cm46dWs6b3JnOm9wZW5iYW5raW5nOmV2ZW50czpyZXNvdXJjZS11cGRhdGUiOnsicmVzb3VyY2VJRCI6IjE3MTM2ODQwLTk0ZGUtNDczYi05MTkxLWNjYTZhMjUzMDljNyJ9fX0.xbeaIzl8OAv9o9UA36OZsoS3MWzytQpDKUPm36xuhMiBJuupW-vLqSMdb1BvOOGGbQWIKj9tbovb_ndUgqOMXHAsPWYog8WgHEjZmZify7M_-dWoe6mlm6g2EGJNWmHoK9fXf-fJPhkZty6R919AtWeI4KEyo06avrQm6TWTfM-wTJKg6jBXVkz69_ya1mjjkNw87f0oARoWcbZb322gjbjJmi8beJCUTE6k90ykxgA6_4ov9cA4COW_3x3WrN0lRKcITRyISxKH-zLutfWaanllBxIuF3YA04KY48iUHnyO3noER07X6X_Ct3xby6lHGro7rWdtxdv8Z1CE4l8_Ow"
   }
}
```

You can use the following payload to acknowledge the received events (both positive and negative acknowledgements) while accepting more events:

```
{
  "ack":[
     "1256db1c-8fda-4457-a755-bb5113dba717"
  ],
  "setErrs":{
     "65ac7453-13b0-4d2f-9946-dff6e6089a4f":{
        "err":"authentication_failed",
        "description":"The SET could not be authenticated"
     }
  },
  "returnImmediately":true
}
```