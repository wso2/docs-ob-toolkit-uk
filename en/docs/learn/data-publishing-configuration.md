Follow the steps below to enable Data Reporting:

1. Open the `<APIM_HOME>/repository/conf/deployment.toml` and `<IS_HOME>/repository/conf/deployment.toml` files.
2. Find the `[open_banking.data_publishing]` property and set the `enable` parameter to `true`:
    ``` toml 
    [open_banking.data_publishing]
    enable = true
    ```
3. Update the `server_url` parameter under the same tag, with the hostname of your Streaming Integrator server.
    ``` toml
    [open_banking.data_publishing]
    server_url = "{tcp://localhost:7612}"
    ```