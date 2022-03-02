# Upgrading to WSO2 API Manager 3.2.0

WSO2 API Manager 3.1.0 is a base product of WSO2 Open Banking 2.0. This section instructs you on how to upgrade the API
Manager to 3.2.0, which is a prerequisite for upgrading to API Manager 4.0.

- Upgrade **IS as Key Manager 5.10.0** for API Manager 3.2.0 by following 
[Upgrading WSO2 IS as Key Manager](https://apim.docs.wso2.com/en/3.2.0/install-and-setup/upgrading-wso2-is-as-key-manager/upgrading-from-is-km-5100-to-is-5100/).

- Upgrade API Manager from 3.1.0 to 3.2.0 by following the 
[API Manager documentation](https://apim.docs.wso2.com/en/3.2.0/install-and-setup/upgrading-wso2-api-manager/upgrading-from-310-to-320/#upgrading-api-manager-from-310-to-320).
    
    !!! note
        In the above documentation, under [Step 1 - Migrate the API Manager configurations](https://apim.docs.wso2.com/en/3.2.0/install-and-setup/upgrading-wso2-api-manager/upgrading-from-310-to-320/#step-1-migrate-the-api-manager-configurations),
        skip steps 6,7,8, and 9 as we are only trying to migrate the databases at this level.

- Set up **IS 5.11.0 as Key Manager** for API Manager 3.2.0 

    1. Download and install the WSO2 Identity Server 5.11.0 distribution from [here](https://wso2.com/identity-server/). 
    2. Extract the downloaded archive file. This document refers to the root folder of the extracted file as `<IS_HOME>`.
    3. Download the `wso2-obiam-accelerator-3.0.0.zip` file and extract it to the `<IS_HOME>` directory. 
    4. Download the latest updates for `wso2-obiam-accelerator-3.0.0`. For more information, see [Getting WSO2 Updates](../setting-up-servers.md#getting-wso2-updates).
    5. Open the `<IS_HOME>/<IS_ACCELERATOR_HOME>/repository/conf/configure.properties` file and update the hostnames 
       and database details. These database configurations should point to the databases of Open Banking 2.0.
    6. Go to the `<IS_HOME>/<IS_ACCELERATOR_HOME>/bin` directory and issue the following commands:
           1. Run the merge.sh script.
  
             ```
             ./merge.sh
             ```
  
           2. Run the configure.sh script
  
             ```
             ./configure.sh
             ```

    7. Download the `wso2-obiam-toolkit-uk-1.0.0.zip` file and extract it to the `<IS_HOME>` directory. 
    8. Download the latest updates for `wso2-obiam-toolkit-uk-1.0.0`. For more information, see [Getting WSO2 Updates](../setting-up-servers.md#getting-wso2-updates).
    9. Open the `<IS_HOME>/<IS_TOOLKIT_HOME>/repository/conf/configure.properties` file and update the hostnames and 
       database details. These database configurations should point to the databases of Open Banking 2.0.
    10. Go to the `<IS_HOME>/<IS_TOOLKIT_HOME>/bin` directory and issue the following commands:
         1. Run the merge.sh script.

             ```
             ./merge.sh
             ```

         2. Run the configure.sh script

            ```
            ./configure.sh
            ```
        
    11. To configure the Identity Server with the API Manager, download [WSO2 IS Connector](https://apim.docs.wso2.com/en/4.0.0/assets/attachments/administer/wso2is-extensions-1.2.10.zip).
    12. Copy the following files to the given directory paths:

         | File to copy | Location to  |
         |---------|-------------------|
         |`wso2is-extensions-1.2.10/dropins/wso2is.key.manager.core-1.2.10.jar`|`<IS_HOME>/repository/components/dropins`|
         |`wso2is-extensions-1.2.10/dropins/wso2is.notification.event.handlers-1.2.10.jar`|`<IS_HOME>/repository/components/dropins`|
         |`wso2is-extensions-1.2.10/webapps/keymanager-operations.war`|`<IS_HOME>/repository/deployment/server/webapps`|