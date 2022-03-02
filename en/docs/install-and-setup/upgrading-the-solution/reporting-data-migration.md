!!! tip "Before you begin:"
    Make sure you are running Data Reporting v3.1.5 in your WSO2 Open Banking Business Intelligence 2.0.0 setup. 
    If not, follow the [Upgrading Data Reporting from v3.1.2 to v3.1.5](https://docs.wso2.com/display/OB200/PSD2+Data+Reporting#PSD2DataReporting-DataReportingv3.1.5) 
    documentation and upgrade.

1. Stop the WSO2 Open Banking Business Intelligence 2.0.0 server if it is running.
2. Download and install the WSO2 Streaming Integrator 4.0.0 distribution from [here](https://wso2.com/integration/streaming-integrator/).
3. Backup your `openbank_ob_reporting_statsdb` and `openbank_ob_reporting_summarizeddb` databases of your OBBI 2.0.0 setup.
4. Execute the relevant SQL script in the 
`wso2-openbanking-migration-1.0.0/openbanking-migration-resources/reporting-migration-scripts/uk` 
directory against your `openbank_ob_reporting_statsdb` database.
<br/> This is to migrate the reporting data and tables from the OB 2.0 setup to OB 3.0.
5. Start the Streaming Integrator server. For more information, see [Try Out Data Publishing](../../get-started/data-publishing-try-out.md).


