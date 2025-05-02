---
uid: server-notifications
title: Webhook Plugin for Notifications
---

## Services

Notifications via the Webhook Plugin can be sent using different services depending on what kind of integration you want. Jellyfin will show notifications on the dashboard by default, but you can send notifications via the Webhook Plugin to additional messaging services. Most services will require additional configuration but can be extremely useful for those who want instant updates for activity on their server.

## Configuration

After installing the **Webhook** plugin, you will navigate to "My Plugins" in the dashboard and then select the Webhook plugin to configure notifications. All notification types will be shown in a list as well as their current status. They can be enabled individually and can be set to only monitor specific users. Any installed notification services will show up in a list in this section.

Templates for popular messaging services are available on the webhook plugin's [github page](https://github.com/jellyfin/jellyfin-plugin-webhook/tree/master/Jellyfin.Plugin.Webhook/Templates).
