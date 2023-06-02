This page explains how to onboard TPP applications using the Dynamic Client Registration API. 

### Deploying the Dynamic Client Registration(DCR) API

1. Sign in to the API Publisher Portal at `https://<APIM_HOME>:9443/publisher` with `creator/publisher` 
privileges.
    
    ![sign_in](../assets/img/get-started/quick-start-guide/sign-in.png)

2. In the homepage, go to **REST API** and select **Import Open API**. ![let's_get_started](../assets/img/get-started/quick-start-guide/lets-get-started.png)

3. Select **OpenAPI File/Archive**. ![create-an-api](../assets/img/get-started/quick-start-guide/create-an-api.png)

4. Click **Browse File to Upload** and select the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/
openbanking.org.uk/DynamicClientRegistration/3.3.0/dynamic-client-registration-swagger.yaml` file.

5. Click **Next**.

6. Click **Create** to create the API. ![create-dcr-api](../assets/img/get-started/quick-start-guide/create-dcr.png)

7. After the API is successfully created, go to **Portal Configurations** using the left menu panel. ![portal-configurations](../assets/img/get-started/quick-start-guide/portal-configurations.png)

8. Select **Subscriptions** from the left menu pane and set the business plan to **Unlimited: Allows unlimited requests**. ![business-plan](../assets/img/get-started/quick-start-guide/business-plan.png)

9. Click **Save**.

10. Once you get the message that the API is successfully updated, Add a custom policy. Follow the instructions given below according to the API Manager version you are using:

    ??? note "Click here to see how to add a custom policy if you are using API Manager 4.0.0..."

        1. Use the left menu panel and select **API Configurations > Runtime**. <br> ![select_runtime](../assets/img/get-started/quick-start-guide/select-runtime.png)
            
        2. Click the **Edit** button under **Request > Message Mediation**. ![edit_message_mediation](../assets/img/get-started/quick-start-guide/edit-message-mediation.png)
        
        3. Now, select the **Custom Policy** option.
        
        4. Upload the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/openbanking.org.uk/DynamicClientRegistration/3.3.0/dcr-dynamic-endpoint-insequence-3.3.0.xml` file. ![dcr_insequence](../assets/img/get-started/quick-start-guide/dcr-insequence.png)
         
        5. Click **Select**. 
        
        6. Scroll down and click **SAVE**.

    ??? note "Click here to see how to add a custom policy if you are using API Manager 4.1.0 or 4.2.0..."

        1. Go to **Develop -> API Configurations -> Policies** in the left menu pane.<br><br>
        <div style="width:40%">
        ![select_policies](../assets/img/get-started/quick-start-guide/select-policies.png)
        </div>

        2. On the **Policy List** card, click on **Add New Policy**.

        3. Fill in the **Create New Policy**.

        4. Upload the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/openbanking.org.uk/DynamicClientRegistration/3.3.0/dcr-dynamic-endpoint-insequence-3.3.0.xml` file.

        5. Scroll down and click **Save**. Upon successful creation of the policy, you receive an alert as shown below: <br><br>
        <div style="width:35%">
        ![successful](../assets/img/get-started/quick-start-guide/successful.png)
        </div>

        6. Expand the API endpoint you want from the list of API endpoints. For example: ![expand_api_endpoint](../assets/img/get-started/quick-start-guide/expand-api-endpoint.png)

        7. Expand the HTTP method from the API endpoint you selected. For example: ![expand_http_method](../assets/img/get-started/quick-start-guide/expand-http-method.png)

        8. Drag and drop the previously created policy to the **Request Flow** of the API endpoint. ![request_flow](../assets/img/get-started/quick-start-guide/request-flow.png)

        9. Select **Apply to all resources** and click **Save**.

        10. Scroll down and click **Save**.

11. Use the left menu panel and go to **API Configurations > Endpoints**. 

    ![select_endpoints](../assets/img/get-started/quick-start-guide/select-endpoints.png)

12. Add a **Dynamic Endpoint**. ![add_dynamic_endpoint](../assets/img/get-started/quick-start-guide/add_dynamic_endpoint.png)

13. Go to **Deployments** using the left menu pane. 

    ![select_deployments](../assets/img/get-started/quick-start-guide/select-deployments.png)

14. Select the API Gateway type, in this scenario, it is **Default**. ![api_gateway](../assets/img/get-started/quick-start-guide/dcr-api-gateway.png)

15. Click **Deploy**.

16. Go to **Overview** using the left menu pane. 

    ![select_overview](../assets/img/get-started/quick-start-guide/select-overview.png)

17. Click **Publish**. ![publish_api](../assets/img/get-started/quick-start-guide/publish-api.png)

18. The deployed API is now available in the Developer Portal at `https://<APIM_HOME>:9443/devportal`.

19. Upload the root and issuer certificates in OBIE ([Sandbox certificates](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/252018873/OB+Root+and+Issuing+Certificates+for+Sandbox)/
    [Production certificates](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/80544075/OB+Root+and+Issuing+Certificates+for+Production))
    to the client trust stores in `<APIM_HOME>/repository/resources/security/client-truststore.jks` and 
    `<IS_HOME>/repository/resources/security/client-truststore.jks` using the following command:
    
    ```
    keytool -import -alias <alias> -file <certificate_location> -storetype JKS -keystore <truststore_location> -storepass wso2carbon
    ```
                
20. Restart the Identity Server and API Manager instances.

## Configuring IS as Key Manager

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

## Registering an application

TPPs use the DCR API to request the ASPSP to register a new client. 

The registration request is a POST request that includes a Software Statement Assertion (SSA) as a claim in the payload. 
This SSA contains client metadata. It is a signed JWT issued by the Open Banking directory and the TPPs need to obtain it before registering with an ASPSP.

This section explains the client registration process. A sample request is as follows:

- For the
  Transport Layer Security purposes in this sample flow, you can use the attached [private key](../../assets/attachments/transport-certs/obtransport.key) and
  [public certificate](../../assets/attachments/transport-certs/obtransport.pem).

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
      "kid": "w7NFeMODzCMOZen_WECAlG9N8gg"
      "alg": "PS256"
}
{
      "iss": "oQ4KoaavpOuoE7rvQsZEOV3",
      "iat": 1643090815,
      "exp": 1643094415,
      "jti": "1643090815273",
      "aud": "https://localbank.com",
      "scope": "openid accounts payments",
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
        "https://www.mockcompany.com/redirects/redirect1"
      ],
      "software_statement": "eyJhbGciOiJQUzI1NiIsImtpZCI6Inc3TkZlTU9EekNNT1plbl9XRUNBbEc5TjhnZyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJPcGVuQmFua2luZyBMdGQiLCJpYXQiOjE2NDc0MDU5NDAsImp0aSI6IjM2YjVkZmUwMjA1YzQwNjAiLCJzb2Z0d2FyZV9lbnZpcm9ubWVudCI6InNhbmRib3giLCJzb2Z0d2FyZV9tb2RlIjoiVGVzdCIsInNvZnR3YXJlX2lkIjoib1E0S29hYXZwT3VvRTdydlFzWkVPVjMiLCJzb2Z0d2FyZV9jbGllbnRfaWQiOiJvUTRLb2FhdnBPdW9FN3J2UXNaRU9WMyIsInNvZnR3YXJlX2NsaWVudF9uYW1lIjoiV1NPMiBPcGVuIEJhbmtpbmcgVFBQMiAoU2FuZGJveCkiLCJzb2Z0d2FyZV9jbGllbnRfZGVzY3JpcHRpb24iOiJXU08yIE9wZW4gQmFua2luZyBUUFAyIGZvciB0ZXN0aW5nIiwic29mdHdhcmVfdmVyc2lvbiI6MS41LCJzb2Z0d2FyZV9jbGllbnRfdXJpIjoiaHR0cHM6Ly93d3cubW9ja2NvbXBhbnkuY29tL3JlZGlyZWN0cy9yZWRpcmVjdDEiLCJzb2Z0d2FyZV9yZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vd3d3Lm1vY2tjb21wYW55LmNvbS9yZWRpcmVjdHMvcmVkaXJlY3QxIl0sInNvZnR3YXJlX3JvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXSwib3JnYW5pc2F0aW9uX2NvbXBldGVudF9hdXRob3JpdHlfY2xhaW1zIjp7ImF1dGhvcml0eV9pZCI6Ik9CR0JSIiwicmVnaXN0cmF0aW9uX2lkIjoiVW5rbm93bjAwMTU4MDAwMDFIUVFyWkFBWCIsInN0YXR1cyI6IkFjdGl2ZSIsImF1dGhvcmlzYXRpb25zIjpbeyJtZW1iZXJfc3RhdGUiOiJHQiIsInJvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXX0seyJtZW1iZXJfc3RhdGUiOiJJRSIsInJvbGVzIjpbIlBJU1AiLCJDQlBJSSIsIkFJU1AiXX0seyJtZW1iZXJfc3RhdGUiOiJOTCIsInJvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXX1dfSwic29mdHdhcmVfbG9nb191cmkiOiJodHRwczovL3dzbzIuY29tL3dzbzIuanBnIiwib3JnX3N0YXR1cyI6IkFjdGl2ZSIsIm9yZ19pZCI6IjAwMTU4MDAwMDFIUVFyWkFBWCIsIm9yZ19uYW1lIjoiV1NPMiAoVUspIExJTUlURUQiLCJvcmdfY29udGFjdHMiOlt7Im5hbWUiOiJUZWNobmljYWwiLCJlbWFpbCI6InRlc3RAd3NvMi5jb20iLCJwaG9uZSI6Iis5NDAwMDAwMDAwMCIsInR5cGUiOiJUZWNobmljYWwifSx7Im5hbWUiOiJCdXNpbmVzcyIsImVtYWlsIjoidGVzdEB3c28yLmNvbSIsInBob25lIjoiKzk0MDAwMDAwMDAwIiwidHlwZSI6IkJ1c2luZXNzIn1dLCJvcmdfandrc19lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxSFFRclpBQVgvMDAxNTgwMDAwMUhRUXJaQUFYLmp3a3MiLCJvcmdfandrc19yZXZva2VkX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC9yZXZva2VkLzAwMTU4MDAwMDFIUVFyWkFBWC5qd2tzIiwic29mdHdhcmVfandrc19lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxSFFRclpBQVgvb1E0S29hYXZwT3VvRTdydlFzWkVPVi5qd2tzIiwic29mdHdhcmVfandrc19yZXZva2VkX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC9yZXZva2VkL29RNEtvYWF2cE91b0U3cnZRc1pFT1YuandrcyIsInNvZnR3YXJlX3BvbGljeV91cmkiOiJodHRwczovL3dzbzIuY29tIiwic29mdHdhcmVfdG9zX3VyaSI6Imh0dHBzOi8vd3NvMi5jb20iLCJzb2Z0d2FyZV9vbl9iZWhhbGZfb2Zfb3JnIjoiV1NPMiBPcGVuIEJhbmtpbmcifQ.WQ57BhTmb6jukE7BYDqh24dP6dMuRue1lJZgeIXuFcDKlNZ7kF_Yoifi2KpIxqBlK7ZhscuaTXjm-poMTJELzAWin7WskXIGE0eRnBWUR-efyDdx-m7DX3VSM7ZR_yXCWyH9AJYypu1m22kXz0SiX8qdXDEcAygDuDgZM8IYbpKZTFX_uiKisr3kVBm8JdRd92OrVS5aCOzc7VVzUMm8RNN940vAUansKrJ2X1JOayJ2UTB6rSvRmkz5kMwKYsxpohchzyfCpQ0MBLTFSegdjkSylA9axeggUsUCCc9Trly_PhjvWUDTEoKqAobmEliYY_q-K5DPTtU7p3Aqps-Apg"
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
   "client_id": "ZRsNz6FOaNSWjEwEGFW_Osid8aAa",
   "client_id_issued_at":"1664173296",
   "redirect_uris":[
      "https://www.mockcompany.com/redirects/redirect1"
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
   "scope": "openid accounts payments",
   "software_id":"oQ4KoaavpOuoE7rvQsZEOV3",
   "token_endpoint_auth_method":"private_key_jwt",
   "software_statement":"eyJhbGciOiJQUzI1NiIsImtpZCI6Inc3TkZlTU9EekNNT1plbl9XRUNBbEc5TjhnZyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJPcGVuQmFua2luZyBMdGQiLCJpYXQiOjE2NDc0MDU5NDAsImp0aSI6IjM2YjVkZmUwMjA1YzQwNjAiLCJzb2Z0d2FyZV9lbnZpcm9ubWVudCI6InNhbmRib3giLCJzb2Z0d2FyZV9tb2RlIjoiVGVzdCIsInNvZnR3YXJlX2lkIjoib1E0S29hYXZwT3VvRTdydlFzWkVPVjMiLCJzb2Z0d2FyZV9jbGllbnRfaWQiOiJvUTRLb2FhdnBPdW9FN3J2UXNaRU9WMyIsInNvZnR3YXJlX2NsaWVudF9uYW1lIjoiV1NPMiBPcGVuIEJhbmtpbmcgVFBQMiAoU2FuZGJveCkiLCJzb2Z0d2FyZV9jbGllbnRfZGVzY3JpcHRpb24iOiJXU08yIE9wZW4gQmFua2luZyBUUFAyIGZvciB0ZXN0aW5nIiwic29mdHdhcmVfdmVyc2lvbiI6MS41LCJzb2Z0d2FyZV9jbGllbnRfdXJpIjoiaHR0cHM6Ly93d3cubW9ja2NvbXBhbnkuY29tL3JlZGlyZWN0cy9yZWRpcmVjdDEiLCJzb2Z0d2FyZV9yZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vd3d3Lm1vY2tjb21wYW55LmNvbS9yZWRpcmVjdHMvcmVkaXJlY3QxIl0sInNvZnR3YXJlX3JvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXSwib3JnYW5pc2F0aW9uX2NvbXBldGVudF9hdXRob3JpdHlfY2xhaW1zIjp7ImF1dGhvcml0eV9pZCI6Ik9CR0JSIiwicmVnaXN0cmF0aW9uX2lkIjoiVW5rbm93bjAwMTU4MDAwMDFIUVFyWkFBWCIsInN0YXR1cyI6IkFjdGl2ZSIsImF1dGhvcmlzYXRpb25zIjpbeyJtZW1iZXJfc3RhdGUiOiJHQiIsInJvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXX0seyJtZW1iZXJfc3RhdGUiOiJJRSIsInJvbGVzIjpbIlBJU1AiLCJDQlBJSSIsIkFJU1AiXX0seyJtZW1iZXJfc3RhdGUiOiJOTCIsInJvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXX1dfSwic29mdHdhcmVfbG9nb191cmkiOiJodHRwczovL3dzbzIuY29tL3dzbzIuanBnIiwib3JnX3N0YXR1cyI6IkFjdGl2ZSIsIm9yZ19pZCI6IjAwMTU4MDAwMDFIUVFyWkFBWCIsIm9yZ19uYW1lIjoiV1NPMiAoVUspIExJTUlURUQiLCJvcmdfY29udGFjdHMiOlt7Im5hbWUiOiJUZWNobmljYWwiLCJlbWFpbCI6InRlc3RAd3NvMi5jb20iLCJwaG9uZSI6Iis5NDAwMDAwMDAwMCIsInR5cGUiOiJUZWNobmljYWwifSx7Im5hbWUiOiJCdXNpbmVzcyIsImVtYWlsIjoidGVzdEB3c28yLmNvbSIsInBob25lIjoiKzk0MDAwMDAwMDAwIiwidHlwZSI6IkJ1c2luZXNzIn1dLCJvcmdfandrc19lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxSFFRclpBQVgvMDAxNTgwMDAwMUhRUXJaQUFYLmp3a3MiLCJvcmdfandrc19yZXZva2VkX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC9yZXZva2VkLzAwMTU4MDAwMDFIUVFyWkFBWC5qd2tzIiwic29mdHdhcmVfandrc19lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxSFFRclpBQVgvb1E0S29hYXZwT3VvRTdydlFzWkVPVi5qd2tzIiwic29mdHdhcmVfandrc19yZXZva2VkX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC9yZXZva2VkL29RNEtvYWF2cE91b0U3cnZRc1pFT1YuandrcyIsInNvZnR3YXJlX3BvbGljeV91cmkiOiJodHRwczovL3dzbzIuY29tIiwic29mdHdhcmVfdG9zX3VyaSI6Imh0dHBzOi8vd3NvMi5jb20iLCJzb2Z0d2FyZV9vbl9iZWhhbGZfb2Zfb3JnIjoiV1NPMiBPcGVuIEJhbmtpbmcifQ.WQ57BhTmb6jukE7BYDqh24dP6dMuRue1lJZgeIXuFcDKlNZ7kF_Yoifi2KpIxqBlK7ZhscuaTXjm-poMTJELzAWin7WskXIGE0eRnBWUR-efyDdx-m7DX3VSM7ZR_yXCWyH9AJYypu1m22kXz0SiX8qdXDEcAygDuDgZM8IYbpKZTFX_uiKisr3kVBm8JdRd92OrVS5aCOzc7VVzUMm8RNN940vAUansKrJ2X1JOayJ2UTB6rSvRmkz5kMwKYsxpohchzyfCpQ0MBLTFSegdjkSylA9axeggUsUCCc9Trly_PhjvWUDTEoKqAobmEliYY_q-K5DPTtU7p3Aqps-Apg"
}
```

## Generating application access token

Once you register the application, generate the client assertion by signing the following JSON payload using supported 
algorithms.

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

## Retrieving an application

TPPs use the DCR API to retrieve the details of an application that has already been registered. The request relies on 
Mutual TLS authentication and application access token (Client Credentials grant type) for TPP authentication.

The request has one path parameter named `ClientId` . It specifies the Client Id of the application that the TPP wants 
to retrieve details.

- If the request is successful and the identifier(`ClientId`) matches the client to whom the Client Credentials grant 
access token was issued, the ASPSP returns details of the requested client.
- If `ClientId` is unknown, the ASPSP responds with an `Unauthorized` status code and immediately revokes the access token.

``` tab="Request"

curl -X GET \ 
  https://<APIM_HOST>:8243/open-banking/v3.3.0/register/13viXsOYQBR8hOhGas4kLpM77UIa \
  -H 'Authorization: Bearer <APPLICATION_ACCESS_TOKEN>'  \
  --cacert certfile \
  --cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH>
```

``` tab="Response"
{
   "token_endpoint_auth_signing_alg":"PS256",
   "client_id":"13viXsOYQBR8hOhGas4kLpM77UIa",
   "client_id_issued_at":"1643090861",
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

## Updating an application

TPPs use the DCR API to request the ASPSP to modify one or more attributes related to an existing application. The 
request relies on Mutual TLS authentication and application access token (Client Credentials grant type) for TPP authentication.

The request has one path parameter named `ClientId`. It specifies the Client Id of the application that the TPP wants to 
modify. The TPP submits a JWS payload that describes the characteristics of the client to be modified. This must include 
all the claims, including the ones that will not be modified.

- If the client is successfully modified, the ASPSP responds with a JSON payload that describes the client that was created.
- If the `ClientId` is unknown, the ASPSP responds with an Unauthorized status code and immediately revokes the access token.
- If client modification is unsuccessful, the ASPSP responds with an error payload.

``` tab="Request"
curl -X PUT \
  https://<APIM_HOST>:8243/open-banking/v3.3.0/register/13viXsOYQBR8hOhGas4kLpM77UIa \
  -H 'Authorization: Bearer <APPLICATION_ACCESS_TOKEN>' \
  --cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH> \
  --cacert certfile \
  -d 'eyJraWQiOiIyTUk5WFNLaTZkZHhDYldnMnJoRE50VWx4SmMiLCJhbGciOiJQUzI1NiJ9.CiAgICAgICAgICAgIHsKICAgICAgICAgICAgICAgICJpc3MiOiAic2dzTXVjOEFDQmdCemlucHI4b0o4QiIsCiAgICAgICAgICAgICAgICAiaWF0IjogMTY0MzA5MDg2NiwKICAgICAgICAgICAgICAgICJleHAiOiAxNjQzMDk0NDY2LAogICAgICAgICAgICAgICAgImp0aSI6ICIxNjQzMDkwODY2NjcyIiwKICAgICAgICAgICAgICAgICJhdWQiOiAiaHR0cHM6Ly9sb2NhbGJhbmsuY29tIiwKICAgICAgICAgICAgICAgICJzY29wZSI6ICJhY2NvdW50cyBwYXltZW50cyIsCiAgICAgICAgICAgICAgICAidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2QiOiAicHJpdmF0ZV9rZXlfand0IiwKICAgICAgICAgICAgICAgICJ0b2tlbl9lbmRwb2ludF9hdXRoX3NpZ25pbmdfYWxnIjogIlBTMjU2IiwKICAgICAgICAgICAgICAgICJncmFudF90eXBlcyI6IFsKICAgICAgICAgICAgICAgICAgICAiYXV0aG9yaXphdGlvbl9jb2RlIiwKICAgICAgICAgICAgICAgICAgICAiY2xpZW50X2NyZWRlbnRpYWxzIiwKICAgICAgICAgICAgICAgICAgICAicmVmcmVzaF90b2tlbiIKICAgICAgICAgICAgICAgICAgICBdLAogICAgICAgICAgICAgICAgInJlc3BvbnNlX3R5cGVzIjogWwogICAgICAgICAgICAgICAgICAgICJjb2RlIGlkX3Rva2VuIgogICAgICAgICAgICAgICAgICAgIF0sCiAgICAgICAgICAgICAgICAiaWRfdG9rZW5fc2lnbmVkX3Jlc3BvbnNlX2FsZyI6ICJQUzI1NiIsCiAgICAgICAgICAgICAgICAicmVxdWVzdF9vYmplY3Rfc2lnbmluZ19hbGciOiAiUFMyNTYiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICJhcHBsaWNhdGlvbl90eXBlIjogIndlYiIsCiAgICAgICAgICAgICAgICAic29mdHdhcmVfaWQiOiAic2dzTXVjOEFDQmdCemlucHI4b0o4QiIsCiAgICAgICAgICAgICAgICAicmVkaXJlY3RfdXJpcyI6IFsKICAgICAgICAgICAgICAgICAgICAiaHR0cHM6Ly93c28yLmNvbSIKICAgICAgICAgICAgICAgICAgICBdLAogICAgICAgICAgICAgICAgInNvZnR3YXJlX3N0YXRlbWVudCI6ICJleUpoYkdjaU9pSlFVekkxTmlJc0ltdHBaQ0k2SWpKTlNUbFlVMHRwTm1Sa2VFTmlWMmN5Y21oRVRuUlZiSGhLWXlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcGMzTWlPaUpQY0dWdVFtRnVhMmx1WnlCTWRHUWlMQ0pwWVhRaU9qRTJNVEk0TmpFM056RXNJbXAwYVNJNkltVmpOR0prTm1NMVptSXpOVFF3TjJFaUxDSnpiMlowZDJGeVpWOWxiblpwY205dWJXVnVkQ0k2SW5OaGJtUmliM2dpTENKemIyWjBkMkZ5WlY5dGIyUmxJam9pVkdWemRDSXNJbk52Wm5SM1lYSmxYMmxrSWpvaWMyZHpUWFZqT0VGRFFtZENlbWx1Y0hJNGIwbzRRaUlzSW5OdlpuUjNZWEpsWDJOc2FXVnVkRjlwWkNJNkluTm5jMDExWXpoQlEwSm5RbnBwYm5CeU9HOUtPRUlpTENKemIyWjBkMkZ5WlY5amJHbGxiblJmYm1GdFpTSTZJbGRUVHpJZ1QzQmxiaUJDWVc1cmFXNW5JRlJRVUNBb1UyRnVaR0p2ZUNraUxDSnpiMlowZDJGeVpWOWpiR2xsYm5SZlpHVnpZM0pwY0hScGIyNGlPaUpYVTA4eUlFOXdaVzRnUW1GdWEybHVaeUlzSW5OdlpuUjNZWEpsWDNabGNuTnBiMjRpT2pFdU5Td2ljMjltZEhkaGNtVmZZMnhwWlc1MFgzVnlhU0k2SW1oMGRIQnpPaTh2ZDNOdk1pNWpiMjBpTENKemIyWjBkMkZ5WlY5eVpXUnBjbVZqZEY5MWNtbHpJanBiSW1oMGRIQnpPaTh2ZDNOdk1pNWpiMjBpWFN3aWMyOW1kSGRoY21WZmNtOXNaWE1pT2xzaVFVbFRVQ0lzSWxCSlUxQWlMQ0pEUWxCSlNTSmRMQ0p2Y21kaGJtbHpZWFJwYjI1ZlkyOXRjR1YwWlc1MFgyRjFkR2h2Y21sMGVWOWpiR0ZwYlhNaU9uc2lZWFYwYUc5eWFYUjVYMmxrSWpvaVQwSkhRbElpTENKeVpXZHBjM1J5WVhScGIyNWZhV1FpT2lKVmJtdHViM2R1TURBeE5UZ3dNREF3TVVoUlVYSmFRVUZZSWl3aWMzUmhkSFZ6SWpvaVFXTjBhWFpsSWl3aVlYVjBhRzl5YVhOaGRHbHZibk1pT2x0N0ltMWxiV0psY2w5emRHRjBaU0k2SWtkQ0lpd2ljbTlzWlhNaU9sc2lRVWxUVUNJc0lsQkpVMUFpTENKRFFsQkpTU0pkZlN4N0ltMWxiV0psY2w5emRHRjBaU0k2SWtsRklpd2ljbTlzWlhNaU9sc2lRVWxUVUNJc0lsQkpVMUFpTENKRFFsQkpTU0pkZlN4N0ltMWxiV0psY2w5emRHRjBaU0k2SWs1TUlpd2ljbTlzWlhNaU9sc2lRVWxUVUNJc0lsQkpVMUFpTENKRFFsQkpTU0pkZlYxOUxDSnpiMlowZDJGeVpWOXNiMmR2WDNWeWFTSTZJbWgwZEhCek9pOHZkM052TWk1amIyMHZkM052TWk1cWNHY2lMQ0p2Y21kZmMzUmhkSFZ6SWpvaVFXTjBhWFpsSWl3aWIzSm5YMmxrSWpvaU1EQXhOVGd3TURBd01VaFJVWEphUVVGWUlpd2liM0puWDI1aGJXVWlPaUpYVTA4eUlDaFZTeWtnVEVsTlNWUkZSQ0lzSW05eVoxOWpiMjUwWVdOMGN5STZXM3NpYm1GdFpTSTZJbFJsWTJodWFXTmhiQ0lzSW1WdFlXbHNJam9pYzJGamFHbHVhWE5BZDNOdk1pNWpiMjBpTENKd2FHOXVaU0k2SWlzNU5EYzNOREkzTkRNM05DSXNJblI1Y0dVaU9pSlVaV05vYm1sallXd2lmU3g3SW01aGJXVWlPaUpDZFhOcGJtVnpjeUlzSW1WdFlXbHNJam9pYzJGamFHbHVhWE5BZDNOdk1pNWpiMjBpTENKd2FHOXVaU0k2SWlzNU5EYzNOREkzTkRNM05DSXNJblI1Y0dVaU9pSkNkWE5wYm1WemN5SjlYU3dpYjNKblgycDNhM05mWlc1a2NHOXBiblFpT2lKb2RIUndjem92TDJ0bGVYTjBiM0psTG05d1pXNWlZVzVyYVc1bmRHVnpkQzV2Y21jdWRXc3ZNREF4TlRnd01EQXdNVWhSVVhKYVFVRllMekF3TVRVNE1EQXdNREZJVVZGeVdrRkJXQzVxZDJ0eklpd2liM0puWDJwM2EzTmZjbVYyYjJ0bFpGOWxibVJ3YjJsdWRDSTZJbWgwZEhCek9pOHZhMlY1YzNSdmNtVXViM0JsYm1KaGJtdHBibWQwWlhOMExtOXlaeTUxYXk4d01ERTFPREF3TURBeFNGRlJjbHBCUVZndmNtVjJiMnRsWkM4d01ERTFPREF3TURBeFNGRlJjbHBCUVZndWFuZHJjeUlzSW5OdlpuUjNZWEpsWDJwM2EzTmZaVzVrY0c5cGJuUWlPaUpvZEhSd2N6b3ZMMnRsZVhOMGIzSmxMbTl3Wlc1aVlXNXJhVzVuZEdWemRDNXZjbWN1ZFdzdk1EQXhOVGd3TURBd01VaFJVWEphUVVGWUwzTm5jMDExWXpoQlEwSm5RbnBwYm5CeU9HOUtPRUl1YW5kcmN5SXNJbk52Wm5SM1lYSmxYMnAzYTNOZmNtVjJiMnRsWkY5bGJtUndiMmx1ZENJNkltaDBkSEJ6T2k4dmEyVjVjM1J2Y21VdWIzQmxibUpoYm10cGJtZDBaWE4wTG05eVp5NTFheTh3TURFMU9EQXdNREF4U0ZGUmNscEJRVmd2Y21WMmIydGxaQzl6WjNOTmRXTTRRVU5DWjBKNmFXNXdjamh2U2poQ0xtcDNhM01pTENKemIyWjBkMkZ5WlY5d2IyeHBZM2xmZFhKcElqb2lhSFIwY0hNNkx5OTNjMjh5TG1OdmJTSXNJbk52Wm5SM1lYSmxYM1J2YzE5MWNta2lPaUpvZEhSd2N6b3ZMM2R6YnpJdVkyOXRJaXdpYzI5bWRIZGhjbVZmYjI1ZlltVm9ZV3htWDI5bVgyOXlaeUk2SWxkVFR6SWdUM0JsYmlCQ1lXNXJhVzVuSW4wLnVkaUVWMm53QW02cnJDSGxnR20zUEk0TEM3Nnl1aXcxNHhmSW9tMlVFVzNYLTlVaWVhXzUyekhwdm9RSmlneDNVeW9LM2owdzE0ZmtRVThqNnVxdG16bmd3Q2NBSHhiWXl4RzBvM1lrZ2pQQzFZclFIU1FZZkVMZTNTZlFFR1BKQ3VVTjFnZkp3OWJvTEQtaTZlX0xpRGtGUlJCZWM0TFV5NFJsLUhaa1NpOFZuSURxcGsxT1VlX3g1ODFpNTI5QXdBQVp5bFRFekY4bUhnNnUyNE85a3R0Umt1UzNQdG5YQkRxQ0lCcjIxRUowVkZuOXpFYkhTTWxIem9vaFJfN2VQc1V2dFRBUy1Va0NNc3R2eVdUTVBMWS16V3FyTGM3SlQ1SFhaUWM2ZlJwdDlBcmZSam1UaWUzT2ZxQ0pHVXl2dHZXMDNzMjhJeFA3cmhqUnFmUXhpQSIKICAgICAgICAgICAgfQogICAgICAgIA.IEoY6aW06GJnI-DPcCbklqyGvJfSMn57m5X7IdNmdev85a8CKJIVfHKUJ5INbkiVfuvM6qZakfCTxUJkIBHJ1bHk6YOerP4fHSzNuIBsWCd-TxQOCxrfPnDUaDYj1YLmx-T1tWhRIVQrD0-N3G4p12hNNPOClfo7MxD8Hmr5qkMVaROAmmQRKDjCFg8iSw41McuJzGFYK4LEoEdD8yOqicX7hZWhEnurWY8dCR1aeMpc0jBG5v5oVwVHgHe0fx_nBLnaL4D5JSfAnXdk8X3s4M4wQNZbw6vIPinf2LdGxCHwfbj9GULSqSWgPT_jhx-RSb-OHgM6bm8RLJ38n5vJSQ'
```

``` tab="Response"
{
   "token_endpoint_auth_signing_alg":"PS256",
   "client_id":"13viXsOYQBR8hOhGas4kLpM77UIa",
   "client_id_issued_at":"1643090861",
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

## Deleting an application

TPPs use the DCR API to request the ASPSP to delete an existing application. The request relies on Mutual TLS authentication 
and application access token (Client Credentials grant type) for TPP authentication.

The request has one path parameter named `ClientId`. It specifies the Client Id of the application that the TPP wants to delete.

- If the request is successful and the `ClientId` matches the client to whom the Client Credentials grant access token was 
issued, the ASPSP must delete the client and invalidate long-lived access tokens that were issued to the client.
- If the `ClientId` is unknown, the ASPSP responds with an `Unauthorized` status code and immediately revokes the access token.

``` tab="Request"
curl -X DELETE \
  https://<APIM_HOME>:8243/open-banking/v3.3.0/register/13viXsOYQBR8hOhGas4kLpM77UIa \
  -H 'Authorization: Bearer <APPLICATION_ACCESS_TOKEN>' \
  --cacert certfile \
  --cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH>
```

``` tab="Response"
204 No Content
```