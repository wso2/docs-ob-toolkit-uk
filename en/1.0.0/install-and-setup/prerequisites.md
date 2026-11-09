# Prerequisites

WSO2 Open Banking UK Toolkit is a purpose-built solution for regulatory compliance that supports PSD2. Instead of building an open banking solution from scratch, you can use WSO2 Open Banking UK Toolkit to meet all open banking requirements with additional benefits beyond compliance. This toolkit runs on top of the following WSO2 products:

You can use any of the following combinations and WSO2 Open Banking Accelerator 3.0:

|                      | WSO2 Identity Server                                                         | WSO2 API Manager                                                                                                           | WSO2 Streaming Integrator                       |
| -------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| Combination 01       | [5.11.0](https://wso2.com/identity-and-access-management/previous-releases/) | [4.1.0](https://wso2.com/api-management/previous-releases/) or [4.0.0](https://wso2.com/api-management/previous-releases/) | [4.0.0](https://wso2.com/streaming-integrator/) |
| Combination 02<br /> | [6.0.0](https://wso2.com/identity-and-access-management/previous-releases/)  | [4.2.0](https://wso2.com/api-manager/)                                                                                     | [4.2.0](https://wso2.com/streaming-integrator/) |

note

The WSO2 Open Banking UK Toolkit is built by customizing the WSO2 Open Banking Accelerator and helps you comply with the Open Banking Standard. For more information on the accelerator, see the [WSO2 Open Banking Accelerator Documentation](https://ob.docs.wso2.com/).

The toolkit mainly addresses the open banking requirements such as API consumer application onboarding, consent management, and access authorization among numerous other features to set up an open banking solution.

tip

In a standalone setup, these products are deployed in a single server. However, in a typical production environment, it is recommended to deploy the components in separate servers (distributed) for better performance.

## Product Matrix[​](#product-matrix "Direct link to Product Matrix")

Given below is a product matrix for different versions of WSO2 Open Banking UK Toolkit:

| Version | Mandatory Components                                        | Additional Components      |
| ------- | ----------------------------------------------------------- | -------------------------- |
| 1.0.0   | wso2-obam-toolkit-uk-1.0.0<br />wso2-obiam-toolkit-uk-1.0.0 | wso2-obbi-toolkit-uk-1.0.0 |

## Compatible Base Product Versions[​](#compatible-base-product-versions "Direct link to Compatible Base Product Versions")

Given below is the compatible base product matrix for WSO2 Open Banking UK Toolkit 1.0.0:

| Base Product              | Compatible Versions |                |
| ------------------------- | ------------------- | -------------- |
|                           | Combination 01      | Combination 02 |
| WSO2 Identity Server      | 5.11.0              | 6.0.0          |
| WSO2 API Manager<br />    | 4.1.0<br />4.0.0    | 4.2.0          |
| WSO2 Streaming Integrator | 4.0.0               | 4.1.0          |

## Prerequisites for a Deployment[​](#prerequisites-for-a-deployment "Direct link to Prerequisites for a Deployment")

Listed below are the prerequisites for a successful deployment:

### Hardware requirements[​](#hardware-requirements "Direct link to Hardware requirements")

| Disk space | 40 GB free disk space<br />The disk space is based on the expected storage requirements that are calculated by considering the file uploads and the backup policies. |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU        | Minimum required: 2 cores                                                                                                                                            |
| Memory     | 4 GB RAM                                                                                                                                                             |

### Software requirements[​](#software-requirements "Direct link to Software requirements")

| Operating system | - Windows<br />- Linux                                                                                                                                                                                  |   |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | - |
| JDK Version      | - OpenJDK 11 or OpenJDK 17                                                                                                                                                                              |   |
| DBMS             | - MySQL 8.0<br />- Oracle 19c<br />- Microsoft SQL Server 2017<br />- PostgreSQL 13We do not recommend configuring the H2 database in the production environment.                                       |   |
| User store       | It is not recommended to use Apache DS in a production environment due to scalability issues. Instead, use an LDAP such as OpenLDAP, RDBMS, Active Directory or custom user stores for user management. |   |

## Compatibility[​](#compatibility "Direct link to Compatibility")

WSO2 Open Banking UK Toolkit 1.0.0 is supported on the following platforms:

info

If you are using **WSO2 Identity Server 6.0.0** and **WSO2 API Manager 4.2.0** as the base products, it is recommended to use OpenJDK 17. For other base products, use OpenJDK 11.

note

To use MySQL 8.0, you need to create the database with `charset latin1` as shown below:

```
create database regdb

character set latin1;
```

| Supported JDK versions      | -OpenJDK 11<br />-Oracle JDK 11<br />-OpenJDK 17                                |
| --------------------------- | ------------------------------------------------------------------------------- |
| Supported Operating Systems | -Ubuntu 18.04.5 LTS<br />-Windows Server 2016                                   |
| Tested DBMSs                | -MySQL 8.0<br />-Oracle 19c<br />-Microsoft SQL Server 2017<br />-PostgreSQL 13 |
| Tested Web Browsers         | -Google Chrome 69<br />-Firefox 88.0                                            |

If you have difficulty in setting up any WSO2 product in a specific platform or database, [contact us](https://wso2.com/subscription/).
