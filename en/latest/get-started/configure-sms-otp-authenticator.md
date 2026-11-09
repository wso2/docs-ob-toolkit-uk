# Configure SMS OTP Authenticator

This document provides step by step instructions to set up SMS OTP configurations.

## Configuring deployment.toml[​](#configuring-deploymenttoml "Direct link to Configuring deployment.toml")

1. Open `<IS_HOME>/repository/conf/deployment.toml` file and configure the authenticator configurations as follows.

   ```
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

   ```
   ./wso2server.sh 
   ```

## Sign in to the Identity Server[​](#sign-in-to-the-identity-server "Direct link to Sign in to the Identity Server")

1. Sign in to the Management Console of WSO2 Identity Server at <https://localhost:9446/carbon>.

2. Use the default super admin credentials as follows:

   * Username: <admin@wso2.com>
   * Password: wso2123

   note

   The above login credentials are for testing purposes only. It is recommended to change the login credentials in a production environment.

### Step 1: Adding SMS OTP Identity Provider[​](#step-1-adding-sms-otp-identity-provider "Direct link to Step 1: Adding SMS OTP Identity Provider")

1. Go to the **Main menu > Identity > Identity Providers > Add**.

   ![add\_identity\_providers](/en/latest/assets/images/go-to-add-identity-providers-a9e037f39a025d62266a97b615f940f6.png)

2. Fill the **Basic Information** section and name this identity provider as **SMSAuthentication**.

   ![sms\_authentication\_idp](/en/latest/assets/images/sms-authentication-idp-c4333f9b242ef10198eabc4b583b1d15.png)

3. Expand the **Federated Authenticators** > **SMS OTP Configuration** section.

   ![expand\_federated\_authenticators](/en/latest/assets/images/expand-federated-authenticators-513691fd19ee4c48345b2c7141efaf08.png)

4. Select both the **Enable** and **Default** checkboxes. This is to enable and make the **SMSAuthentication** authenticator the default one.

   ![config\_sms\_otp](/en/latest/assets/images/config-sms-otp-4cca1311ea238914628946250ea47e5a.png)

5. Based on your **SMS provider**, fill out the SMS OTP configurations.

   * If Twilio is used as the SMS provider, go to <https://www.twilio.com/try-twilio> and create an account.

   * While registering the account, verify your mobile number and click on console home <https://www.twilio.com/console> to get free credits (Account SID and Auth Token).

   * Twilio uses a POST method with headers and the text message and phone number are sent as the payload.

6. Add the following sample configurations and click **Register**.

   * Format
   * Sample

   ```
   SMS URL : https://api.twilio.com/2010-04-01/Accounts/%7BAccountSID%7D/SMS/Messages.json

   HTTP Headers : Authorization: Basic base64{AccountSID:AuthToken}

   HTTP Payloads : Body=$ctx.msg&To=$ctx.num&From=urlencode{TrialNumber}

   HTTP Method : POST
   ```

   ```
   SMS URL : https://api.twilio.com/2010-04-01/Accounts/AC34f40df03e20fb6498b3fcee256ebd3b/SMS/Messages.json

   HTTP Headers : Authorization: Basic QUMzNGY0MGRmMDNlMjBmYjY0OThiM2ZjZWUyNTZlYmQzYjo1ZmFkM2VkYzg4YWM1NTNiMmFiZjc4 NWI1MmM4MWFkYg==

   HTTP Payloads : Body=$ctx.msg&To=$ctx.num&From=+1 210-880-1806

   HTTP Method : POST
   ```

### Step 2: Configuring Account Lock[​](#step-2-configuring-account-lock "Direct link to Step 2: Configuring Account Lock")

1. Go to the **Main menu** > **Identity** > **Identity Providers** > **Resident** > **Login Attempt Security** > **Account Lock**.

   ![select\_resident\_identity](/en/latest/assets/images/go-to-resident-identity-providers-0e72c74f6200c2a9eb847cd35fb8ca9c.png)

   ![security\_account\_lock](data:image/png;base64,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)

2. Select the **Lock User Accounts** checkbox.

   ![maximum\_login\_attempts](/en/latest/assets/images/maximum-failed-login-attempts-63b44434c82c480bf58999369248d1b1.png)

3. Configure the **Maximum Failed Login Attempts**.

4. Scroll down and click **Update**.

### Step 3: Configure mobile as a mandatory claim[​](#step-3-configure-mobile-as-a-mandatory-claim "Direct link to Step 3: Configure mobile as a mandatory claim")

1. On the **Main menu > Identity > Claims > List**.

   ![select\_claims\_lists](/en/latest/assets/images/go-to-claims-lists-ebcd4a92b270d9f3d5066f3368d72a60.png)

2. Select `http://wso2.org/claims` from the list.

   ![claim\_list](/en/latest/assets/images/update-claims-8bb683c80b441e5076b2f8d3386d209d.png)

3. Locate **Mobile** from the list and select **Edit**.

   ![locate\_mobile](/en/latest/assets/images/locate-mobile-17d43a5f7b1aa7c637a31a6c9103a87c.png)

4. Select **Required** and click **Update**.

   ![update\_claim\_details](/en/latest/assets/images/update-local-claim-details-37fdb1641b67cb16a228a7ff8849fd83.png)

   More on Login Information...

   In the authentication flow, if you log in as an admin user, it will prompt for the mobile number in the first attempt to log in. The Mobile number should be given in the format of the following example - 94714564567.

   note

   Test scenarios can include attempting to log in using invalid usernames more than the allowed number of times, attempting invalid OTPs more than the allowed number of times, etc.
