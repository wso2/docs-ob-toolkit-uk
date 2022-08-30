# Generating reports using summarized data

Using the `OB_REPORTING_SUMMARIZED_DB` datasource (`openbank_ob_reporting_summarizeddb` database) you can generate the 
following reports according to the OBIE templates:

## Template 1 - Performance and Availability (P&A) (OBIE)

| ID | Field Name | Table to refer | How to capture data |
| -- | ---------- | -------------- | ------------------- |
| 1 | Report Date | The respective table you retrieve the date from | Get the year-month-date values from the table |
| 2 | ASPSP Brand ID | N/A | A fixed value for a bank | 
| 3 | Endpoint ID | ENDPOINT_DETAILS | Download the SQL script from [here](https://docs.wso2.com/download/attachments/126577679/ENDPOINT_DETAILS.sql?api=v2) to create the ENDPOINT_DETAILS in your MS SQL database. A fixed value. Get the resource from the respective table and map that with the ENDPOINT_ID table. |
| 4 | Core/Non Core Hours | Either Core or Non-Core | This column should be either CORE or NON-CORE |
| 5 | Up Time | N/A| Need to get from an external tool |
| 6 | Planned Downtime | N/A | Value needs to be decided by the bank
| 7 | Unplanned Downtime | N/A | Need to get from an external tool |
| 8 | Median TTLB Response Time | PA_CORE or PA_NON_CORE | |
| 9 | Median TTFB Response Time | PA_CORE or PA_NON_CORE | |
| 10 | Median Response Payload Size |PA_CORE or PA_NON_CORE | |
| 11 | Max Payment Initiations Per Second (PIPS) | PAYMENT_INITIATION_DETAILS | Get the payment initiations per second per day |
| 12 | Average TTLB Response Time | PA_CORE or PA_NON_CORE | Get the AVG_TTLB value from the relevant table per day per time per endpoint |
| 13 | Average TTFB Response Time | PA_CORE or PA_NON_CORE | Get the AVG_TTFB value from the relevant table per day per time per endpoint |
| 14 | Total Number of API calls | PA_CORE or PA_NON_CORE | Get the TOTAL_API_CALLS value from the relevant table per day per time per endpoint.
| 15 | Total TTLB Response Time (Time to Last Byte) | PA_CORE or PA_NON_CORE | Get the TOTAL_TTLB value from the relevant table per day per time per endpoint |
| 16 | Total TTFB Response Time (Time to First Byte) | PA_CORE or PA_NON_CORE | Get the TOTAL_TTFB value from the relevant table per day per time per endpoint |
| 17 | Total ResponsePayload Size | PA_CORE or PA_NON_CORE | Get the TOTAL_RESPONSE_PAYLOAD_SIZE value from the relevant table per day per time per endpoint |
| 18 | Version | PA_CORE or PA_NON_CORE | Get the API_SPEC_VERSION value from the relevant table per day per time per endpoint |

## Template 2 - PSU Authentication & Interaction

| ID | Field Name | Table to refer | How to capture data |
| -- | ---------- | -------------- | ------------------- |
| 1 | ReportDate | The respective table you get the date from | Get the year-month-date values from the table |
| 2 | ASPSP Brand ID | N/A | A fixed value for a bank |
| 3 | API Type | PSU_AUTHENTICATION_INTERACTION | Get the REQUEST_TYPE value |
| 4 | Time C PSU Authentication & Interaction (ms) (OPTIONAL) | PSU_AUTHENTICATION_INTERACTION | Get the TOTAL_INTERACTION_TIME value |
| 5 | PSU Authentications & Interactions Volumes (OPTIONAL) | PSU_AUTHENTICATION_INTERACTION | Get the FLOW_COUNT value |
| 6 | Version | PSU_AUTHENTICATION_INTERACTION | Get the API_SPEC_VERSION value |

## Template 3 - Response Outliers (OBIE)

| ID | Field Name | Table to refer | How to capture data |
| -- | ---------- | -------------- | ------------------- |
| 1 | Report Date | The respective table you get the date from | Get the year-month-date values from the table |
| 2 | Time | The respective table that you get the time from | Get the hour-minute-second values from the table |
| 3 | ASPSP Brand ID | N/A | A fixed value for a bank |
| 4 | Endpoint ID | ENDPOINT_DETAILS | A fixed value. Get the resource from the respective table and map that with ENDPOINT_ID table |
| 5 | TTLB Response Time | RESPONSE_OUTLIER | Get the TTLB value per day per time per endpoint |
| 6 | TTFB Response Time | RESPONSE_OUTLIER | Get the TTFB value per day per time per endpoint |
| 7 | TPP Application ID | RESPONSE_OUTLIER | Get APP_SOFTWARE_ID value per day per time per endpoint |
| 8 | Response Payload Size | RESPONSE_OUTLIER | Get RESPONSE_PAYLOAD_SIZE value per day per time per endpoint |
| 9 | Version | RESPONSE_OUTLIER | Get API_SPEC_VERSION value per day per time per endpoint |

## Template 4 - Auth Efficacy (OBIE) (WIP)

| ID | Field Name | Table to refer | How to capture data |
| -- | ---------- | -------------- | ------------------- |
| 1 | Month | The respective table you get the month from | Get the year-month values from the table |
| 2 | ASPSP Brand ID | N/A | A fixed value for a bank |
| 3 | Authentication Type | The respective tables | AUTHENTICATION_APPROACH from each table |
| 4 | API Type | The respective tables | REQUEST_TYPE from each table |
| 5 | API Request TPP Channel | The respective tables | PSU_CHANNEL from each table |
| 6 | ASPSP Authentication Channel | N/A | The value should be web |
| 7 | Consents Requiring Authentication | CONSENT_REQ_AUTHENTICATION | Get the TOTAL_CONSENT_REQ_AUTHENTICATION value from the column |
| 8 | Authentications Attempted by PSUs | AUTHENTICATION_ATTEMPTED | Get the TOTAL_ATTEMPTS_TO_AUTHENTICATE value from the column |
| 9 | Authentications Abandoned by PSUs | | Get this data by deducting the value of TOTAL_ATTEMPTS_TO_AUTHENTICATE from the value of TOTAL_CONSENT_REQ_AUTHENTICATION |
| 10 | Authentications Succeeded | AUTHENTICATION_SUCCESSFUL | Get the SUCCESSFUL_AUTHENTICATIONS value from the column |
| 11 | Authentications Failed | | Get this data by deducting the value of SUCCESSFUL_ AUTHENTICATIONS from the value of TOTAL_ATTEMPTS_TO_AUTHENTICATE |
| 12 | Confirmations Required | CONFIRMATION_DETAILS | Get the AuthorisationRequired count per month |
| 13 | Confirmations Accepted by PSUs | CONFIRMATION_DETAILS | Get the Authorised count per month |
| 14 | Confirmations Rejected by PSUs | CONFIRMATION_DETAILS | Get the Rejected count per month |

## Template 5 - PSU Adoption (OBIE)

| ID | Field Name | Table to refer | How to capture data |
| -- | ---------- | -------------- | ------------------- |
| 1 | ReportMonth | The respective table you get the month from | Get the year-month values from the table |
| 2 | ASPSP Brand ID | N/A | A fixed value for a bank |
| 3 | Retail/Business PSUs | PSU_DETAILS, FIRST_TIME_USERS | The retail and business PSU details are available in the core banking system. The provided raw data tables include the PSU_IDs that can be used |
| 4 | PSUs used AIS Services for the first time | FIRST_TIME_USERS | The retail and business PSU details are available in the core banking system. The provided raw data tables include the PSU_IDs that used the AIS services for the first time. You can use the PSU_ID and get the PSU count that used the services for the first time in a particular month |
| 5 | PSUs used PIS Services for the first time | FIRST_TIME_USERS | The retail and business PSU details are available in the core banking system. The provided raw data tables include the PSU_IDs that used  the PIS services for the first time. You can use the PSU_ID and get the PSU count that used the services for the first time in a particular month |
| 6 | Total PSUs used AIS Services | PSU_DETAILS |The retail and business PSU details are available in the core banking system. The provided raw data tables include the PSU_IDs that used  the AIS services for the first time. You can use the PSU_ID and get the total PSU count that used the services for the first time in a particular month |
| 7 | Total PSUs used PIS Services | PSU_DETAILS | The retail and business PSU details are available in the core banking system. The provided raw data tables include the PSU_IDs that used  the PIS services for the first time. You can use the PSU_ID and get the total PSU count that used the services for the first time in a particular month |
| 8 | Unique PSUs used both AIS and PIS Services for the first time | FIRST_TIME_USERS | The retail and business PSU details are available in the core banking system. The provided raw data tables include the PSU_IDs that used  both AIS and PIS services for the first time. You can use the PSU_ID and get the PSU count that used the services for the first time in a particular month |
| 9 | Total unique PSUs used both AIS and PIS Services | PSU_DETAILS | The retail and business PSU details are available in the core banking system. The provided raw data tables include the PSU_IDs that used  both AIS and PIS services for the first time. You can use the PSU_ID and get the total PSU count that used the services for the first time in a particular month |
| 10 | Total new PSUs for Online Banking | FIRST_TIME_USERS | The retail and business PSU details are available in the core banking system. The provided raw data tables include the PSU_IDs that used Online Banking for the first time. You can use the PSU_ID and get the total PSU count that used Online Banking for the first time in a particular month |
| 11 | Total new PSUs for Mobile Banking | FIRST_TIME_USERS | The retail and business PSU details are available in the core banking system. The provided raw data tables include the PSU_IDs that used Mobile Banking for the first time. You can use the PSU_ID and get the total PSU count that used Mobile Banking for the first time in a particular month |
| 12 | Total number of PSUs used Online Banking | PSU_DETAILS | The retail and business PSU details are available in the core banking system. The provided raw data tables include the PSU_IDs that used Online Banking. You can use the PSU_ID and get the total PSU count that used the Online Banking in a particular month |
| 13 | Total number of PSUs used Mobile Banking | PSU_DETAILS | The retail and business PSU details are available in the core banking system. The provided raw data tables include the PSU_IDs that used Mobile Banking. You can use the PSU_ID and get the total PSU count that used the Mobile Banking in a particular month |
| 14 | Version | PSU_DETAILS | Get API_SPEC_VERSION value |

## Template 6 - Enhanced PSU Adoption (OBIE)

| ID | Field Name | Table to refer | How to capture data |
| -- | ---------- | -------------- | ------------------- |
| 1 | ReportMonth | | |
| 2 | ASPSP Brand ID | | |
| 3 | Retail/Business PSUs | | |
| 4 | API Service | | |
| 5 | Active PSUs | | |
| 6 | Active SME Businesses | | |
| 7 | Version | | |

## Template 7 - PSU Consent Adoption (OBIE)

| ID | Field Name | Table to refer | How to capture data |
| -- | ---------- | -------------- | ------------------- |
| 1 | ReportMonth | The respective table you get the month from | Get the year-month values from the table |
| 2 | ASPSP Brand ID | N/A | A fixed value for a bank |
| 3 | Retail/Business PSUs | N/A | The retail and business PSU details are available in the core banking system |
| 4 | API Service | | REQUEST_TYPE from any table |
| 5 | One-off Consents | ONE_OFF_CONSENT_ADOPTION | CONSENT_COUNT per REQUEST_TYPE |
| 6 | Long-lived consents - Outstanding consents BoP | LONG_LIVED_CONSENT_ADOPTION | |
| 7 | Long-lived consents - Revoked consents | LONG_LIVED_CONSENT_ADOPTION | |
| 8 | Long-lived consents - Expired consents | LONG_LIVED_CONSENT_ADOPTION | |
| 9 | Long-lived consents - Consents Requiring Reauthentication | CONSENT_REQ_REAUTHENTICATION | This is the total number of unique Long-lived consents which required 90 days PSU re-authentication. <br/> Join ACCOUNTS_RAW_DATA and API_INVOCATION_RAW_DATA tables. <br/> And get the CONSENT_ID count AS TOTAL_CONSENT_REQ_REAUTH where (CONSENT_TYPE = 'long-lived' and AUTHORISATION_STATUS = 'Authorised' and RE_AUTHORISATION == false) having (EXPIRATION_DATE_TIME > REPORTING_DATE_TIME and REPORTING_DATE_TIME - 90 days> AUTHORIZED_TIME_DATE) |
| 10 | Long-lived consents - Renewed consents | LONG_LIVED_CONSENT_ADOPTION | |
| 11 | Long-lived consents - New consents | LONG_LIVED_CONSENT_ADOPTION | |
| 12 | Long-lived consents - Outstanding consents EoP | LONG_LIVED_CONSENT_ADOPTION | |
| 13 | Long-lived consents - Total Refreshed consents | REFRSHED_CONSENT | This is the total number of unique Long-lived consents that have been refreshed (Re-authenticated). <br/> Join ACCOUNTS_RAW_DATA and API_INVOCATION_RAW_DATA tables. <br/> Get the CONSENT_ID count AS TOTAL_CONSENT_REQ_REAUTH where (CONSENT_TYPE = 'long-lived' and AUTHORISATION_STATUS = 'Authorised' and RE_AUTHORISATION == true) having (EXPIRATION_DATE_TIME > REPORTING_DATE_TIME and REAUTHORIZED_DATE_TIME > AUTHORIZED_TIME_DATE + 90 days) |
| 14 | Version | LONG_LIVED_CONSENT_ADOPTION | |

## Template 8 - Payments Adoption (OBIE)

| ID | Field Name | Table to refer | How to capture data |
| -- | ---------- | -------------- | ------------------- |
| 1 | ReportMonth | The respective table you get the month from | Get the year-month values from the table |
| 2 | ASPSP Brand ID | N/A | A fixed value for a bank |
| 3 | Total AISPs Registered (at 1st of month) | Zero for the starting month and for the following months the cumulative monthly number of AISPs registered of the last month |
| 4 | AISP Additions | AISP_VOLUMES | Get data from the AISP_COUNT column where STATUS='CREATED' |
| 5 | Successful single Domestic Payments | BACS_REQUEST_STATUS or CHAPS_REQUEST_STATUS | Select the REQUEST_COUNT from the relevant payment type table where PAYMENT_TYPE = '/domestic-payment' and (AUTHORISATION_STATUS = 'AcceptedSettlementInProgress' or AUTHORISATION_STATUS = 'AcceptedSettlementCompleted') |
| 6 | Single Domestic Payments failed for Business Reasons | FAILED_BACS_REQUESTS or FAILED_CHAPS_REQUESTS | Get the sum of REQUEST_COUNT from the relevant payment type table where STATUS_CODE LIKE '%4%' |
| 7 | Single Domestic Payments failed for Technical Reasons | FAILED_BACS_REQUESTS or FAILED_CHAPS_REQUESTS | Get the REQUEST_COUNT from the relevant payment type table where STATUS_CODE = 500 |
| 8 | Single Domestic Payments Rejected | BACS_REQUEST_STATUS or CHAPS_REQUEST_STATUS | Select the REQUEST_COUNT from the relevant payment type table where (PAYMENT_TYPE = '/domestic-payment-consents' or PAYMENT_TYPE = '/domestic-payments') and AUTHORISATION_STATUS = 'Rejected' |
| 9 | Total payments included in Bulk/Batch files | FILE_PAYMENT | Get the TOTAL_PAYMENTS for the relevant payment type where LOCAL_INSTRUMENT = Payment Type |
| 10 | Successful International payments involving currency conversion | BACS_INTERNATIONAL or CHAPSS_INTERNATIONAL | The currency conversion details are available in the core banking system. The given tables provide all the successful international-payment details with the consent id for each payment type |
| 11 | Version | |Get API_SPEC_VERSION value |

## Template 9 - TPP Volumes (OBIE)

| ID | Field Name | Table to refer | How to capture data |
| -- | ---------- | -------------- | ------------------- |
| 1 | ReportMonth | The respective table you get the month from | Get the year-month values from the table |
| 2 | ASPSP Brand ID | N/A | A fixed value for a bank |
| 3 | Total AISPs Registered (at 1st of month) | | Zero for the starting month and for the following months the cumulative monthly number of AISPs registered of the last month |
| 4 | AISP Additions | AISP_VOLUMES | Get data from the AISP_COUNT column where STATUS='CREATED' |
| 5 | AISP Deregistrations | AISP_VOLUMES | Get data from the AISP_COUNT column where STATUS='DELETED' |
| 6 | Cumulative Monthly number of AISPs | | Use the following formula: (Total no of AISPs registered (at 1st of the month) + AISP Additions - AISP deregistrations)
| 7 | Total PISPs Registered (at 1st of month) | | Zero for the starting month and for the following months the cumulative monthly number of PISPs registered of last month.
| 8 | PISP Additions | PISP_VOLUMES |Get data from the PISP_COUNT column where STATUS='CREATED' .
| 9 | PISP Deregistrations | PISP_VOLUMES | Get data from the PISP_COUNT column where STATUS='DELETED'.
| 10 | Cumulative Monthly number of PISPs | | Use the following formula: <br/> <br/> (Total no of PISPs registered (at 1st of month) + PISP Additions - PISP reregistrations)

## Template 10 - Daily Volumes (OBIE)

| ID | Field Name | Table to refer | How to capture data |
| -- | ---------- | -------------- | ------------------- |
| 1 | ReportDate | The respective table you get the data from | Get the year-month-date values from the table |
| 2 | ASPSP Brand ID | N/A | A fixed value for a bank |
| 3 | Endpoint ID | ENDPOINT_DETAILS | Download the SQL script from here to create the ENDPOINT_DETAILS in your MS SQL database. This value is a fixed value. you can get the resource from the respective table and map that with ENDPOINT_ID table |
| 4 | PCA API Calls | ACCOUNT_RAW_DATA_FOR_PCA_BCA, PAYMENT_RAW_DATA_FOR_PCA_BCA, FUNDS_RAW_DATA_FOR_PCA_BCA | The PCA/BCA details are available in the core banking system. The provided raw data tables include the ACCOUNT_ID of accounts that can be used to identify whether it's a PCA or BCA |
| 5 | BCA API Calls | ACCOUNT_RAW_DATA_FOR_PCA_BCA, PAYMENT_RAW_DATA_FOR_PCA_BCA, FUNDS_RAW_DATA_FOR_PCA_BCA | The PCA/BCA details are available in the core banking system. The provided raw data tables include the ACCOUNT_ID of accounts that can be used to identify whether it's a PCA or BCA |
| 6 | Successful API Calls (200, 201 or 204 codes) | STATUS_CODE_SUMMERY | The table contains the volume of API calls per status code per endpoint and per date. Filter the STATUS_CODE values of 200,201 and 204 per endpoint per day and get the sum of those | STATUS_CODE values of 4xx per endpoint per day and get the sum of those |
| 7 | Failed API Calls Business Reasons (4xx Codes) | STATUS_CODE_SUMMERY | The table contains the volume of API calls per status code per endpoint and per date. Filter the
| 8 | Failed API Calls Technical Reasons (5xx Codes) | STATUS_CODE_SUMMERY and AUTHORISATION_SUMMERY | The table contains the volume of API calls per status code per endpoint and per date. Filter the STATUS_CODE values of 5xx per endpoint per day and get the sum of those |
| 9 | API Calls Rejected Status | STATUS_CODE_SUMMERY | Get the sum of the above 2 values (Failed API Calls Business Reasons (4xx Codes) and Failed API Calls Technical Reasons (5xx Codes)) and add the value of Rejected statuses per endpoint per day from the AUTHORIZATION_SUMMERY table |
| 10 | TPPs Calling APIs | DIFFERENT_TPPS | The count of the DISTINCT_TPPS per elected resource per day.
| 11 | API Calls Not Authorised by PSU | AUTHORISATION_SUMMERY | The count of the Rejected status per endpoint per day.
| 12 | API Calls Authorised but Not Consumed | AUTHORISATION_SUMMERY | Get the count of Authorised status per endpoint per day and deduct the count of AcceptedStatementInProcess status per endpoint per day.
| 13 |  Multi Auth API Calls Successful | MULTI_AUTH_DETAILS | Get the count of Authorised statuses against /domestic-payment-consent per day |
| 14 | Multi Auth API Calls Failed  | MULTI_AUTH_DETAILS  |Get the count of Rejected statuses against /domestic-payment-consent per day |
| 15 | Version | Get API_SPEC_VERSION value | 

## Template 11 - Additional Metrics (OBIE)

- Additional Metrics - Payment Status
- Additional Metrics - Payment SCA Exemptions
- Additional Metrics - Revocation Notifications from ASPSPs
- Additional Metrics - AIS Corporate Account Access (OPTIONAL)
- Additional Metrics - Payment Refunds
- Additional Metrics - 90 Days Re-authentication