##Configuring VRP in WSO2 API Manager

1. Open the `<APIM_HOME>/repository/conf/deployment.toml` file.

2. Add the following tag and configure the URL with the hostname of the Identity Server:

    ```toml
    open_banking_uk.consent.vrp_response_data_store_url = https://<IS_HOST>:9446/api/openbanking/consent/manage/vrp-response-process
    ```

3. Configure the given executor:

    ```toml
    [[open_banking.gateway.openbanking_gateway_executors.type.executors]]
    name = "com.wso2.openbanking.uk.gateway.executors.vrp.UKVRPResponseExecutor"
    priority = 8
    ```
4. Configure the Variable Reccuring API to support JWS Signature Validation.
    ```toml
    [[open_banking.uk.jws_signature.signature_validation.mandated_apis]]
    api_context = "/open-banking/v3.1/vrp"
    ```
    
5. Configure the Variable Reccuring API to support JWS Response Signing.
    ```toml
    [[open_banking.uk.jws_signature.response_signing.response_sig_required_apis]]
    api_context = "/open-banking/v3.1/vrp"
    ```

6. Save changes and restart the server.

##Configuring VRP in WSO2 Identity Server

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Add the following tag under `[open_banking_uk.consent]` and configure the URL with the hostname of the API Manager:

    ```toml 
    vrp_consent_self_link = "https://localhost:8243/open-banking/{version}/vrp/"
    ```
    
3. Save changes and restart the server.
