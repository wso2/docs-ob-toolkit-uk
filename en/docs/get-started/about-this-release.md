WSO2 Open Banking UK Toolkit 1.0 provides the technology requirements that banks need to digitally transform and become 
regulatory-compliant with Payment Service Directive 2 (PSD2) and Open Banking Standard UK v3.1.6 specification.

This toolkit is based on WSO2 Open Banking 3.0 and contains specific feature customisations to satisfy open banking 
requirements of Open Banking Standard UK. You can use WSO2 Open Banking UK Toolkit to meet all legislative requirements 
with additional benefits beyond compliance. This toolkit comprises three modules:

- **WSO2 Open Banking Identity Server UK Toolkit** runs on top of WSO2 Identity Server.
- **WSO2 Open Banking API Manager UK Toolkit** runs on top of WSO2 API Manager.
- **WSO2 Open Banking Business Intelligence UK Toolkit**  runs on top of WSO2 Streaming Integrator.

For more information on WSO2 Open Banking Toolkit, see the [Get Started](open-banking.md) section.

## What is new in this release

####WSO2 Open Banking Identity Server UK Toolkit

- Dynamic Client Registration (DCR) API 3.3 for creating applications and DCR request validation.
- Request object validation implementation related to the Open Banking Standard UK specification.
- Consent Management support for the following API flows:
 - Account and Transaction API v3.1.6
 - Payment Initiation API v3.1.6
 - Confirmation of Funds API v3.1.6
- Web app extension for consent approval during authentication.
- Account Reauthorization for the Account and Transaction Flow.
- Multi Authorization for the Payment Initiation Flow.
- Extensions for Data Publishing during authorization and registration flows.

####WSO2 Open Banking API Manager UK Toolkit

- Data Publishing Executor.
- Error Handling for the Dynamic Client Registration (DCR) API.
- Error Handling for Account and Transaction API.
- Error Handling for Payment Initiation API.
- Error Handling for Confirmation of Funds API.  
- Error Handling for Schema Validation.
- Handling Idempotency for the Payment Initiation Flow.
- Official Swagger and in-sequence files for the DCR, Account, Payment, and Confirmation of Funds APIs

####WSO2 Open Banking Business Intelligence UK Toolkit

- Siddhi Apps for publishing data during authorization, registration, token generation, and API invocation