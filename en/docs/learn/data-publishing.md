#Data Publishing

The Data Publishing feature gathers and monitors data in regard to the APIs invoked through WSO2 Open Banking. 
WSO2 Open Banking Business Intelligence Toolkit captures the data through Identity Server and API Manager servers and
process them. You can summarize data in a way that banks can generate reports and summaries according to your open banking 
requirements. See the following diagram to understand how WSO2 Open Banking has implemented data publishing. 
![data-publishing-overview](../assets/img/learn/data-publishing/data-publishing-overview.png)

WSO2 Open Banking Business Intelligence accelerates the data publishing functions on top of the base product, WSO2 Streaming Integrator and 
captures the following types of data from WSO2 Open Banking Identity Server and WSO2 Open Banking API Management instances.

- **Performance and availability**: Understands and monitors the availability and performance of the supported APIs.
- **Adoption**:  Identifies the effectiveness of how a bank adopted open banking to their legacy systems.
- **Data**: The efficacy of the open banking standards as a part of ongoing standards management activity.

The Business Intelligence toolkit captures data through WSO2 Open Banking UK Toolkit for API Manager and WSO2 Open Banking 
UK Toolkit for Identity Server. Then the Business Intelligence Toolkit processes and summarizes the data in a way that 
**ASPSPs can generate their own reports and summaries**. The standard protocol for data publishing is Thrift. However, 
WSO2 Open Banking Business Intelligence supports other protocols such as HTTP, gRPC, or any other data publishing protocol.

The Data Reporting feature captures data in the following flows:

- API invocation data from the AISP, PISP, and COF flows
- Authentication data through the Strong Customer Authentication flow
- Authorization data using the Authorization flow
- Application registration data through the TPP onboarding process via DCR

**Databases**

All the data are stored in two databases. Database and datasource details are given below:

- **`OB_REPORTING_DB`**: Stores all raw data related to API invocation, authentication, authorization, and application 
registrations. The data stored in the database is not processed by any means, therefore the ASPSPs can use this database and summarize 
data according to the requirements. The default database name is `openbank_ob_reporting_statsdb`. 

- **`OB_REPORTING_SUMMARIZED_DB`**: Stores summarized data of the `OB_REPORTING_DB` datasource. The summarization contains 
information related to API invocation, consents, single and batch payment information, payment submission, etc. The default 
database name is `openbank_ob_reporting_summarizeddb`.

For more information on the report templates that can be generated, see [Generating reports using summarized data](data-publishing-reports.md).