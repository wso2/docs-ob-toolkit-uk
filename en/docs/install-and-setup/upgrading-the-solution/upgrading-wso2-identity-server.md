# Upgrading to WSO2 Identity Sever 5.11.0

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
