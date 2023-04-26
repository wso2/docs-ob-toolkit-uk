This document provides step by step instructions to deploy, subscribe, and invoke the Event Notifications Aggregated Polling API.

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

### Generating application access token

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