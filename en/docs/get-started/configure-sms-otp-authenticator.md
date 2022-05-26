This document provides step by step instructions to set up SMS OTP configurations.

## Configuring deployment.toml

1. Open `<IS_HOME>/repository/conf/deployment.toml` file and configure the authenticator configurations as follows.

     ``` toml
     [open_banking.sca.idp]
     name = "SMSAuthentication"
     ```

2. Open `<IS_HOME>/repository/conf/common.auth.script.js` file and update the configurations as follows.

    ```
    var psuChannel = 'Online Banking';
   
    var onLoginRequest = function(context) {
        publishAuthData(context, "AuthenticationAttempted", {
            'psuChannel': psuChannel
        });
        executeStep(1, {
            onSuccess: function(context) {
                Log.info("Authentication Successful");
                publishAuthData(context, "AuthenticationSuccessful", {
                    'psuChannel': psuChannel
                });
                OTPFlow(context);
            },
            onFail: function(context) {
                Log.info("Authentication Failed");
                publishAuthData(context, "AuthenticationFailed", {
                    'psuChannel': psuChannel
                });
            }
        });
    };
   
    var OTPFlow = function(context) {
        executeStep(2, {
            //OTP-authentication
            onSuccess: function(context) {
                context.selectedAcr = "urn:openbanking:psd2:sca";
                publishAuthData(context, "AuthenticationSuccessful", {
                    'psuChannel': psuChannel
                });
            },
            onFail: function(context) {
                publishAuthData(context, "AuthenticationFailed", {
                    'psuChannel': psuChannel
                });
                OTPFlow(context);
            }
        });
    };
    ```

3. Run the following command in `<IS_HOME>/bin` and restart the server.

     ``` bash
     ./wso2server.sh 
     ```

## Sign in to the Identity Server

1. Sign in to the Management Console of WSO2 Identity Server at [https://localhost:9446/carbon](https://localhost:9446/carbon).

2. Use the default super admin credentials as follows:
    - Username: admin@wso2.com
    - Password: wso2123

    !!!note
        The above login credentials are for testing purposes only. It is recommended to change the login credentials in
        a production environment.

### Step 1: Adding SMS OTP Identity Provider

1. Go to the **Main menu > Identity > Identity Providers > Add**.

    ![add_identity_providers](../assets/img/get-started/quick-start-guide/go-to-add-identity-providers.png)

2. Fill the **Basic Information** section and name this identity provider as **SMSAuthentication**.

    ![sms_authentication_idp](../assets/img/get-started/quick-start-guide/sms-authentication-idp.png)

3. Expand the **Federated Authenticators** > **SMS OTP Configuration** section.

    ![expand_federated_authenticators](../assets/img/get-started/quick-start-guide/expand-federated-authenticators.png)

4. Select both the **Enable** and **Default** checkboxes. This is to enable and make the **SMSAuthentication** authenticator the default one.

    ![config_sms_otp](../assets/img/get-started/quick-start-guide/config-sms-otp.png)

5. Based on your **SMS provider**, fill out the SMS OTP configurations.

    - If Twilio is used as the SMS provider, go to [https://www.twilio.com/try-twilio](https://www.twilio.com/try-twilio) and create an account.

    - While registering the account, verify your mobile number and click on console home [https://www.twilio.com/console](https://www.twilio.com/console)
      to get free credits (Account SID and Auth Token).

    - Twilio uses a POST method with headers and the text message and phone number are sent as the payload.

6. Add the following sample configurations and click **Register**.

     ``` tab="Format"
     SMS URL : https://api.twilio.com/2010-04-01/Accounts/%7BAccountSID%7D/SMS/Messages.json
     HTTP Headers : Authorization: Basic base64{AccountSID:AuthToken}
     HTTP Payloads : Body=$ctx.msg&To=$ctx.num&From=urlencode{TrialNumber}
     HTTP Method : POST
     ```

     ``` tab="Sample"
     SMS URL : https://api.twilio.com/2010-04-01/Accounts/AC34f40df03e20fb6498b3fcee256ebd3b/SMS/Messages.json
     HTTP Headers : Authorization: Basic QUMzNGY0MGRmMDNlMjBmYjY0OThiM2ZjZWUyNTZlYmQzYjo1ZmFkM2VkYzg4YWM1NTNiMmFiZjc4 NWI1MmM4MWFkYg==
     HTTP Payloads : Body=$ctx.msg&To=$ctx.num&From=+1 210-880-1806
     HTTP Method : POST
     ```

### Step 2: Configuring Account Lock

1. Go to the **Main menu** > **Identity** > **Identity Providers** > **Resident** > **Login Attempt Security** > **Account Lock**.

    ![select_resident_identity](../assets/img/get-started/quick-start-guide/go-to-resident-identity-providers.png)

    ![security_account_lock](../assets/img/get-started/quick-start-guide/login-security-account-lock.png)

2. Select the **Lock User Accounts** checkbox.

    ![maximum_login_attempts](../assets/img/get-started/quick-start-guide/maximum-failed-login-attempts.png)

3. Configure the **Maximum Failed Login Attempts**.

4. Scroll down and click **Update**.

### Step 3: Making Mobile Phone a Mandatory Claim

1. Go to the **Main menu** > **Identity** > **Claims** > **List** > **http://wso2.org/claims** > **Mobile** > **Edit**.

    ![select_claims_lists](../assets/img/get-started/quick-start-guide/go-to-claims-lists.png)

    ![edit_mobile_claim](../assets/img/get-started/quick-start-guide/edit-mobile-claim.png)

2. Select `http://wso2.org/claims` from the list.

    ![claim_list](../assets/img/get-started/quick-start-guide/update-claims.png)

3. Select the **Required** checkbox.

    ![update_claim_details](../assets/img/get-started/quick-start-guide/update-local-claim-details.png)

4. Scroll down and click **Update**.

    !!! tip "More on Login Information..."
        In the authentication flow, if you log in as an admin user, it will prompt for the mobile number in the first
        attempt to log in. The Mobile number should be given in the format of the following example - 94714564567.

    !!!note
        Test  scenarios can include attempting to log in using invalid usernames more than the allowed number of times, attempting
        invalid OTPs more than the allowed number of times, etc.