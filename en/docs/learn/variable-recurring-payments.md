#Variable Recurring Payments

Variable Recurring Payments (VRP) are a type of payment instruction that can be set up and used to make a series of 
future payments. VRP will allow bank customers to safely connect authorised Payment Initiation Service Providers (PISPs) 
to their bank accounts. PISPs can then make a series of payments on a customer’s behalf within agreed parameters, 
offering more control and transparency.

The functionality of the VRP API is as follows:

- Stage a VRP Consent
- Optionally confirm available funds for a VRP of a specified amount
- Subsequently, submit the VRP for processing
- Optionally retrieve the status of VRP Consents and VRPs

The VRP API in WSO2 Open Banking UK Toolkit supports the Domestic VRP Consents and Domestic VRPS resources.

## Domestic VRP Consent

The Domestic VRP Consents resource is used by a TPP to register a consent to initiate one or more of domestic payments 
within the control parameters agreed with the PSU. The toolkit supports the below-listed endpoints. 

- `POST /domestic-vrp-consents`
- `GET /domestic-vrp-consents/{ConsentId}`
- `DELETE /domestic-vrp-consents/{ConsentId}`
- `POST /domestic-vrp-consents/{ConsentId}/funds-confirmation`

For more information, see
[OBIE - Domestic VRP consents](https://openbankinguk.github.io/read-write-api-site3/v3.1.9/resources-and-data-models/vrp/domestic-vrp-consents.html#post-domestic-vrp-consents).

## Domestic VRPS

The Domestic VRPs resource is used by a TPP to initiate a domestic payment, under an authorised VRP Consent.
The toolkit supports the below-listed endpoints.

- `POST /domestic-vrp-consents`
- `GET /domestic-vrp-consents/{ConsentId}` 
- `DELETE /domestic-vrp-consents/{ConsentId}`
- `POST /domestic-vrp-consents/{ConsentId}/funds-confirmation`

For more information, see
[OBIE - Domestic VRPS](https://openbankinguk.github.io/read-write-api-site3/v3.1.9/resources-and-data-models/vrp/domestic-vrps.html)
