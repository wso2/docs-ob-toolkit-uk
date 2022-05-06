# Upgrading to WSO2 API Manager 3.2.0

WSO2 API Manager 3.1.0 is a base product of WSO2 Open Banking 2.0. This section instructs you on how to upgrade the API
Manager to 3.2.0, which is a prerequisite for upgrading to API Manager 4.0.

1. Upgrade **IS as Key Manager 5.10.0** for API Manager 3.2.0 by following 
[Upgrading WSO2 IS as Key Manager](https://apim.docs.wso2.com/en/3.2.0/install-and-setup/upgrading-wso2-is-as-key-manager/upgrading-from-is-km-5100-to-is-5100/).

2. Upgrade API Manager from 3.1.0 to 3.2.0 by following the 
[API Manager documentation](https://apim.docs.wso2.com/en/3.2.0/install-and-setup/upgrading-wso2-api-manager/upgrading-from-310-to-320/#upgrading-api-manager-from-310-to-320).
    
    !!! note
        In the above documentation, under [Step 1 - Migrate the API Manager configurations](https://apim.docs.wso2.com/en/3.2.0/install-and-setup/upgrading-wso2-api-manager/upgrading-from-310-to-320/#step-1-migrate-the-api-manager-configurations),
        skip steps 6,7,8, and 9 as we are only trying to migrate the databases at this level.

