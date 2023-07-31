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
     -d 'eyJ0eXAiOiJKV1QiLCJraWQiOiJoM1pDRjBWcnpnWGduSENxYkhiS1h6emZqVGciLCJhbGciOiJQUzI1NiJ9.eyJpc3MiOiJvUTRLb2FhdnBPdW9FN3J2UXNaRU9WIiwiaWF0IjoxNjQzMDkwODE1LCJleHAiOjE2NDMwOTQ0MTUsImp0aSI6IjE2NDMwOTA4MTUyNzMiLCJhdWQiOiJodHRwczovL2xvY2FsYmFuay5jb20iLCJzY29wZSI6ImFjY291bnRzIHBheW1lbnRzIiwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2QiOiJwcml2YXRlX2tleV9qd3QiLCJ0b2tlbl9lbmRwb2ludF9hdXRoX3NpZ25pbmdfYWxnIjoiUFMyNTYiLCJncmFudF90eXBlcyI6WyJhdXRob3JpemF0aW9uX2NvZGUiLCJjbGllbnRfY3JlZGVudGlhbHMiLCJyZWZyZXNoX3Rva2VuIl0sInJlc3BvbnNlX3R5cGVzIjpbImNvZGUgaWRfdG9rZW4iXSwiaWRfdG9rZW5fc2lnbmVkX3Jlc3BvbnNlX2FsZyI6IlBTMjU2IiwicmVxdWVzdF9vYmplY3Rfc2lnbmluZ19hbGciOiJQUzI1NiIsImFwcGxpY2F0aW9uX3R5cGUiOiJ3ZWIiLCJzb2Z0d2FyZV9pZCI6Im9RNEtvYWF2cE91b0U3cnZRc1pFT1YiLCJyZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vd3NvMi5jb20iXSwic29mdHdhcmVfc3RhdGVtZW50IjoiZXlKaGJHY2lPaUpRVXpJMU5pSXNJbXRwWkNJNkltZ3pXa05HTUZaeWVtZFlaMjVJUTNGaVNHSkxXSHA2Wm1wVVp5SXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKUGNHVnVRbUZ1YTJsdVp5Qk1kR1FpTENKcFlYUWlPakUyTkRjME1EVTVOREFzSW1wMGFTSTZJak0yWWpWa1ptVXdNakExWXpRd05qQWlMQ0p6YjJaMGQyRnlaVjlsYm5acGNtOXViV1Z1ZENJNkluTmhibVJpYjNnaUxDSnpiMlowZDJGeVpWOXRiMlJsSWpvaVZHVnpkQ0lzSW5OdlpuUjNZWEpsWDJsa0lqb2liMUUwUzI5aFlYWndUM1Z2UlRkeWRsRnpXa1ZQVmlJc0luTnZablIzWVhKbFgyTnNhV1Z1ZEY5cFpDSTZJbTlSTkV0dllXRjJjRTkxYjBVM2NuWlJjMXBGVDFZaUxDSnpiMlowZDJGeVpWOWpiR2xsYm5SZmJtRnRaU0k2SWxkVFR6SWdUM0JsYmlCQ1lXNXJhVzVuSUZSUVVESWdLRk5oYm1SaWIzZ3BJaXdpYzI5bWRIZGhjbVZmWTJ4cFpXNTBYMlJsYzJOeWFYQjBhVzl1SWpvaVYxTlBNaUJQY0dWdUlFSmhibXRwYm1jZ1ZGQlFNaUJtYjNJZ2RHVnpkR2x1WnlJc0luTnZablIzWVhKbFgzWmxjbk5wYjI0aU9qRXVOU3dpYzI5bWRIZGhjbVZmWTJ4cFpXNTBYM1Z5YVNJNkltaDBkSEJ6T2k4dmQzZDNMbWR2YjJkc1pTNWpiMjBpTENKemIyWjBkMkZ5WlY5eVpXUnBjbVZqZEY5MWNtbHpJanBiSW1oMGRIQnpPaTh2ZDNkM0xtZHZiMmRzWlM1amIyMHZjbVZrYVhKbFkzUnpMM0psWkdseVpXTjBNU0pkTENKemIyWjBkMkZ5WlY5eWIyeGxjeUk2V3lKUVNWTlFJaXdpUVVsVFVDSXNJa05DVUVsSklsMHNJbTl5WjJGdWFYTmhkR2x2Ymw5amIyMXdaWFJsYm5SZllYVjBhRzl5YVhSNVgyTnNZV2x0Y3lJNmV5SmhkWFJvYjNKcGRIbGZhV1FpT2lKUFFrZENVaUlzSW5KbFoybHpkSEpoZEdsdmJsOXBaQ0k2SWxWdWEyNXZkMjR3TURFMU9EQXdNREF4U0ZGUmNscEJRVmdpTENKemRHRjBkWE1pT2lKQlkzUnBkbVVpTENKaGRYUm9iM0pwYzJGMGFXOXVjeUk2VzNzaWJXVnRZbVZ5WDNOMFlYUmxJam9pUjBJaUxDSnliMnhsY3lJNld5SlFTVk5RSWl3aVFVbFRVQ0lzSWtOQ1VFbEpJbDE5TEhzaWJXVnRZbVZ5WDNOMFlYUmxJam9pU1VVaUxDSnliMnhsY3lJNld5SlFTVk5RSWl3aVEwSlFTVWtpTENKQlNWTlFJbDE5TEhzaWJXVnRZbVZ5WDNOMFlYUmxJam9pVGt3aUxDSnliMnhsY3lJNld5SlFTVk5RSWl3aVFVbFRVQ0lzSWtOQ1VFbEpJbDE5WFgwc0luTnZablIzWVhKbFgyeHZaMjlmZFhKcElqb2lhSFIwY0hNNkx5OTNkM2N1WjI5dloyeGxMbU52YlNJc0ltOXlaMTl6ZEdGMGRYTWlPaUpCWTNScGRtVWlMQ0p2Y21kZmFXUWlPaUl3TURFMU9EQXdNREF4U0ZGUmNscEJRVmdpTENKdmNtZGZibUZ0WlNJNklsZFRUeklnS0ZWTEtTQk1TVTFKVkVWRUlpd2liM0puWDJOdmJuUmhZM1J6SWpwYmV5SnVZVzFsSWpvaVZHVmphRzVwWTJGc0lpd2laVzFoYVd3aU9pSnpZV05vYVc1cGMwQjNjMjh5TG1OdmJTSXNJbkJvYjI1bElqb2lLemswTnpjME1qYzBNemMwSWl3aWRIbHdaU0k2SWxSbFkyaHVhV05oYkNKOUxIc2libUZ0WlNJNklrSjFjMmx1WlhOeklpd2laVzFoYVd3aU9pSnpZV05vYVc1cGMwQjNjMjh5TG1OdmJTSXNJbkJvYjI1bElqb2lLemswTnpjME1qYzBNemMwSWl3aWRIbHdaU0k2SWtKMWMybHVaWE56SW4xZExDSnZjbWRmYW5kcmMxOWxibVJ3YjJsdWRDSTZJbWgwZEhCek9pOHZhMlY1YzNSdmNtVXViM0JsYm1KaGJtdHBibWQwWlhOMExtOXlaeTUxYXk4d01ERTFPREF3TURBeFNGRlJjbHBCUVZndk1EQXhOVGd3TURBd01VaFJVWEphUVVGWUxtcDNhM01pTENKdmNtZGZhbmRyYzE5eVpYWnZhMlZrWDJWdVpIQnZhVzUwSWpvaWFIUjBjSE02THk5clpYbHpkRzl5WlM1dmNHVnVZbUZ1YTJsdVozUmxjM1F1YjNKbkxuVnJMekF3TVRVNE1EQXdNREZJVVZGeVdrRkJXQzl5WlhadmEyVmtMekF3TVRVNE1EQXdNREZJVVZGeVdrRkJXQzVxZDJ0eklpd2ljMjltZEhkaGNtVmZhbmRyYzE5bGJtUndiMmx1ZENJNkltaDBkSEJ6T2k4dmEyVjVjM1J2Y21VdWIzQmxibUpoYm10cGJtZDBaWE4wTG05eVp5NTFheTh3TURFMU9EQXdNREF4U0ZGUmNscEJRVmd2YjFFMFMyOWhZWFp3VDNWdlJUZHlkbEZ6V2tWUFZpNXFkMnR6SWl3aWMyOW1kSGRoY21WZmFuZHJjMTl5WlhadmEyVmtYMlZ1WkhCdmFXNTBJam9pYUhSMGNITTZMeTlyWlhsemRHOXlaUzV2Y0dWdVltRnVhMmx1WjNSbGMzUXViM0puTG5Wckx6QXdNVFU0TURBd01ERklVVkZ5V2tGQldDOXlaWFp2YTJWa0wyOVJORXR2WVdGMmNFOTFiMFUzY25aUmMxcEZUMVl1YW5kcmN5SXNJbk52Wm5SM1lYSmxYM0J2YkdsamVWOTFjbWtpT2lKb2RIUndjem92TDNkM2R5NW5iMjluYkdVdVkyOXRJaXdpYzI5bWRIZGhjbVZmZEc5elgzVnlhU0k2SW1oMGRIQnpPaTh2ZDNkM0xtZHZiMmRzWlM1amIyMGlMQ0p6YjJaMGQyRnlaVjl2Ymw5aVpXaGhiR1pmYjJaZmIzSm5Jam9pVjFOUE1pQlBjR1Z1SUVKaGJtdHBibWNpZlEuUFR3MXJ5bnFvZXlleFlRbmxnSkdtal9WRFF3cmtHRnRmX2VnVlowRGVBeVEtZDNmQTZ5dVBGSmZOMThxOGQ4NE1ST19fc3p0MFE0bnh6T2hSblRBUExseFhvdWZZWE5lemhibVFpd1JNV2VQdnkyRFl2cnpxSXlZS3NITGxla09vS3h5dmxsVWVHZkIwUWhUYWdGNHFTd3hic2IzcUFlV2YyOFIyQUdJdzN1U1VXekg2UG9WY1hWUGQxSGkxTWtGck1TaWlpNEpOY2xqNl9USVpFQ3pfclJIcGYzLWNXaUE2Z0ZMRTJFY2tYemhwRmpWQ3B0UG5XMFo5bFV4ajdLdWNWSlZQMTQtMTMxM09ISmRKaERvalhRTUFrZmtHd2IweXh6NjNZeko4ckttZ016STlxMWJCa0RYd1lQVDU2Z2dEaXhnYmVMS09SQzFlYzFscUZIS0t3In0.Vkhyhk_zLJ3TywuOKQ9ZpwTTpxQjyCXfAML-DXsFyrlPy-kRVpX2uSdujjmKhVqFLDvlMzB4-IqUEQBIQWAOMnbwTjWosanjQv8WwSVCXjk-rBbCAjXf04IKZMrTp4gnWOaNeacy_IpOhkZ3F8bTRHPI5jrKFZi_W020X6cobPy16CYC41aGSb06wBcCLjXmkSckMcTmN6_krNs0Pp02TIG9cSxbnyThlpgmwJc_ub8dxstJ1_Y_6PWTLzs2ArBow-kc8mp3TL9x7z8OHkEUeK0lIiHiorYQI5L_rb55Xhbpu22rIHVnBVo2Sg8ucCxoN02vZusfZbLBUClGYGDNfA' 
    ```

- The payload is a signed JWT in the following format:
``` json
{
      "typ": "JWT",
      "kid": "h3ZCF0VrzgXgnHCqbHbKXzzfjTg",
      "alg": "PS256"
}
{
      "iss": "oQ4KoaavpOuoE7rvQsZEOV",
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
      "software_id": "oQ4KoaavpOuoE7rvQsZEOV",
      "redirect_uris": [
        "https://www.mockcompany.com/redirects/redirect1"
      ],
      "software_statement": "eyJhbGciOiJQUzI1NiIsImtpZCI6ImgzWkNGMFZyemdYZ25IQ3FiSGJLWHp6ZmpUZyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJPcGVuQmFua2luZyBMdGQiLCJpYXQiOjE2NDc0MDU5NDAsImp0aSI6IjM2YjVkZmUwMjA1YzQwNjAiLCJzb2Z0d2FyZV9lbnZpcm9ubWVudCI6InNhbmRib3giLCJzb2Z0d2FyZV9tb2RlIjoiVGVzdCIsInNvZnR3YXJlX2lkIjoib1E0S29hYXZwT3VvRTdydlFzWkVPViIsInNvZnR3YXJlX2NsaWVudF9pZCI6Im9RNEtvYWF2cE91b0U3cnZRc1pFT1YiLCJzb2Z0d2FyZV9jbGllbnRfbmFtZSI6IldTTzIgT3BlbiBCYW5raW5nIFRQUDIgKFNhbmRib3gpIiwic29mdHdhcmVfY2xpZW50X2Rlc2NyaXB0aW9uIjoiV1NPMiBPcGVuIEJhbmtpbmcgVFBQMiBmb3IgdGVzdGluZyIsInNvZnR3YXJlX3ZlcnNpb24iOjEuNSwic29mdHdhcmVfY2xpZW50X3VyaSI6Imh0dHBzOi8vd3d3Lmdvb2dsZS5jb20iLCJzb2Z0d2FyZV9yZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vcmVkaXJlY3RzL3JlZGlyZWN0MSJdLCJzb2Z0d2FyZV9yb2xlcyI6WyJQSVNQIiwiQUlTUCIsIkNCUElJIl0sIm9yZ2FuaXNhdGlvbl9jb21wZXRlbnRfYXV0aG9yaXR5X2NsYWltcyI6eyJhdXRob3JpdHlfaWQiOiJPQkdCUiIsInJlZ2lzdHJhdGlvbl9pZCI6IlVua25vd24wMDE1ODAwMDAxSFFRclpBQVgiLCJzdGF0dXMiOiJBY3RpdmUiLCJhdXRob3Jpc2F0aW9ucyI6W3sibWVtYmVyX3N0YXRlIjoiR0IiLCJyb2xlcyI6WyJQSVNQIiwiQUlTUCIsIkNCUElJIl19LHsibWVtYmVyX3N0YXRlIjoiSUUiLCJyb2xlcyI6WyJQSVNQIiwiQ0JQSUkiLCJBSVNQIl19LHsibWVtYmVyX3N0YXRlIjoiTkwiLCJyb2xlcyI6WyJQSVNQIiwiQUlTUCIsIkNCUElJIl19XX0sInNvZnR3YXJlX2xvZ29fdXJpIjoiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbSIsIm9yZ19zdGF0dXMiOiJBY3RpdmUiLCJvcmdfaWQiOiIwMDE1ODAwMDAxSFFRclpBQVgiLCJvcmdfbmFtZSI6IldTTzIgKFVLKSBMSU1JVEVEIiwib3JnX2NvbnRhY3RzIjpbeyJuYW1lIjoiVGVjaG5pY2FsIiwiZW1haWwiOiJzYWNoaW5pc0B3c28yLmNvbSIsInBob25lIjoiKzk0Nzc0Mjc0Mzc0IiwidHlwZSI6IlRlY2huaWNhbCJ9LHsibmFtZSI6IkJ1c2luZXNzIiwiZW1haWwiOiJzYWNoaW5pc0B3c28yLmNvbSIsInBob25lIjoiKzk0Nzc0Mjc0Mzc0IiwidHlwZSI6IkJ1c2luZXNzIn1dLCJvcmdfandrc19lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxSFFRclpBQVgvMDAxNTgwMDAwMUhRUXJaQUFYLmp3a3MiLCJvcmdfandrc19yZXZva2VkX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC9yZXZva2VkLzAwMTU4MDAwMDFIUVFyWkFBWC5qd2tzIiwic29mdHdhcmVfandrc19lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxSFFRclpBQVgvb1E0S29hYXZwT3VvRTdydlFzWkVPVi5qd2tzIiwic29mdHdhcmVfandrc19yZXZva2VkX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC9yZXZva2VkL29RNEtvYWF2cE91b0U3cnZRc1pFT1YuandrcyIsInNvZnR3YXJlX3BvbGljeV91cmkiOiJodHRwczovL3d3dy5nb29nbGUuY29tIiwic29mdHdhcmVfdG9zX3VyaSI6Imh0dHBzOi8vd3d3Lmdvb2dsZS5jb20iLCJzb2Z0d2FyZV9vbl9iZWhhbGZfb2Zfb3JnIjoiV1NPMiBPcGVuIEJhbmtpbmcifQ.PTw1rynqoeyexYQnlgJGmj_VDQwrkGFtf_egVZ0DeAyQ-d3fA6yuPFJfN18q8d84MRO__szt0Q4nxzOhRnTAPLlxXoufYXNezhbmQiwRMWePvy2DYvrzqIyYKsHLlekOoKxyvllUeGfB0QhTagF4qSwxbsb3qAeWf28R2AGIw3uSUWzH6PoVcXVPd1Hi1MkFrMSiii4JNclj6_TIZECz_rRHpf3-cWiA6gFLE2EckXzhpFjVCptPnW0Z9lUxj7KucVJVP14-1313OHJdJhDojXQMAkfkGwb0yxz63YzJ8rKmgMzI9q1bBkDXwYPT56ggDixgbeLKORC1ec1lqFHKKw"
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
   "software_id":"oQ4KoaavpOuoE7rvQsZEOV",
   "token_endpoint_auth_method":"private_key_jwt",
   "software_statement":"eyJhbGciOiJQUzI1NiIsImtpZCI6ImgzWkNGMFZyemdYZ25IQ3FiSGJLWHp6ZmpUZyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJPcGVuQmFua2luZyBMdGQiLCJpYXQiOjE2NDc0MDU5NDAsImp0aSI6IjM2YjVkZmUwMjA1YzQwNjAiLCJzb2Z0d2FyZV9lbnZpcm9ubWVudCI6InNhbmRib3giLCJzb2Z0d2FyZV9tb2RlIjoiVGVzdCIsInNvZnR3YXJlX2lkIjoib1E0S29hYXZwT3VvRTdydlFzWkVPViIsInNvZnR3YXJlX2NsaWVudF9pZCI6Im9RNEtvYWF2cE91b0U3cnZRc1pFT1YiLCJzb2Z0d2FyZV9jbGllbnRfbmFtZSI6IldTTzIgT3BlbiBCYW5raW5nIFRQUDIgKFNhbmRib3gpIiwic29mdHdhcmVfY2xpZW50X2Rlc2NyaXB0aW9uIjoiV1NPMiBPcGVuIEJhbmtpbmcgVFBQMiBmb3IgdGVzdGluZyIsInNvZnR3YXJlX3ZlcnNpb24iOjEuNSwic29mdHdhcmVfY2xpZW50X3VyaSI6Imh0dHBzOi8vd3d3Lmdvb2dsZS5jb20iLCJzb2Z0d2FyZV9yZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vcmVkaXJlY3RzL3JlZGlyZWN0MSJdLCJzb2Z0d2FyZV9yb2xlcyI6WyJQSVNQIiwiQUlTUCIsIkNCUElJIl0sIm9yZ2FuaXNhdGlvbl9jb21wZXRlbnRfYXV0aG9yaXR5X2NsYWltcyI6eyJhdXRob3JpdHlfaWQiOiJPQkdCUiIsInJlZ2lzdHJhdGlvbl9pZCI6IlVua25vd24wMDE1ODAwMDAxSFFRclpBQVgiLCJzdGF0dXMiOiJBY3RpdmUiLCJhdXRob3Jpc2F0aW9ucyI6W3sibWVtYmVyX3N0YXRlIjoiR0IiLCJyb2xlcyI6WyJQSVNQIiwiQUlTUCIsIkNCUElJIl19LHsibWVtYmVyX3N0YXRlIjoiSUUiLCJyb2xlcyI6WyJQSVNQIiwiQ0JQSUkiLCJBSVNQIl19LHsibWVtYmVyX3N0YXRlIjoiTkwiLCJyb2xlcyI6WyJQSVNQIiwiQUlTUCIsIkNCUElJIl19XX0sInNvZnR3YXJlX2xvZ29fdXJpIjoiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbSIsIm9yZ19zdGF0dXMiOiJBY3RpdmUiLCJvcmdfaWQiOiIwMDE1ODAwMDAxSFFRclpBQVgiLCJvcmdfbmFtZSI6IldTTzIgKFVLKSBMSU1JVEVEIiwib3JnX2NvbnRhY3RzIjpbeyJuYW1lIjoiVGVjaG5pY2FsIiwiZW1haWwiOiJzYWNoaW5pc0B3c28yLmNvbSIsInBob25lIjoiKzk0Nzc0Mjc0Mzc0IiwidHlwZSI6IlRlY2huaWNhbCJ9LHsibmFtZSI6IkJ1c2luZXNzIiwiZW1haWwiOiJzYWNoaW5pc0B3c28yLmNvbSIsInBob25lIjoiKzk0Nzc0Mjc0Mzc0IiwidHlwZSI6IkJ1c2luZXNzIn1dLCJvcmdfandrc19lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxSFFRclpBQVgvMDAxNTgwMDAwMUhRUXJaQUFYLmp3a3MiLCJvcmdfandrc19yZXZva2VkX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC9yZXZva2VkLzAwMTU4MDAwMDFIUVFyWkFBWC5qd2tzIiwic29mdHdhcmVfandrc19lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxSFFRclpBQVgvb1E0S29hYXZwT3VvRTdydlFzWkVPVi5qd2tzIiwic29mdHdhcmVfandrc19yZXZva2VkX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC9yZXZva2VkL29RNEtvYWF2cE91b0U3cnZRc1pFT1YuandrcyIsInNvZnR3YXJlX3BvbGljeV91cmkiOiJodHRwczovL3d3dy5nb29nbGUuY29tIiwic29mdHdhcmVfdG9zX3VyaSI6Imh0dHBzOi8vd3d3Lmdvb2dsZS5jb20iLCJzb2Z0d2FyZV9vbl9iZWhhbGZfb2Zfb3JnIjoiV1NPMiBPcGVuIEJhbmtpbmcifQ.PTw1rynqoeyexYQnlgJGmj_VDQwrkGFtf_egVZ0DeAyQ-d3fA6yuPFJfN18q8d84MRO__szt0Q4nxzOhRnTAPLlxXoufYXNezhbmQiwRMWePvy2DYvrzqIyYKsHLlekOoKxyvllUeGfB0QhTagF4qSwxbsb3qAeWf28R2AGIw3uSUWzH6PoVcXVPd1Hi1MkFrMSiii4JNclj6_TIZECz_rRHpf3-cWiA6gFLE2EckXzhpFjVCptPnW0Z9lUxj7KucVJVP14-1313OHJdJhDojXQMAkfkGwb0yxz63YzJ8rKmgMzI9q1bBkDXwYPT56ggDixgbeLKORC1ec1lqFHKKw"
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
