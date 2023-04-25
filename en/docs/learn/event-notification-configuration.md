# Configuring Event Notification

Follow the steps to set up the Event Notifications Aggregated Polling API for Open Banking for UK:

1. Create the Event Notifications tables according to the following steps.

    1. Go to the `<IS_HOME>/dbscripts/open-banking/event-notifications` directory.
    2. According to your database, execute the relevant script against the `openbank_openbankingdb` database.

        !!!note
            For MySQL and PostgreSQL, remove the first line before executing the script.
        
2. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

3. Find the `resource.access_control` configurations and add the following tags to secure the Event Notification endpoints:

    ``` toml
    [[resource.access_control]]
    context = "(.*)/api/openbanking/event-notifications/(.*)"
    secure="true"
    http_method="all"
    permissions=["/permission/admin"]
    allowed_auth_handlers = ["BasicAuthentication"]
    ```

4. Add the following tags at the end of the file:

    ```toml
    [open_banking.event.notifications]
    token_issuer = "www.wso2.com"
    number_of_sets_to_return = 5
    event_creation_handler = "com.wso2.openbanking.uk.event.notifications.handlers.UKEventCreationServiceHandler"
    event_polling_handler = "com.wso2.openbanking.uk.event.notifications.handlers.UKEventPollingServiceHandler"
    event_notification_generator = "com.wso2.openbanking.accelerator.event.notifications.service.service.DefaultEventNotificationGenerator"
    set_sub_claim_included = true
    set_txn_claim_included = true
    set_toe_claim_included = true
    ```