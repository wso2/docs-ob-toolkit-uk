WSO2 Open Banking UK Toolkit contains TOML-based configurations. All the server-level configurations of the Identity 
Server instance can be applied using a single configuration file, which is the `deployment.toml` file. 

## Configuring deployment.toml

Follow the steps below to configure the `deployment.toml` file and set up the open banking flow for WSO2 Identity Server.

1. Replace the `deployment.toml` file as explained in the 
[Setting up the servers](setting-up-servers.md#copying-the-deploymenttoml) section.
 
2. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

3. Set the hostname of the Identity Server:

    ``` toml
    [server]	
    hostname = "<IS_HOST>"	 
    ```
   
4. Update the datasource configurations with your database properties, such as the username, password, JDBC URL for the 
database server, and the JDBC driver. 

    - Given below are sample configurations for a MySQL database. For other DBMS types and more information, 
    see [Setting up databases](setting-up-databases.md).

    ```toml tab='shared_db'
    [database.shared_db]
    url = "jdbc:mysql://localhost:3306/openbank_govdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```
   
    ```toml tab='identity_db'
    [database.identity_db]
    url = "jdbc:mysql://localhost:3306/openbank_apimgtdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```
     
    ```toml tab='config'
    [database.config]
    url = "jdbc:mysql://localhost:3306/openbank_iskm_configdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```
    
    ```toml tab='user'
    [database.user]
    url = "jdbc:mysql://localhost:3306/openbank_userdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```
    
    ```toml tab='WSO2OB_DB'
    [[datasource]]
    id="WSO2OB_DB"
    url = "jdbc:mysql://localhost:3306/openbank_openbankingdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```

5. Configure the authentication endpoints with the hostname of the Identity Server.

    ``` toml
    [authentication.endpoints]	
    login_url = "https://<IS_HOST>:9446/authenticationendpoint/login.do"	
    retry_url = "https://<IS_HOST>:9446/authenticationendpoint/retry.do"
    ```
   
    ``` toml
    [oauth.endpoints]	
    oauth2_consent_page = "${carbon.protocol}://<IS_HOST>:${carbon.management.port}/ob/authenticationendpoint/oauth2_authz.do"	
    oidc_consent_page = "${carbon.protocol}://<IS_HOST>:${carbon.management.port}/ob/authenticationendpoint/oauth2_consent.do"
    ```
   
6. Configure the following endpoints for the `token_revocation` event listener:
 
    - Configure `TokenEndpointAlias` with the hostname of the Identity Server.
    - Configure `notification_endpoint` with the hostname of the API Manager.  

    ``` toml
    [[event_listener]]	
    id = "token_revocation"	
    ...
    [event_listener.properties]
    TokenEndpointAlias= "https://<IS_HOST>:9446/oauth2/token"	
    notification_endpoint = "https://<APIM_HOST>:9443/internal/data/v1/notify"	
    ```

7. Add and configure the following tags:
    - `signing_certificate_kid`: Configure the `kid` value for the signing certificate of the bank. The same value is 
    configured as the `kid` value of the ID Token.
    - `client_transport_cert_as_header_enabled`: To send the client certificate as a transport header, set this to `true`.

    ``` toml
    [open_banking.identity]
    signing_certificate_kid="123"
    client_transport_cert_as_header_enabled = true
    ```

8. Configure the event publisher URL for adaptive authentication with the hostname of the Identity Server.

    ``` toml
    [authentication.adaptive.event_publisher]	
    url = "http://<IS_HOST>:8006/"
    ```

9. Update access control configurations for the `consentmgr` resource as follows: 

    ``` toml
    [[resource.access_control]]
    context = "(.*)/consentmgr(.*)"
    secure="false"
    http_method="GET,DELETE"
    ```
   
10. Configure the endpoints to retrieve sharable and payable accounts. This is required when displaying the accounts on 
the consent page.

    ``` toml
    [open_banking_uk.consent]
    payable_account_retrieval_endpoint = "http://<APIM_HOST>:9763/api/openbanking/uk/backend/services/bankaccounts/bankaccountservice/payable-accounts"
    sharable_account_retrieval_endpoint = "http://<APIM_HOST>:9763/api/openbanking/uk/backend/services/bankaccounts/bankaccountservice/sharable-accounts"
    ```

11. To generate the self link in the consent JSON response, configure the URLs of the exposed APIs as follows:
   
    ``` toml
    [open_banking_uk.consent]
    account_consent_self_link = "https://<APIM_HOST>:8243/open-banking/{version}/aisp/"
    payment_consent_self_link = "https://<APIM_HOST>:8243/open-banking/{version}/pisp/"
    cof_consent_self_link = "https://<APIM_HOST>:8243/open-banking/{version}/cbpii/"
    ```

12. In the consent re-authentication step of the Accounts flow, during authorisation, the PSU is allowed to change the 
selected account. To enable this feature and update the account bound to the consent, set the following property to true:

    ``` toml
    [open_banking_uk.consent]
    acc_update_by_psu_enabled = true
    ```

13. Enable Request-URI validation that validates `AccountID` in the request against the `AccountID` in consent during 
account retrieval. By default, this is disabled and the configuration is set to `false`.

    ``` toml
    [open_banking_uk.consent]
    Validate_acc_id_on_retrieval_enabled = true
    ```
    
14. To enable idempotency support for the Payments Initiation API:

    - Configure the allowed time duration for the Idempotency key in hours 
    - Replay and enable payment submission idempotency validation

    ``` toml
    [open_banking.consent.idempotency]
    enabled=true
    allowed_time_duration=1440
    ```

15. Add the given configuration to renew the access token and refresh token per each token request while revoking
    the existing active token for a matching combination of `clientid`, `user`, and `scopes`.

    !!! note
        The token renewal is not applicable when using the Refresh Token grant type and self-contained access tokens.

    ``` toml
    [oauth.token_renewal]
    renew_access_token_per_request = true
    ```

16. Previously the Open Banking Standard required the re-authentication of refresh tokens issued for Account and
    Transaction API when the token issue date has passed 90 days. With **Open Banking Standard v3.1.10**, this mandate has
    been removed. Therefore, according to your requirement, add the following tags:

    !!!note
        This is only available as a WSO2 Update from **WSO2 Open Banking API Manager UK Toolkit Level 1.0.0.5** and 
        **WSO2 Open Banking Identity Server UK Toolkit Level 1.0.0.5** onwards. For more information on updating, see 
        [Getting WSO2 Updates](setting-up-servers.md#getting-wso2-updates).

        If you already have a setup, perform a data migration for the exiting active account refresh tokens
        in the `IDN_OAUTH2_ACCESS_TOKEN` table in the `openbank_apimgtdb` database.

    ``` toml
    [open_banking.identity.extensions]
    response_type_handler = "com.wso2.openbanking.uk.identity.auth.extensions.response.handler.impl.UKResponseTypeHandler"

    [open_banking_uk.account.refresh_token]
    validity_period = 15555200
    last_authorized_date_limit = 90
    ```

17. If you want to use the [Data publishing](../learn/data-publishing.md) feature:

    - Enable the feature and configure the `server_url` and `auth_url` properties with the hostname of WSO2 Streaming 
    Integrator.

    ``` toml
    [open_banking.data_publishing]	
    enable = true	
    username="$ref{super_admin.username}@carbon.super"	
    password="$ref{super_admin.password}"	
    server_url = "{tcp://<SI_HOST>:7612}"	
    ```   
    
18. If you are using **WSO2 Identity Server 6.0.0**,

    1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
    2. Add below configuration to enable application role validation:

        ```toml
        [application_mgt]
        enable_role_validation = true
        ```

19. Configure a periodical consent expiration job as follows for v4 consents:

    ``` toml
    [open_banking.consent.periodical_expiration]
    # This property needs to be true in order to run the consent expiration periodical updater.
    enabled=true
    # Cron value for the periodical updater. "0 0 0 * * ?" cron will describe as 00:00:00am every day
    cron_value="0 0 0 * * ?"
    # This value to be update for expired consents.
    expired_consent_status_value="expired"
    # These consent statuses will only be consider when checking for expired consents. (Comma separated value list)
    eligible_statuses="authorised,awaitingAuthorisation"
    ```
    
    !!!note
        Updating consent statuses to expired is only applicable for v4 `accounts` and `CoF` consents.

        This is only available as a WSO2 Update from **WSO2 Open Banking Identity Server UK Toolkit Level 1.0.0.31** onwards. 
        For more information on updating, see [Getting WSO2 Updates](setting-up-servers.md#getting-wso2-updates).
    
        Please refer to the [Accelerator Configuring Identity Server](https://ob.docs.wso2.com/en/latest/install-and-setup/configuring-identity-server-for-ob/) 
        documentation for more information on consent expiration.


## Starting servers

??? warning "If you are using JDK 17 with WSO2 Identity Server 6.0.0, you need to enable adaptive authentication. Click here to see how it is done..."

     For JDK 17 runtime, adaptive authentication is disabled by default and it is required to enable adaptive authentication. To enable adaptive authentication: 

     1. Go to `<IS_HOME>/bin`. 
     2. Run the following command:

         ```toml tab='On Mac'
         ./adaptive.sh
         ```

         ```toml tab='On Windows'
         ./adaptive.bat
         ```

     See [Adaptive Authentication - Prerequisites](https://is.docs.wso2.com/en/6.0.0/guides/adaptive-auth/configure-adaptive-auth/#prerequisites) for more information.

1. Go to the `<IS_HOME>/bin` directory using a terminal.

2. Run the `wso2server.sh` script as follows:

    ``` bash
    ./wso2server.sh
    ``` 
