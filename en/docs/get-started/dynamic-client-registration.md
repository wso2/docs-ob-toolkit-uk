This page explains how to onboard TPP applications using the Dynamic Client Registration API. 

!!! tip "Before you begin..."

    1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

    2. Configure the jwks endpoints as follows. These endpoints are used for validating the SSA signature. 

        ```toml
        [open_banking.dcr]
        jwks_url_sandbox = "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/sgsMuc8ACBgBzinpr8oJ8B.jwks"
        jwks_url_production = "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/sgsMuc8ACBgBzinpr8oJ8B.jwks"
        ```

    3. Restart the Identity Server.

### Step 1: Deploy the Dynamic Client Registration(DCR) API

1. Sign in to the API Publisher Portal at [https://localhost:9443/publisher](https://localhost:9443/publisher) with `creator/publisher` 
privileges. You can use the credentials for `mark@gold.com`. ![sign_in](../assets/img/get-started/quick-start-guide/sign-in.png)

2. In the homepage, go to **REST API** and select **Import Open API**. ![let's_get_started](../assets/img/get-started/quick-start-guide/lets-get-started.png)

3. Select **OpenAPI File/Archive**. ![create-an-api](../assets/img/get-started/quick-start-guide/create-an-api.png)

4. Click **Browse File to Upload** and select the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/
openbanking.org.uk/DynamicClientRegistration/3.3.0/dynamic-client-registration-swagger.yaml` file.

5. Click **Next**.

6. Click **Create** to create the API. ![create-dcr-api](../assets/img/get-started/quick-start-guide/create-dcr.png)

7. After the API is successfully created, go to **Portal Configurations** using the left menu panel. ![portal-configurations](../assets/img/get-started/quick-start-guide/portal-configurations.png)

8. Select **Subscriptions** from the left menu pane and set the business plan to **Unlimited: Allows unlimited requests**. ![business-plan](../assets/img/get-started/quick-start-guide/business-plan.png)

9. Click **Save**.

10. Once you get the message that the API is successfully updated, use the left menu panel and select **API Configurations > Runtime**. 

    ![select_runtime](../assets/img/get-started/quick-start-guide/select-runtime.png)
    
11. Click the **Edit** button under **Request > Message Mediation**. ![edit_message_mediation](../assets/img/get-started/quick-start-guide/edit-message-mediation.png)

12. Now, select the **Custom Policy** option.

13. Upload the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/openbanking.org.uk/DynamicClientRegistration/3.3.0/dcr-dynamic-endpoint-insequence-3.3.0.xml` file. ![dcr_insequence](../assets/img/get-started/quick-start-guide/dcr-insequence.png)
 
14. Click **Select**. 

15. Scroll down and click **SAVE**.

16. Use the left menu panel and go to **API Configurations > Endpoints**. ![select_endpoints](../assets/img/get-started/quick-start-guide/select-endpoints.png)

17. Add a **Dynamic Endpoint**. ![add_dynamic_endpoint](../assets/img/get-started/quick-start-guide/add_dynamic_endpoint.png)

18. Go to **Deployments** using the left menu pane. 

    ![select_deployments](../assets/img/get-started/quick-start-guide/select-deployments.png)

19. Select the API Gateway type, in this scenario, it is **Default**. ![api_gateway](../assets/img/get-started/quick-start-guide/dcr-api-gateway.png)

20. Click **Deploy**.

21. Go to **Overview** using the left menu pane. 

    ![select_overview](../assets/img/get-started/quick-start-guide/select-overview.png)

22. Click **Publish**. ![publish_api](../assets/img/get-started/quick-start-guide/publish-api.png)

23. The deployed API is now available in the Developer Portal at <https://localhost:9443/devportal>.

24. Upload the root and issuer certificates in OBIE ([Sandbox certificates](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/252018873/OB+Root+and+Issuing+Certificates+for+Sandbox)/
    [Production certificates](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/80544075/OB+Root+and+Issuing+Certificates+for+Production))
    to the client trust stores in `<APIM_HOME>/repository/resources/security/client-truststore.jks` and 
    `<IS_HOME>/repository/resources/security/client-truststore.jks` using the following command:
    
    ```
    keytool -import -alias <alias> -file <certificate_location> -storetype JKS -keystore <truststore_location> -storepass wso2carbon
    ```
                
25. Restart the Identity Server and API Manager instances.

## Step 2: Configure IS as Key Manager

 1. Sign in to the Admin Portal of API Manager at `https://<APIM_HOST>:9443/admin`.
 2. Go to **Key Manager** on the left main menu. ![add_Key_Manager](../assets/img/get-started/quick-start-guide/add_Key_Manager.png)
 3. Click **Add New Key Manager** and configure Key Manager. 
    
    ??? tip "Click here to see the full list of configurations..."
        | Configuration       | Description                           | Value                    |
        | -------------       |-------------                          | -----                    |
        | Name                | The name of the authorization server. | OBKM                     |
        | Display Name        | A name to display on the UI.          | OBKM                     |
        | Description         | The name of the authorization server. | (Optional)               |
        | Key Manager Type    | The type of the Key Manager to be selected. | Select `ObKeyManager` |
        |Well-known-url      | The well-known URL of the authorization server (Key Manager).|   `https://<IS_HOST>:9446/oauth2/token/.well-known/openid-configuration` |
        | Issuer              | The issuer that consumes or validates access tokens.         | `https://<IS_HOST>:9446/oauth2/token` |
        |**Key Manager Endpoints**                                                                |
        | Client Registration Endpoint | The endpoint that verifies the identity and obtain profile information of the end-user based on the authentication performed by an authorization server.  |  `https://<IS_HOST>:9446/keymanager-operations/dcr/register`| 
        | Introspection Endpoint | The endpoint that allows authorized protected resources to query the authorization server to determine the set of metadata for a given token that was presented to them by an OAuth Client. | `https://<IS_HOST>:9446/oauth2/introspect` |
        | Token Endpoint      | The endpoint that issues the access tokens. | `https://<IS_HOST>:9446/oauth2/token` |
        | Revoke Endpoint     | The endpoint that revokes the access tokens.| `https://<IS_HOST>:9446/oauth2/revoke` |
        | Userinfo Endpoint   | The endpoint that allows clients to verify the identity of the end-user based on the authentication performed by an authorization server, as well as to obtain basic profile information about the end-user. | `https://<IS_HOST>:9446/oauth2/userinfo?schema=openid` |
        | Authorize Endpoint  | The endpoint used to obtain an authorization grant from the resource owner via the user-agent redirection. | `https://<IS_HOST>:9446/oauth2/authorize` |
        | Scope Management Endpoint | The endpoint used to manage the scopes. | `https://<IS_HOST>:9446/api/identity/oauth2/v1.0/scopes` |
        | **Connector Configurations**                        |
        | Username            | The username of an admin user who is authorized to connect to the authorization server. |  |
        | Password            | The password corresponding to the latter mentioned admin user who is authorized to connect to the authorization server. | |
        | **Claim URIs**      |   
        | Consumer Key Claim URI | The claim URI for the consumer key.  | (Optional)  |
        | Scopes Claim URI | The claim URI for the scopes | (Optional) | 
        | Grant Types | The supported grant types. According to your open banking specification, add multiple grant types by adding a grant type press Enter. Add the `client_credentials`, `authorization_code`, `refresh_token`, and `urn:ietf:params:oauth:grant-type:jwt-bearer` grant types. | (Mandatory) |
        | **Certificates** | 
        | PEM | Either copy and paste the certificate in PEM format or upload the PEM file. | (Optional) |
        | JWKS | The JSON Web Key Set (JWKS) endpoint is a read-only endpoint. This URL returns the Identity Server's public key set in JSON web key set format. This contains the signing key(s) the Relying Party (RP) uses to validate signatures from the Identity Server. | `https://<IS_HOST>:9446/oauth2/jwks` |
        | **Advanced Configurations** |
        | Token Generation | This enables token generation via the authorization server. | (Mandatory) |
        | Out Of Band Provisioning | This enables the provisioning of Auth clients that have been created without the use of the Developer Portal, such as previously created Auth clients. | (Mandatory) |
        | Oauth App Creation | This enables the creation of Auth clients. | (Mandatory) |
        | **Token Validation Method** | The method used to validate the JWT signature. |
        | Self Validate JWT | The kid value is used to validate the JWT token signature. If the kid value is not present, `gateway_certificate_alias` will be used. | (Mandatory) |
        | Use introspect | The JWKS endpoint is used to validate the JWT token signature. | - |
        | **Token Handling Options** | This provides a way to validate the token for this particular authorization server. This is mandatory if the Token Validation Method is introspect.| (Optional) |
        | REFERENCE | The tokens that match a specific regular expression (regEx) are validated. e.g., <code>[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}</code> | (Optional) |
        | JWT | The tokens that match a specific JWT are validated. | Select this icon |
        | CUSTOM | The tokens that match a custom pattern are validated. | (Optional) |
        | **Claim Mappings** | Local and remote claim mapping. | (Optional) |
    

3. Go to the list of Key Managers and select **Resident Key Manager**. ![select_resident_KM](../assets/img/get-started/quick-start-guide/select_resident_KM.png)

4. Locate **Connector Configurations** and provide a username and a password for a user with super admin credentials.

5. Click **Update**.

6. Disable the Resident Key Manager. ![disable_resident_KM](../assets/img/get-started/quick-start-guide/disable_resident_KM.png)

## Step 3: Register an application

TPPs use the DCR API to request the ASPSP to register a new client. 

The registration request is a POST request that includes a Software Statement Assertion (SSA) as a claim in the payload. 
This SSA contains client metadata. It is a signed JWT issued by the Open Banking directory and the TPPs need to obtain it before registering with an ASPSP.

This section explains the client registration process. A sample request is as follows:

For the Transport Layer Security purposes in this sample flow, you can use the attached 
[private key](../../assets/attachments/transport-certs/obtransport.key) and
[public certificate](../../assets/attachments/transport-certs/obtransport.pem). <br/>

   ```  
   curl -X POST https://<APIM_HOST>:8243/open-banking/v3.3.0/register \
   -H 'Content-Type: application/jwt; charset=ISO-8859-1' \ 
   --cert <TRANSPORT_PUBLIC_CERT_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH> \
   -d 'eyJ0eXAiOiJKV1QiLCJraWQiOiJHcWhLVlRBTm5MTVlwR0dmQXRKMU5oZGtnanciLCJhbGciOiJQUzI1NiJ9.eyJpc3MiOiJzZ3NNdWM4QUNCZ0J6aW5wcjhvSjhCIiwiaWF0IjoxNjQzMDkwODE1LCJleHAiOjE2NDMwOTQ0MTUsImp0aSI6IjE2NDMwOTA4MTUyNzMiLCJhdWQiOiJodHRwczovL2xvY2FsYmFuay5jb20iLCJzY29wZSI6ImFjY291bnRzIHBheW1lbnRzIiwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2QiOiJwcml2YXRlX2tleV9qd3QiLCJ0b2tlbl9lbmRwb2ludF9hdXRoX3NpZ25pbmdfYWxnIjoiUFMyNTYiLCJncmFudF90eXBlcyI6WyJhdXRob3JpemF0aW9uX2NvZGUiLCJjbGllbnRfY3JlZGVudGlhbHMiLCJyZWZyZXNoX3Rva2VuIl0sInJlc3BvbnNlX3R5cGVzIjpbImNvZGUgaWRfdG9rZW4iXSwiaWRfdG9rZW5fc2lnbmVkX3Jlc3BvbnNlX2FsZyI6IlBTMjU2IiwicmVxdWVzdF9vYmplY3Rfc2lnbmluZ19hbGciOiJQUzI1NiIsImFwcGxpY2F0aW9uX3R5cGUiOiJ3ZWIiLCJzb2Z0d2FyZV9pZCI6InNnc011YzhBQ0JnQnppbnByOG9KOEIiLCJyZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vd3NvMi5jb20iXSwic29mdHdhcmVfc3RhdGVtZW50IjoiZXlKaGJHY2lPaUpRVXpJMU5pSXNJbXRwWkNJNkluaG1VMnMzTjNOWFRIazJhR05SWW1WUk1VbDRXbXhGZUZaT1gwOVFlVGhCYUc1WldtMW9UWGhUTjBrOUlpd2lkSGx3SWpvaVNsZFVJbjAuZXlKcGMzTWlPaUpQY0dWdVFtRnVhMmx1WnlCTWRHUWlMQ0pwWVhRaU9qRTJNekV3T0RNMU5UVXNJbXAwYVNJNklqZG1ZMlJsWTJFellXSmhNVFF4TnpJaUxDSnpiMlowZDJGeVpWOWxiblpwY205dWJXVnVkQ0k2SW5OaGJtUmliM2dpTENKemIyWjBkMkZ5WlY5dGIyUmxJam9pVkdWemRDSXNJbk52Wm5SM1lYSmxYMmxrSWpvaWRUTmFWMnhtT1ZsME5ESmtlVnBuU1haNmEzWnhZaUlzSW5OdlpuUjNZWEpsWDJOc2FXVnVkRjlwWkNJNkluVXpXbGRzWmpsWmREUXlaSGxhWjBsMmVtdDJjV0lpTENKemIyWjBkMkZ5WlY5amJHbGxiblJmYm1GdFpTSTZJbGRUVHpJZ1QzQmxiaUJDWVc1cmFXNW5JRlJRVURFZ0tGTmhibVJpYjNncElpd2ljMjltZEhkaGNtVmZZMnhwWlc1MFgyUmxjMk55YVhCMGFXOXVJam9pVjFOUE1pQlBjR1Z1SUVKaGJtdHBibWNpTENKemIyWjBkMkZ5WlY5MlpYSnphVzl1SWpveExqVXNJbk52Wm5SM1lYSmxYMk5zYVdWdWRGOTFjbWtpT2lKb2RIUndjem92TDNkemJ6SXVZMjl0SWl3aWMyOW1kSGRoY21WZmNtVmthWEpsWTNSZmRYSnBjeUk2V3lKb2RIUndjem92TDNkemJ6SXVZMjl0SWwwc0luTnZablIzWVhKbFgzSnZiR1Z6SWpwYklsQkpVMUFpTENKQlNWTlFJaXdpUTBKUVNVa2lYU3dpYjNKbllXNXBjMkYwYVc5dVgyTnZiWEJsZEdWdWRGOWhkWFJvYjNKcGRIbGZZMnhoYVcxeklqcDdJbUYxZEdodmNtbDBlVjlwWkNJNklrOUNSMEpTSWl3aWNtVm5hWE4wY21GMGFXOXVYMmxrSWpvaVZXNXJibTkzYmpBd01UVTRNREF3TURGSVVWRnlXa0ZCV0NJc0luTjBZWFIxY3lJNklrRmpkR2wyWlNJc0ltRjFkR2h2Y21sellYUnBiMjV6SWpwYmV5SnRaVzFpWlhKZmMzUmhkR1VpT2lKSFFpSXNJbkp2YkdWeklqcGJJbEJKVTFBaUxDSkJTVk5RSWl3aVEwSlFTVWtpWFgwc2V5SnRaVzFpWlhKZmMzUmhkR1VpT2lKSlJTSXNJbkp2YkdWeklqcGJJbEJKVTFBaUxDSkRRbEJKU1NJc0lrRkpVMUFpWFgwc2V5SnRaVzFpWlhKZmMzUmhkR1VpT2lKT1RDSXNJbkp2YkdWeklqcGJJbEJKVTFBaUxDSkJTVk5RSWl3aVEwSlFTVWtpWFgxZGZTd2ljMjltZEhkaGNtVmZiRzluYjE5MWNta2lPaUpvZEhSd2N6b3ZMM2R6YnpJdVkyOXRMM2R6YnpJdWFuQm5JaXdpYjNKblgzTjBZWFIxY3lJNklrRmpkR2wyWlNJc0ltOXlaMTlwWkNJNklqQXdNVFU0TURBd01ERklVVkZ5V2tGQldDSXNJbTl5WjE5dVlXMWxJam9pVjFOUE1pQW9WVXNwSUV4SlRVbFVSVVFpTENKdmNtZGZZMjl1ZEdGamRITWlPbHQ3SW01aGJXVWlPaUpVWldOb2JtbGpZV3dpTENKbGJXRnBiQ0k2SW5OaFkyaHBibWx6UUhkemJ6SXVZMjl0SWl3aWNHaHZibVVpT2lJck9UUTNOelF5TnpRek56UWlMQ0owZVhCbElqb2lWR1ZqYUc1cFkyRnNJbjBzZXlKdVlXMWxJam9pUW5WemFXNWxjM01pTENKbGJXRnBiQ0k2SW5OaFkyaHBibWx6UUhkemJ6SXVZMjl0SWl3aWNHaHZibVVpT2lJck9UUTNOelF5TnpRek56UWlMQ0owZVhCbElqb2lRblZ6YVc1bGMzTWlmVjBzSW05eVoxOXFkMnR6WDJWdVpIQnZhVzUwSWpvaWFIUjBjSE02THk5clpYbHpkRzl5WlM1dmNHVnVZbUZ1YTJsdVozUmxjM1F1YjNKbkxuVnJMekF3TVRVNE1EQXdNREZJVVZGeVdrRkJXQzh3TURFMU9EQXdNREF4U0ZGUmNscEJRVmd1YW5kcmN5SXNJbTl5WjE5cWQydHpYM0psZG05clpXUmZaVzVrY0c5cGJuUWlPaUpvZEhSd2N6b3ZMMnRsZVhOMGIzSmxMbTl3Wlc1aVlXNXJhVzVuZEdWemRDNXZjbWN1ZFdzdk1EQXhOVGd3TURBd01VaFJVWEphUVVGWUwzSmxkbTlyWldRdk1EQXhOVGd3TURBd01VaFJVWEphUVVGWUxtcDNhM01pTENKemIyWjBkMkZ5WlY5cWQydHpYMlZ1WkhCdmFXNTBJam9pYUhSMGNITTZMeTlyWlhsemRHOXlaUzV2Y0dWdVltRnVhMmx1WjNSbGMzUXViM0puTG5Wckx6QXdNVFU0TURBd01ERklVVkZ5V2tGQldDOTFNMXBYYkdZNVdYUTBNbVI1V21kSmRucHJkbkZpTG1wM2EzTWlMQ0p6YjJaMGQyRnlaVjlxZDJ0elgzSmxkbTlyWldSZlpXNWtjRzlwYm5RaU9pSm9kSFJ3Y3pvdkwydGxlWE4wYjNKbExtOXdaVzVpWVc1cmFXNW5kR1Z6ZEM1dmNtY3VkV3N2TURBeE5UZ3dNREF3TVVoUlVYSmFRVUZZTDNKbGRtOXJaV1F2ZFROYVYyeG1PVmwwTkRKa2VWcG5TWFo2YTNaeFlpNXFkMnR6SWl3aWMyOW1kSGRoY21WZmNHOXNhV041WDNWeWFTSTZJbWgwZEhCek9pOHZkM052TWk1amIyMGlMQ0p6YjJaMGQyRnlaVjkwYjNOZmRYSnBJam9pYUhSMGNITTZMeTkzYzI4eUxtTnZiU0lzSW5OdlpuUjNZWEpsWDI5dVgySmxhR0ZzWmw5dlpsOXZjbWNpT2lKWFUwOHlJRTl3Wlc0Z1FtRnVhMmx1WnlKOS5TcndLUzd0OUc0enRNaUhhRTRnMnRndS16SkVzSGk3T1lNNTUycC00OTZMcGV5ZERRc0R0U05WR2JrZ210T21LVmJFNHB5eDhHV294RWFiQnIzXy1IS0VMbGVDdGJSNkdtVU1pX1NpYzlxTmtKRlVfa1VaeFc0d2tRNGdOcHAwaEswY1ZlSWZnSmxydWlnRmpGdXJXd1h6R0lXdG1Oc29lam83VURBNzFXdTF6akJiN1dacTJXSGxUQm5aSGdubHZPTmczMHhpVXJ5VzZVckdHT0lxZGZiU1ByVU5mYXpOVkVhYk8tdGNVVGpqX3BpZXJ1MkJmakJxZGtEaktiZVVwVkpsNDlVSzVlMFFGNTVOVFplLXFCYXhzYVIwM0dvS0Jqa093WGF1NEpHWW5GTF83ZGdDbjVmc2JNdWQ5ZXppQkQtaE9kQjVyTFFMTWw1Y1N1aW85OGd9In0.DhQNH8KA-kz35GWzsR1Ika3ZOxH0myLPUmpaepAxx6PgSbMnaRBUOjTAjNTl35kJDD6mSiSH8l9bisafUz4P95Q4tfhJCdTeeb4tJGWBHkkRgmscP_CbuRX3Y1CwB_cFxAO80Lggkdyi1mlgSfkLovokUkC7xHUjUmu_J4Dryj4CLo2Jeu3zsFzzLmFfkk1m6MID7i8XroUVtIzDs5dpqhH_6S9JklgKYsCmoKzF_bnVQ1trDAOesKHFpHlqO-4obS_9CF7RMeAn0IspOaDkwH4oBERYtLurD9d4_8omA57LjmFfC9t5Gj-1vkJQWUww_7FLXM0EOgFRPYBGoHawkg' 
   ```

- The payload is a signed JWT in the following format:
``` json
{
      "typ": "JWT",
      "kid": "GqhKVTANnLMYpGGfAtJ1Nhdkgjw",
      "alg": "PS256"
}
{
      "iss": "sgsMuc8ACBgBzinpr8oJ8B",
      "iat": 1643090815,
      "exp": 1643094415,
      "jti": "1643090815273",
      "aud": "https://localbank.com",
      "scope": "accounts payments",
      "token_endpoint_auth_method": "private_key_jwt",
      "token_endpoint_auth_signing_alg": "PS256",
      "grant_types": [
        "authorization_code",
        "client_credentials",
        "refresh_token"
      ],
      "response_types": [
        "code id_token"
      ],
      "id_token_signed_response_alg": "PS256",
      "request_object_signing_alg": "PS256",
      "application_type": "web",
      "software_id": "sgsMuc8ACBgBzinpr8oJ8B",
      "redirect_uris": [
        "https://wso2.com"
      ],
      "software_statement": "eyJhbGciOiJQUzI1NiIsImtpZCI6InhmU2s3N3NXTHk2aGNRYmVRMUl4WmxFeFZOX09QeThBaG5ZWm1oTXhTN0k9IiwidHlwIjoiSldUIn0.eyJpc3MiOiJPcGVuQmFua2luZyBMdGQiLCJpYXQiOjE2MzEwODM1NTUsImp0aSI6IjdmY2RlY2EzYWJhMTQxNzIiLCJzb2Z0d2FyZV9lbnZpcm9ubWVudCI6InNhbmRib3giLCJzb2Z0d2FyZV9tb2RlIjoiVGVzdCIsInNvZnR3YXJlX2lkIjoidTNaV2xmOVl0NDJkeVpnSXZ6a3ZxYiIsInNvZnR3YXJlX2NsaWVudF9pZCI6InUzWldsZjlZdDQyZHlaZ0l2emt2cWIiLCJzb2Z0d2FyZV9jbGllbnRfbmFtZSI6IldTTzIgT3BlbiBCYW5raW5nIFRQUDEgKFNhbmRib3gpIiwic29mdHdhcmVfY2xpZW50X2Rlc2NyaXB0aW9uIjoiV1NPMiBPcGVuIEJhbmtpbmciLCJzb2Z0d2FyZV92ZXJzaW9uIjoxLjUsInNvZnR3YXJlX2NsaWVudF91cmkiOiJodHRwczovL3dzbzIuY29tIiwic29mdHdhcmVfcmVkaXJlY3RfdXJpcyI6WyJodHRwczovL3dzbzIuY29tIl0sInNvZnR3YXJlX3JvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXSwib3JnYW5pc2F0aW9uX2NvbXBldGVudF9hdXRob3JpdHlfY2xhaW1zIjp7ImF1dGhvcml0eV9pZCI6Ik9CR0JSIiwicmVnaXN0cmF0aW9uX2lkIjoiVW5rbm93bjAwMTU4MDAwMDFIUVFyWkFBWCIsInN0YXR1cyI6IkFjdGl2ZSIsImF1dGhvcmlzYXRpb25zIjpbeyJtZW1iZXJfc3RhdGUiOiJHQiIsInJvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXX0seyJtZW1iZXJfc3RhdGUiOiJJRSIsInJvbGVzIjpbIlBJU1AiLCJDQlBJSSIsIkFJU1AiXX0seyJtZW1iZXJfc3RhdGUiOiJOTCIsInJvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXX1dfSwic29mdHdhcmVfbG9nb191cmkiOiJodHRwczovL3dzbzIuY29tL3dzbzIuanBnIiwib3JnX3N0YXR1cyI6IkFjdGl2ZSIsIm9yZ19pZCI6IjAwMTU4MDAwMDFIUVFyWkFBWCIsIm9yZ19uYW1lIjoiV1NPMiAoVUspIExJTUlURUQiLCJvcmdfY29udGFjdHMiOlt7Im5hbWUiOiJUZWNobmljYWwiLCJlbWFpbCI6InNhY2hpbmlzQHdzbzIuY29tIiwicGhvbmUiOiIrOTQ3NzQyNzQzNzQiLCJ0eXBlIjoiVGVjaG5pY2FsIn0seyJuYW1lIjoiQnVzaW5lc3MiLCJlbWFpbCI6InNhY2hpbmlzQHdzbzIuY29tIiwicGhvbmUiOiIrOTQ3NzQyNzQzNzQiLCJ0eXBlIjoiQnVzaW5lc3MifV0sIm9yZ19qd2tzX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC8wMDE1ODAwMDAxSFFRclpBQVguandrcyIsIm9yZ19qd2tzX3Jldm9rZWRfZW5kcG9pbnQiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMUhRUXJaQUFYL3Jldm9rZWQvMDAxNTgwMDAwMUhRUXJaQUFYLmp3a3MiLCJzb2Z0d2FyZV9qd2tzX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC91M1pXbGY5WXQ0MmR5WmdJdnprdnFiLmp3a3MiLCJzb2Z0d2FyZV9qd2tzX3Jldm9rZWRfZW5kcG9pbnQiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMUhRUXJaQUFYL3Jldm9rZWQvdTNaV2xmOVl0NDJkeVpnSXZ6a3ZxYi5qd2tzIiwic29mdHdhcmVfcG9saWN5X3VyaSI6Imh0dHBzOi8vd3NvMi5jb20iLCJzb2Z0d2FyZV90b3NfdXJpIjoiaHR0cHM6Ly93c28yLmNvbSIsInNvZnR3YXJlX29uX2JlaGFsZl9vZl9vcmciOiJXU08yIE9wZW4gQmFua2luZyJ9.SrwKS7t9G4ztMiHaE4g2tgu-zJEsHi7OYM552p-496LpeydDQsDtSNVGbkgmtOmKVbE4pyx8GWoxEabBr3_-HKELleCtbR6GmUMi_Sic9qNkJFU_kUZxW4wkQ4gNpp0hK0cVeIfgJlruigFjFurWwXzGIWtmNsoejo7UDA71Wu1zjBb7WZq2WHlTBnZHgnlvONg30xiUryW6UrGGOIqdfbSPrUNfazNVEabO-tcUTjj_pieru2BfjBqdkDjKbeUpVJl49UK5e0QF55NTZe-qBaxsaR03GoKBjkOwXau4JGYnFL_7dgCn5fsbMud9eziBD-hOdB5rLQLMl5cSuio98g}"
}
<signature>
```

!!! note 
    If you change the payload, use the following certificates to sign the JWT and SSA:
    
    - [signing certificate](../../assets/attachments/signing-certs/obsigning.pem)
    - [private keys](../../assets/attachments/signing-certs/obsigning.key)

- The bank registers the application using the metadata sent in the SSA.

- If an application is successfully created, the bank responds with a JSON payload describing the application that was created. 
The TPP can then use the identifier (`Client ID`) to access customers' financial data on the bank's resource server. A sample response is 
given below:

```
{
   "token_endpoint_auth_signing_alg":"PS256",
   "client_id":"XDdXQASk8ZNB7fZxdqvT8uwAfr4a",
   "client_id_issued_at":"1643090821",
   "redirect_uris":[
      "https://wso2.com"
   ],
   "grant_types":[
      "authorization_code",
      "client_credentials",
      "refresh_token"
   ],
   "response_types":[
      "code id_token"
   ],
   "application_type":"web",
   "id_token_signed_response_alg":"PS256",
   "request_object_signing_alg":"PS256",
   "scope":"accounts payments",
   "software_id":"sgsMuc8ACBgBzinpr8oJ8B",
   "token_endpoint_auth_method":"private_key_jwt",
   "software_statement":"eyJhbGciOiJQUzI1NiIsImtpZCI6IjJNSTlYU0tpNmRkeENiV2cycmhETnRVbHhKYyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJPcGVuQmFua2luZyBMdGQiLCJpYXQiOjE2MTI4NjE3NzEsImp0aSI6ImVjNGJkNmM1ZmIzNTQwN2EiLCJzb2Z0d2FyZV9lbnZpcm9ubWVudCI6InNhbmRib3giLCJzb2Z0d2FyZV9tb2RlIjoiVGVzdCIsInNvZnR3YXJlX2lkIjoic2dzTXVjOEFDQmdCemlucHI4b0o4QiIsInNvZnR3YXJlX2NsaWVudF9pZCI6InNnc011YzhBQ0JnQnppbnByOG9KOEIiLCJzb2Z0d2FyZV9jbGllbnRfbmFtZSI6IldTTzIgT3BlbiBCYW5raW5nIFRQUCAoU2FuZGJveCkiLCJzb2Z0d2FyZV9jbGllbnRfZGVzY3JpcHRpb24iOiJXU08yIE9wZW4gQmFua2luZyIsInNvZnR3YXJlX3ZlcnNpb24iOjEuNSwic29mdHdhcmVfY2xpZW50X3VyaSI6Imh0dHBzOi8vd3NvMi5jb20iLCJzb2Z0d2FyZV9yZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vd3NvMi5jb20iXSwic29mdHdhcmVfcm9sZXMiOlsiQUlTUCIsIlBJU1AiLCJDQlBJSSJdLCJvcmdhbmlzYXRpb25fY29tcGV0ZW50X2F1dGhvcml0eV9jbGFpbXMiOnsiYXV0aG9yaXR5X2lkIjoiT0JHQlIiLCJyZWdpc3RyYXRpb25faWQiOiJVbmtub3duMDAxNTgwMDAwMUhRUXJaQUFYIiwic3RhdHVzIjoiQWN0aXZlIiwiYXV0aG9yaXNhdGlvbnMiOlt7Im1lbWJlcl9zdGF0ZSI6IkdCIiwicm9sZXMiOlsiQUlTUCIsIlBJU1AiLCJDQlBJSSJdfSx7Im1lbWJlcl9zdGF0ZSI6IklFIiwicm9sZXMiOlsiQUlTUCIsIlBJU1AiLCJDQlBJSSJdfSx7Im1lbWJlcl9zdGF0ZSI6Ik5MIiwicm9sZXMiOlsiQUlTUCIsIlBJU1AiLCJDQlBJSSJdfV19LCJzb2Z0d2FyZV9sb2dvX3VyaSI6Imh0dHBzOi8vd3NvMi5jb20vd3NvMi5qcGciLCJvcmdfc3RhdHVzIjoiQWN0aXZlIiwib3JnX2lkIjoiMDAxNTgwMDAwMUhRUXJaQUFYIiwib3JnX25hbWUiOiJXU08yIChVSykgTElNSVRFRCIsIm9yZ19jb250YWN0cyI6W3sibmFtZSI6IlRlY2huaWNhbCIsImVtYWlsIjoic2FjaGluaXNAd3NvMi5jb20iLCJwaG9uZSI6Iis5NDc3NDI3NDM3NCIsInR5cGUiOiJUZWNobmljYWwifSx7Im5hbWUiOiJCdXNpbmVzcyIsImVtYWlsIjoic2FjaGluaXNAd3NvMi5jb20iLCJwaG9uZSI6Iis5NDc3NDI3NDM3NCIsInR5cGUiOiJCdXNpbmVzcyJ9XSwib3JnX2p3a3NfZW5kcG9pbnQiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMUhRUXJaQUFYLzAwMTU4MDAwMDFIUVFyWkFBWC5qd2tzIiwib3JnX2p3a3NfcmV2b2tlZF9lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxSFFRclpBQVgvcmV2b2tlZC8wMDE1ODAwMDAxSFFRclpBQVguandrcyIsInNvZnR3YXJlX2p3a3NfZW5kcG9pbnQiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMUhRUXJaQUFYL3Nnc011YzhBQ0JnQnppbnByOG9KOEIuandrcyIsInNvZnR3YXJlX2p3a3NfcmV2b2tlZF9lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxSFFRclpBQVgvcmV2b2tlZC9zZ3NNdWM4QUNCZ0J6aW5wcjhvSjhCLmp3a3MiLCJzb2Z0d2FyZV9wb2xpY3lfdXJpIjoiaHR0cHM6Ly93c28yLmNvbSIsInNvZnR3YXJlX3Rvc191cmkiOiJodHRwczovL3dzbzIuY29tIiwic29mdHdhcmVfb25fYmVoYWxmX29mX29yZyI6IldTTzIgT3BlbiBCYW5raW5nIn0.udiEV2nwAm6rrCHlgGm3PI4LC76yuiw14xfIom2UEW3X-9Uiea_52zHpvoQJigx3UyoK3j0w14fkQU8j6uqtmzngwCcAHxbYyxG0o3YkgjPC1YrQHSQYfELe3SfQEGPJCuUN1gfJw9boLD-i6e_LiDkFRRBec4LUy4Rl-HZkSi8VnIDqpk1OUe_x581i529AwAAZylTEzF8mHg6u24O9kttRkuS3PtnXBDqCIBr21EJ0VFn9zEbHSMlHzoohR_7ePsUvtTAS-UkCMstvyWTMPLY-zWqrLc7JT5HXZQc6fRpt9ArfRjmTie3OfqCJGUyvtvW03s28IxP7rhjRqfQxiA"
}
```