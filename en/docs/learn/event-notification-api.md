# Event Notification

The Event Notification API Profile describes the flows and common functionality to allow a TPP to receive event notifications.

The Event Notification Subscription API Profile and the Callback URL API Profile provide alternative mechanisms for TPPs 
to register for event notifications.

- The Event Notification Subscription API allows TPPs to register to receive all or specific event types via the Real Time 
Event Notification API and/or the Aggregated Polling API.
- The Callback URL API allows TPPs to register to receive a urn:uk:org:openbanking:events:resource-update event notification via the Real Time Event Notification API.

Usage of the Event Notification Subscription API is recommended over the Callback URL API for notification registrations.
If an ASPSP provides both APIs for event notification registrations, any registration made using the Event Notification 
Subscription API supersedes a registration made using the Callback URL API.

The specification has four sub-specifications:

- Event Notification Subscription API
- Callback URL API
- Real Time Event Notification API
- Aggregated Polling API