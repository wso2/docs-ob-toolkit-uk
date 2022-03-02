!!! tip "Before you begin:"
    Back up all the databases before performing the migration.

1. Create the `openbankingdb` table by following [Creating Databases](../setting-up-databases.md#creating-database-tables). 
2. Download the WSO2 Open Banking Migration Client Tool v1.0.0 from <a href="../../../assets/attachments/wso2-openbanking-migration-1.0.0.zip" download> here</a>.
3. Copy the `openbanking-migration-resources` directory to `<IS_HOME>`.
4. Copy the `wso2-openbanking-migration-1.0.0/dropins/com.wso2.openbanking.migration-1.0.0.jar` file to `<IS_HOME>/repository/components/dropins`.
5. Enable migration in the `wso2-openbanking-migration-1.0.0/openbanking-migration-resources/migration-config.yaml` file.
6. Start the Identity Server with the following command:
   
    ```
       sh wso2server.sh -DobMigrationSpec=UK
    ```
   
7. Stop the server.
8. Remove the `<IS_HOME>/repository/components/dropins/com.wso2.openbanking.migration-1.0.0.jar` file.
9. Remove the `<IS_HOME>/openbanking-migration-resources` directory.
10. Start the Identity Server and API Manager servers.
