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
| 8 | Median TTLB Response Time | PA_CORE or PA_NON_CORE |
| 9 | Median TTFB Response Time | PA_CORE or PA_NON_CORE |
| 10 | Median Response Payload Size |PA_CORE or PA_NON_CORE |
| 11 | Max Payment Initiations Per Second (PIPS) | PAYMENT_INITIATION_DETAILS | Get the payment initiations per second per day |
| 12 | Average TTLB Response Time | PA_CORE or PA_NON_CORE | Get the AVG_TTLB value from the relevant table per day per time per endpoint |
| 13 | Average TTFB Response Time | PA_CORE or PA_NON_CORE | Get the AVG_TTFB value from the relevant table per day per time per endpoint |
| 14 | Total Number of API calls | PA_CORE or PA_NON_CORE | Get the TOTAL_API_CALLS value from the relevant table per day per time per endpoint.
| 15 | Total TTLB Response Time (Time to Last Byte) | PA_CORE or PA_NON_CORE | Get the TOTAL_TTLB value from the relevant table per day per time per endpoint |
| 16 | Total TTFB Response Time (Time to First Byte) | PA_CORE or PA_NON_CORE | Get the TOTAL_TTFB value from the relevant table per day per time per endpoint |
| 17 | Total ResponsePayload Size | PA_CORE or PA_NON_CORE | Get the TOTAL_RESPONSE_PAYLOAD_SIZE value from the relevant table per day per time per endpoint |
| 18 | Version | PA_CORE or PA_NON_CORE | Get the API_SPEC_VERSION value from the relevant table per day per time per endpoint |
