# Event Notification

The Event Notification API in WSO2 Open Banking Accelerator provides a poll-based service. This API consists of two resources:

- Event Creation API
- Event Polling API

The Event Notification API follows the **IETF Security Event Token (SET)** and the **Poll-Based Security Event Token (SET) Delivery Using HTTP**
specifications to serve general-purpose event notification creation and polling.

The Event Creation API allows storing event notification information as a JSON, which can be customized according to your
use case. The Event Polling API facilitates storing and retrieving event notifications according to the above specifications
without altering the information in the event information JSON.  Both these endpoints are secured with basic authentication
(admin username and password) and accept base64 encoded JSON.

## Event Polling

This endpoint allows applications to poll for, acknowledge, and receive event notifications. You can use this endpoint 
when the API consumer applications communicate their polling parameters and event notification acknowledgements. Using 
this endpoint the banks can respond accordingly; sending event notifications as indicated by the application's polling 
parameters.

Based on the request payloads, the Event Polling (`POST /events`) endpoint performs the following:

- Poll for events 
- Acknowledge the received events 
- Acknowledge error notifications 
- Poll for new events and acknowledge the received events at once

A sample Event Polling request is as follows:

```
curl -X 'POST' \
  'https://<IS_HOST>:8243/open-banking/v3.1/events' \
  -H 'accept: application/json; charset=utf-8' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -H 'Authorization: Bearer undefined' \
  -d '{
  "maxEvents": 5,
  "returnImmediately": true  }'
```

Above request is the initial poll with the request payload as follows:

```
{
   "returnImmediately": true,
   "maxEvents": 5
}
```

Sample Response

The `sets` values consist of notification IDs and the JWT-encoded event notification details pairs.

```
{
   "moreAvailable": true,
   "sets": {
       "8241e34a-adf5-48c3-bb90-4b86abc2d876": "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5RGtVU21WTEZPeEpESHhldjM1emZGY0pjeTRhIiwiYXVkIjoiOURrVVNtVkxGT3hKREh4ZXYzNXpmRmNKY3k0YSIsImlzcyI6Ind3dy53c28yLmNvbSIsInR4biI6IjNkMzJmNTE1LTU5MDYtNGU4My1iMWExLThhOWZlNjc0YjBiYyIsInRvZSI6MTY3OTQwMTc4NzAwMCwiaWF0IjoxNjgxOTk2MjY0LCJqdGkiOiI4MjQxZTM0YS1hZGY1LTQ4YzMtYmI5MC00Yjg2YWJjMmQ4NzYiLCJldmVudHMiOnsidXJuOnVrOm9yZzpvcGVuYmFua2luZzpldmVudHM6Y29uc2VudC1hdXRob3JpemF0aW9uLXJldm9rZWQiOnsicmVzb3VyY2VJRCI6IjFkODA0NzhiLWE2NjItNDViMi04NDMzLWJlZTFjMjQ2ZDM1ZiJ9LCJ1cm46dWs6b3JnOm9wZW5iYW5raW5nOmV2ZW50czpyZXNvdXJjZS11cGRhdGUiOnsicmVzb3VyY2VJRCI6IjFkODA0NzhiLWE2NjItNDViMi04NDMzLWJlZTFjMjQ2ZDM1ZiJ9fX0.BKM9yHOoU515nu2FeaLQYpsANoliDvAtmRm3cfVBGjzRrIkxs0Eag7UvNZospTabtVqAYY60cZF7xh-Of1bGKXI2PasvDxQn7VlnUGurZFhCwyef0b6A77JD2vsvfJN4QvGf3btgkGTvRUIaCjILEUJsuD0OK6GqoKqgiyNg4jyvGczf_QB7nu7ZI5fs42eZLKLtnSMgjJCfFnf92K0Vevhdg46kO_JCbGkquEnp0wYAnDsjSCfI484cQKxqTbhwnGpvNueR448oIZ3ABu76L1J9AVO0I7qoY7bzUEFgd5oZGFZ8M04TS9aos7BiMjke6mPuk9vHU4w22qSa8kX3nQ",
       "8365f73c-0617-4beb-8f3a-ce2fc6d0011b": "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5RGtVU21WTEZPeEpESHhldjM1emZGY0pjeTRhIiwiYXVkIjoiOURrVVNtVkxGT3hKREh4ZXYzNXpmRmNKY3k0YSIsImlzcyI6Ind3dy53c28yLmNvbSIsInR4biI6ImVmOTEyZjFkLTFiZTItNGUzZS04MjE0LWIzNTQ0ZjAxMzgyYiIsInRvZSI6MTY3OTQwODE0MzAwMCwiaWF0IjoxNjgxOTk2MjY0LCJqdGkiOiI4MzY1ZjczYy0wNjE3LTRiZWItOGYzYS1jZTJmYzZkMDAxMWIiLCJldmVudHMiOnsidXJuOnVrOm9yZzpvcGVuYmFua2luZzpldmVudHM6Y29uc2VudC1hdXRob3JpemF0aW9uLXJldm9rZWQiOnsicmVzb3VyY2VJRCI6IjZiNTc0Mzc5LWI0ZDEtNDZkNC04NGFiLTU5NDNlYWIyOTA0MSJ9LCJ1cm46dWs6b3JnOm9wZW5iYW5raW5nOmV2ZW50czpyZXNvdXJjZS11cGRhdGUiOnsicmVzb3VyY2VJRCI6IjZiNTc0Mzc5LWI0ZDEtNDZkNC04NGFiLTU5NDNlYWIyOTA0MSJ9fX0.Akq8xz5a6gBOh2rR074CGGuWA_JRnopBi7xxhenx221Ebl8zVDwUZ8MxLbiDLaEaRjB2wSHAlOqpFf680ds6EuGxUhEpYNj05-DOKpGtHZfl2gYleQkqaWndMWIZXvgN8ETqD3YHY9M9d2y_wmVi0YHviHmqkwBIKBjqpHtegjg6BbfOTZFreFyQskqT8R69gfEIQGwf60h7HeUwRAfXmUzbjgk3YorD2Xa9kQgjSBDMWzo8ldR4aHfATSfuwvqZD4cnDu930cekehqdaJZGKDvhGBhVU001qNzxDLTBoiEfsAyUFPEvhOOXrcjjo3OJ34xX8yOzvPFVtTf9E2VvbA",
       "758270e1-26e6-427d-a10d-8419858e8cb0": "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5RGtVU21WTEZPeEpESHhldjM1emZGY0pjeTRhIiwiYXVkIjoiOURrVVNtVkxGT3hKREh4ZXYzNXpmRmNKY3k0YSIsImlzcyI6Ind3dy53c28yLmNvbSIsInR4biI6IjZjYTBjMDk1LWJkMjItNDc0MC04MjE1LTQ1ZGUwZDk1MTViOCIsInRvZSI6MTY3OTM5MDA3NjAwMCwiaWF0IjoxNjgxOTk2MjY0LCJqdGkiOiI3NTgyNzBlMS0yNmU2LTQyN2QtYTEwZC04NDE5ODU4ZThjYjAiLCJldmVudHMiOnsidXJuOnVrOm9yZzpvcGVuYmFua2luZzpldmVudHM6Y29uc2VudC1hdXRob3JpemF0aW9uLXJldm9rZWQiOnsicmVzb3VyY2VJRCI6IjE0NGVlNDM1LWYyMzEtNGM5Yi04YThkLWFjODI1N2VjZjVkYSJ9LCJ1cm46dWs6b3JnOm9wZW5iYW5raW5nOmV2ZW50czpyZXNvdXJjZS11cGRhdGUiOnsicmVzb3VyY2VJRCI6IjE0NGVlNDM1LWYyMzEtNGM5Yi04YThkLWFjODI1N2VjZjVkYSJ9fX0.cpza7gJatiWisbrZvng7xWU0ijF7ZLU5IRD1eBsiCoV3qwXrTbATKlgaQNeNzwF-EPq0h2_Oj3C7ufGsD9oC8rmG4liGptmBhfB79AzzSIvbQ7cM25aHNXUj6A3glp9DjUye_M1DdUxawT_o-ywhsFMxAL1lxv_LMcytXboqi_eK1bCW6ffUz_P0UUSf1aTzm0TNdfyeQrmFuEupfgz0U4lQ_DWrVdWR73lJbABCN-9ko1ic0CuRLEtTGQmr-qyKE9EoO1iy7iYcSR9e91J-TjGcesPKtgwEveJTexcNZZM9a5QTHzC87sxaiOZ7dehWj7g3N73el2vF1-bS5rZq1g",
       "8ec3cb77-799f-45ca-8ba3-b1c3b563defe": "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5RGtVU21WTEZPeEpESHhldjM1emZGY0pjeTRhIiwiYXVkIjoiOURrVVNtVkxGT3hKREh4ZXYzNXpmRmNKY3k0YSIsImlzcyI6Ind3dy53c28yLmNvbSIsInR4biI6IjM1Yjk5YzI4LTUxYmUtNGNlYi1hMDUwLWY3YzU3YzVjNmQ4NSIsInRvZSI6MTY3OTM5MjIxMzAwMCwiaWF0IjoxNjgxOTk2MjY0LCJqdGkiOiI4ZWMzY2I3Ny03OTlmLTQ1Y2EtOGJhMy1iMWMzYjU2M2RlZmUiLCJldmVudHMiOnsidXJuOnVrOm9yZzpvcGVuYmFua2luZzpldmVudHM6Y29uc2VudC1hdXRob3JpemF0aW9uLXJldm9rZWQiOnsicmVzb3VyY2VJRCI6ImM5YWY3YWJkLWVlYjEtNGMwZS1hODNkLTBhMzU0OWFhMTYxMCJ9LCJ1cm46dWs6b3JnOm9wZW5iYW5raW5nOmV2ZW50czpyZXNvdXJjZS11cGRhdGUiOnsicmVzb3VyY2VJRCI6ImM5YWY3YWJkLWVlYjEtNGMwZS1hODNkLTBhMzU0OWFhMTYxMCJ9fX0.pRYBa9MgzDil5Z8T5Kuhpmc7ueTZWBK7OA9895Hds048qj3QUU21ZGfPy8h_1Tft3dIJtUXjs2gCkdkYulMi7zY2CmqaqyG9NiDHccM-YRUUhNvj9TmmWnGspVwBUQ3Ge1XxIttM9N8VrlDsvGpCD0OKpkLuvtGbcR8kPPczrAossZyP5R9J_wot6CeNU4Vh_sBKgSvqfG6013AeyTxIZiq4ufXj2uiz_t_vj8NEthPfsMIyV5aeInhaFrYaWdMzjg9AAXhPcafufTudQKzazpE466KKDevoqWO1SxlT6QhUJRgnUdVLSFh5m0PDQiCi2PUn28_t8MmJ2tLSqHpnrg",
       "74ef5a43-b68e-4422-8fe4-a616a11b37ee": "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5RGtVU21WTEZPeEpESHhldjM1emZGY0pjeTRhIiwiYXVkIjoiOURrVVNtVkxGT3hKREh4ZXYzNXpmRmNKY3k0YSIsImlzcyI6Ind3dy53c28yLmNvbSIsInR4biI6ImZhMDllMWIzLWFlZDAtNDlmMi1iOGVmLTYxMmVmZmE4MmYyMCIsInRvZSI6MTY3OTM3NjY3NTAwMCwiaWF0IjoxNjgxOTk2MjY0LCJqdGkiOiI3NGVmNWE0My1iNjhlLTQ0MjItOGZlNC1hNjE2YTExYjM3ZWUiLCJldmVudHMiOnsidXJuOnVrOm9yZzpvcGVuYmFua2luZzpldmVudHM6Y29uc2VudC1hdXRob3JpemF0aW9uLXJldm9rZWQiOnsicmVzb3VyY2VJRCI6IjE3MTM2ODQwLTk0ZGUtNDczYi05MTkxLWNjYTZhMjUzMDljNyJ9LCJ1cm46dWs6b3JnOm9wZW5iYW5raW5nOmV2ZW50czpyZXNvdXJjZS11cGRhdGUiOnsicmVzb3VyY2VJRCI6IjE3MTM2ODQwLTk0ZGUtNDczYi05MTkxLWNjYTZhMjUzMDljNyJ9fX0.VQhKx8QyySegptWU07c2LA0LevjNxdQ3oaoqZk9ZCjL1ILoAwXwXf_lPT77Ck2_GFTsMEsVNAla0XvRlAhrCf4IL0tupQf3iEwwBDP-YRHIjxTjI65fEaeXu1kwFlD5qxNYEST4Ayf5w1us-0h_z4hlHv64rKSmE_QN6aM1UZnsE8JPIYdKJEZc_rxxwUiMZCWgA4lcoltJEXDeNVLyVgMno-4FLWy4zGNP1VLV0JQFC7SQ9AxztUpU5CzYtC_OQ_IW5FVPZZfq1aGTS400FaGUaJRx_NoJrbIQtf1LsK5TQ-Zz9yGqOemX0OA59Ljwc5eTb5E6bF9ZVpsw17vGScw"
   }
}
```

Using the following type of payload you can only set error (negative acknowledgement):

```
{
  "setErrs": {
    "6e65eacc-204e-4379-97ac-ae6d5228d7b5": {
      "err": "authentication_failed",
      "description": "The SET could not be authenticated"
    }
  },
  "returnImmediately": true,
  "maxEvents": 0
}
```

Sample Response

```
{
   "moreAvailable": true,
   "sets": {}
}
```

Using the following type of payload, you can poll for more events and acknowledge polled events by providing the event notification 
IDs that need to be acknowledged:

```
{
   "ack": ["8241e34a-adf5-48c3-bb90-4b86abc2d876", "8365f73c-0617-4beb-8f3a-ce2fc6d0011b"],
   "maxEvents": 2
}
```

Sample Response

```
{
   "moreAvailable": true,
   "sets": {
       "758270e1-26e6-427d-a10d-8419858e8cb0": "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5RGtVU21WTEZPeEpESHhldjM1emZGY0pjeTRhIiwiYXVkIjoiOURrVVNtVkxGT3hKREh4ZXYzNXpmRmNKY3k0YSIsImlzcyI6Ind3dy53c28yLmNvbSIsInR4biI6IjI5ZjY2NWJlLTJlZWUtNDE4ZC05ZmZhLTI1MzVjNGE4MDY2ZCIsInRvZSI6MTY3OTM5MDA3NjAwMCwiaWF0IjoxNjgxOTk2NjYwLCJqdGkiOiI3NTgyNzBlMS0yNmU2LTQyN2QtYTEwZC04NDE5ODU4ZThjYjAiLCJldmVudHMiOnsidXJuOnVrOm9yZzpvcGVuYmFua2luZzpldmVudHM6Y29uc2VudC1hdXRob3JpemF0aW9uLXJldm9rZWQiOnsicmVzb3VyY2VJRCI6IjE0NGVlNDM1LWYyMzEtNGM5Yi04YThkLWFjODI1N2VjZjVkYSJ9LCJ1cm46dWs6b3JnOm9wZW5iYW5raW5nOmV2ZW50czpyZXNvdXJjZS11cGRhdGUiOnsicmVzb3VyY2VJRCI6IjE0NGVlNDM1LWYyMzEtNGM5Yi04YThkLWFjODI1N2VjZjVkYSJ9fX0.K85AC5Cq507_aM0KqigTmf8ZLtbH1rDHnoaFbfEA8dujrKfBlJfw-b-Wp8hFnzQPx8iieu0LfcN4QOQ6qEOyxg0_2dPV-oxQYI7QsHkKNze-rWdkQ_rUpvfBfe0n34lQqslH6iIbfGXRRbYZmd2Ps1ousWslBtj-xNy-wUoi4MQRrrxyVxPB2IGbyThEk0aumvhAn9IBngbZjufyNHZ6Yi2TL83WPohbVpNAK4XBJLclvSB-WC6Z2FSbA5oDq-dEJKVpBKbCMxMw8fqUeKkAZ74YZ1H31XULwSsWnpZ8lwgTr29_qmxaeeefIC5tKTEV-qY-wG9orYanb14U2igOiA",
       "74ef5a43-b68e-4422-8fe4-a616a11b37ee": "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5RGtVU21WTEZPeEpESHhldjM1emZGY0pjeTRhIiwiYXVkIjoiOURrVVNtVkxGT3hKREh4ZXYzNXpmRmNKY3k0YSIsImlzcyI6Ind3dy53c28yLmNvbSIsInR4biI6ImNhMDQwOTU0LWIyZjgtNDU3OS1iZWYxLWY4MmZkYjhjOWIwMyIsInRvZSI6MTY3OTM3NjY3NTAwMCwiaWF0IjoxNjgxOTk2NjYwLCJqdGkiOiI3NGVmNWE0My1iNjhlLTQ0MjItOGZlNC1hNjE2YTExYjM3ZWUiLCJldmVudHMiOnsidXJuOnVrOm9yZzpvcGVuYmFua2luZzpldmVudHM6Y29uc2VudC1hdXRob3JpemF0aW9uLXJldm9rZWQiOnsicmVzb3VyY2VJRCI6IjE3MTM2ODQwLTk0ZGUtNDczYi05MTkxLWNjYTZhMjUzMDljNyJ9LCJ1cm46dWs6b3JnOm9wZW5iYW5raW5nOmV2ZW50czpyZXNvdXJjZS11cGRhdGUiOnsicmVzb3VyY2VJRCI6IjE3MTM2ODQwLTk0ZGUtNDczYi05MTkxLWNjYTZhMjUzMDljNyJ9fX0.xbeaIzl8OAv9o9UA36OZsoS3MWzytQpDKUPm36xuhMiBJuupW-vLqSMdb1BvOOGGbQWIKj9tbovb_ndUgqOMXHAsPWYog8WgHEjZmZify7M_-dWoe6mlm6g2EGJNWmHoK9fXf-fJPhkZty6R919AtWeI4KEyo06avrQm6TWTfM-wTJKg6jBXVkz69_ya1mjjkNw87f0oARoWcbZb322gjbjJmi8beJCUTE6k90ykxgA6_4ov9cA4COW_3x3WrN0lRKcITRyISxKH-zLutfWaanllBxIuF3YA04KY48iUHnyO3noER07X6X_Ct3xby6lHGro7rWdtxdv8Z1CE4l8_Ow"
   }
}
```

You can use the following payload to acknowledge the received events (both positive and negative acknowledgements) while accepting more events:

```
{
  "ack":[
     "1256db1c-8fda-4457-a755-bb5113dba717"
  ],
  "setErrs":{
     "65ac7453-13b0-4d2f-9946-dff6e6089a4f":{
        "err":"authentication_failed",
        "description":"The SET could not be authenticated"
     }
  },
  "returnImmediately":true
}
```