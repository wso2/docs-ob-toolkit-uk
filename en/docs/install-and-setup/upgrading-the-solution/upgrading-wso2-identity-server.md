# Upgrading to WSO2 Identity Sever 5.11.0

## Set up IS 5.11.0 as Key Manager for API Manager 4.0.0

   1. Download and install the WSO2 Identity Server 5.11.0 distribution from [here](https://wso2.com/identity-server/).
   2. Extract the downloaded archive file. This document refers to the root folder of the extracted file as `<IS_HOME>`.

### Set up WSO2 Open Banking Accelerator and UK Toolkit for Identity Sever

1. Download the `wso2-obiam-accelerator-3.0.0.zip` file and extract it to the `<IS_HOME>` directory.
2. Download the latest updates for `wso2-obiam-accelerator-3.0.0`. For more information, see [Getting WSO2 Updates](../setting-up-servers.md#getting-wso2-updates).
3. Open the `<IS_HOME>/<IS_ACCELERATOR_HOME>/repository/conf/configure.properties` file and update the hostnames
   and database details. These database configurations should point to the databases of Open Banking 2.0.
4. Go to the `<IS_HOME>/<IS_ACCELERATOR_HOME>/bin` directory and run the merge.sh script.

     ```
     ./merge.sh
     ```

5. Download the `wso2-obiam-toolkit-uk-1.0.0.zip` file and extract it to the `<IS_HOME>` directory.
6. Download the latest updates for `wso2-obiam-toolkit-uk-1.0.0`. For more information, see [Getting WSO2 Updates](../setting-up-servers.md#getting-wso2-updates).
7. Open the `<IS_HOME>/<IS_TOOLKIT_HOME>/repository/conf/configure.properties` file and update the hostnames and
   database details. These database configurations should point to the databases of Open Banking 2.0.
8. Go to the `<IS_HOME>/<IS_TOOLKIT_HOME>/bin` directory and run the merge.sh script.

     ```
     ./merge.sh
     ```

9. To configure the Identity Server with the API Manager, download [WSO2 IS Connector](https://apim.docs.wso2.com/en/4.0.0/assets/attachments/administer/wso2is-extensions-1.2.10.zip).
10. Copy the following files to the given directory paths:

    | File to copy | Location to  |
    |---------|-------------------|
    |`wso2is-extensions-1.2.10/dropins/wso2is.key.manager.core-1.2.10.jar`|`<IS_HOME>/repository/components/dropins`|
    |`wso2is-extensions-1.2.10/dropins/wso2is.notification.event.handlers-1.2.10.jar`|`<IS_HOME>/repository/components/dropins`|
    |`wso2is-extensions-1.2.10/webapps/keymanager-operations.war`|`<IS_HOME>/repository/deployment/server/webapps`|

## Migrate to WSO2 Identity Sever 5.11.0

1. Follow [Step B - Migrate IS from 5.10.0 to 5.11.0](https://apim.docs.wso2.com/en/latest/install-and-setup/upgrading-wso2-is-as-key-manager/upgrading-from-is-5100-to-is-5110/#step-b-migrate-is-from-5100-to-5110) 
and upgrade your WSO2 Identity Server.

2. Follow [WSO2 Identity Server Migrating to 5.11.0](https://is.docs.wso2.com/en/5.11.0/setup/migrating-to-5110/) 
to upgrade your current **IS as KM 5.10.0** distribution to IS 5.11.0.
    
    !!! note
        In the above documentation, under [Steps to migrate to 5.11.0](https://is.docs.wso2.com/en/5.11.0/setup/migrating-to-5110/#steps-to-migrate-to-5110),
  
         1. Skip steps 1,2, and 4.
         2. **Do not** copy the API Manager - Key Manager specific configurations from 
            `<OLD_IS_KM_HOME>/repository/conf/api-manager.xml` of the previous IS as KM version to IS 5.11.0.
         3. Follow the step 10, only if you have enabled Symmetric Key Encryption in the previous IS as KM setup. 
            If not, skip step 10.
         4. Before executing the IS migration client according to Step 11, remove the following entries from 
            `migration-config.yaml` in the migration-resources directory:

        ```yaml
        - version: "5.10.0"
          migratorConfigs:
            -
            name: "MigrationValidator"
            order: 2
            -
            name: "SchemaMigrator"
            order: 5
            parameters:
            location: "step2"
            schema: "identity"
            -
            name: "TenantPortalMigrator"
            order: 11
        ```
    
    !!! warning
        Based on the number of records in the identity tables, the identity component migration will take a considerable time. 
        Do not stop the server during the migration process. Wait until the migration process finishes completely and the server gets started.

3. After successfully completing the migration, stop the server and remove the following directories and files.
     - Remove the `<IS_HOME>/repository/components/dropins/org.wso2.carbon.is.migration-x.x.x.jar` file.
     - Remove the `<IS_HOME>/migration-resources` directory.
