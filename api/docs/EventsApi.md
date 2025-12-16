# EventsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**emitEvent**](EventsApi.md#emitevent) | **POST** /api/events/{name} | Emit event |
| [**listenEvent**](EventsApi.md#listenevent) | **GET** /api/events/{name} | Listen to a specific event |
| [**listenEvents**](EventsApi.md#listenevents) | **GET** /api/events/ | Listen to events |



## emitEvent

> Event emitEvent(name, requestBody, targetName, targetId, moduleID, moduleName, replyToId, expectReply, accept)

Emit event

Emit an event and optionally open a stream to listen for a response.

### Example

```ts
import {
  Configuration,
  EventsApi,
} from 'api';
import type { EmitEventRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new EventsApi();

  const body = {
    // string | Name of event to emit.
    name: test-event,
    // { [key: string]: any; }
    requestBody: Object,
    // string | Only modules with this name will receive this event. (optional)
    targetName: module-name,
    // string | Only modules with this ID will receive this event. (optional)
    targetId: a036c3be-3f9e-461d-8913-78709cd7e8a4,
    // string | A module\'s unique identifier. UUIDv4 should be used when the identity of a module is not important. (optional)
    moduleID: a036c3be-3f9e-461d-8913-78709cd7e8a4,
    // string | Name of your module (optional)
    moduleName: moduleName_example,
    // string | Marks this event as the reply to another. (optional)
    replyToId: replyToId_example,
    // boolean | When set, the server will keep the connection alive and return any events with the reply ID set to this event. (optional)
    expectReply: true,
    // string | Type of stream to accept, see the return details for specifications. **Only relevant when expect-reply is set.** (optional)
    accept: application/x-ndjson,text/event-stream,
  } satisfies EmitEventRequest;

  try {
    const data = await api.emitEvent(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **name** | `string` | Name of event to emit. | [Defaults to `undefined`] |
| **requestBody** | `{ [key: string]: any; }` |  | |
| **targetName** | `string` | Only modules with this name will receive this event. | [Optional] [Defaults to `undefined`] |
| **targetId** | `string` | Only modules with this ID will receive this event. | [Optional] [Defaults to `undefined`] |
| **moduleID** | `string` | A module\&#39;s unique identifier. UUIDv4 should be used when the identity of a module is not important. | [Optional] [Defaults to `undefined`] |
| **moduleName** | `string` | Name of your module | [Optional] [Defaults to `undefined`] |
| **replyToId** | `string` | Marks this event as the reply to another. | [Optional] [Defaults to `undefined`] |
| **expectReply** | `boolean` | When set, the server will keep the connection alive and return any events with the reply ID set to this event. | [Optional] [Defaults to `undefined`] |
| **accept** | `string` | Type of stream to accept, see the return details for specifications. **Only relevant when expect-reply is set.** | [Optional] [Defaults to `&#39;application/x-ndjson&#39;`] |

### Return type

[**Event**](Event.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`, `application/x-ndjson`, `text/event-stream`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Stream established |  -  |
| **204** | No content |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listenEvent

> Event listenEvent(name, targetName, targetId, moduleID, moduleName, lastEventID, since, limit, accept, willReply)

Listen to a specific event

### Example

```ts
import {
  Configuration,
  EventsApi,
} from 'api';
import type { ListenEventRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new EventsApi();

  const body = {
    // string | Event to listen to.
    name: test-event,
    // string | Only returns events from this module name. Use * to retrieve events even if they are targetting a specific module. (optional)
    targetName: module-name,
    // string | Only returns events from this module ID. Use * to retrieve events even if they are targetting a specific module. (optional)
    targetId: a036c3be-3f9e-461d-8913-78709cd7e8a4,
    // string | A module\'s unique identifier. UUIDv4 should be used when the identity of a module is not important. (optional)
    moduleID: a036c3be-3f9e-461d-8913-78709cd7e8a4,
    // string | Name of your module (optional)
    moduleName: moduleName_example,
    // string | Defines which events to retrieve. You may use the special value `ALL_EVENTS` to retrieve all events. (optional)
    lastEventID: lastEventID_example,
    // Date | Retrieves events raised after this. In RFC3339 format. (optional)
    since: 1985-04-12T23:20:50.52Z,
    // number | Maximum number of past events to include. Only relevant if LastEventID is set to ALL_EVENTS. Limit MAY return fewer events than the limit even if more matching events exists in the database. (optional)
    limit: 789,
    // string | Type of stream to accept, see the return details for specifications. (optional)
    accept: application/x-ndjson,text/event-stream,
    // boolean | Indicates you will emit a reply to this event. This means emitting an event with reply-to-id set as the ID of the event you receive here. (optional)
    willReply: true,
  } satisfies ListenEventRequest;

  try {
    const data = await api.listenEvent(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **name** | `string` | Event to listen to. | [Defaults to `undefined`] |
| **targetName** | `string` | Only returns events from this module name. Use * to retrieve events even if they are targetting a specific module. | [Optional] [Defaults to `undefined`] |
| **targetId** | `string` | Only returns events from this module ID. Use * to retrieve events even if they are targetting a specific module. | [Optional] [Defaults to `undefined`] |
| **moduleID** | `string` | A module\&#39;s unique identifier. UUIDv4 should be used when the identity of a module is not important. | [Optional] [Defaults to `undefined`] |
| **moduleName** | `string` | Name of your module | [Optional] [Defaults to `undefined`] |
| **lastEventID** | `string` | Defines which events to retrieve. You may use the special value &#x60;ALL_EVENTS&#x60; to retrieve all events. | [Optional] [Defaults to `undefined`] |
| **since** | `Date` | Retrieves events raised after this. In RFC3339 format. | [Optional] [Defaults to `undefined`] |
| **limit** | `number` | Maximum number of past events to include. Only relevant if LastEventID is set to ALL_EVENTS. Limit MAY return fewer events than the limit even if more matching events exists in the database. | [Optional] [Defaults to `undefined`] |
| **accept** | `string` | Type of stream to accept, see the return details for specifications. | [Optional] [Defaults to `&#39;application/x-ndjson&#39;`] |
| **willReply** | `boolean` | Indicates you will emit a reply to this event. This means emitting an event with reply-to-id set as the ID of the event you receive here. | [Optional] [Defaults to `undefined`] |

### Return type

[**Event**](Event.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/x-ndjson`, `text/event-stream`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Stream established |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listenEvents

> Event listenEvents(targetName, targetId, moduleID, moduleName, lastEventID, since, limit, names, accept, willReply)

Listen to events

### Example

```ts
import {
  Configuration,
  EventsApi,
} from 'api';
import type { ListenEventsRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new EventsApi();

  const body = {
    // string | Only returns events from this module name. Use * to retrieve events regardless of which module name they are targeting. (optional)
    targetName: module-name,
    // string | Only returns events from this module ID. Use * to retrieve events regardless of which module ID they are targeting. (optional)
    targetId: a036c3be-3f9e-461d-8913-78709cd7e8a4,
    // string | A module\'s unique identifier. UUIDv4 should be used when the identity of a module is not important. (optional)
    moduleID: a036c3be-3f9e-461d-8913-78709cd7e8a4,
    // string | Name of your module (optional)
    moduleName: moduleName_example,
    // string | Defines which events to retrieve. You may use the special value `ALL_EVENTS` to retrieve all events. (optional)
    lastEventID: lastEventID_example,
    // Date | Retrieves events raised after this. In RFC3339 format. (optional)
    since: 1985-04-12T23:20:50.52Z,
    // number | Maximum number of past events to include. Only relevant if LastEventID is set to ALL_EVENTS. Limit MAY return fewer events than the limit even if more matching events exists in the database. (optional)
    limit: 789,
    // string | Events to listen to. If not specified, will return all events. (optional)
    names: test-event,test-event2,
    // string | Type of stream to accept, see the return details for specifications. (optional)
    accept: application/x-ndjson,text/event-stream,
    // string | Events to which you will reply. This means emitting an event with reply-to-id set as the ID of the event you receive here. (optional)
    willReply: test-event,test-event2,
  } satisfies ListenEventsRequest;

  try {
    const data = await api.listenEvents(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **targetName** | `string` | Only returns events from this module name. Use * to retrieve events regardless of which module name they are targeting. | [Optional] [Defaults to `undefined`] |
| **targetId** | `string` | Only returns events from this module ID. Use * to retrieve events regardless of which module ID they are targeting. | [Optional] [Defaults to `undefined`] |
| **moduleID** | `string` | A module\&#39;s unique identifier. UUIDv4 should be used when the identity of a module is not important. | [Optional] [Defaults to `undefined`] |
| **moduleName** | `string` | Name of your module | [Optional] [Defaults to `undefined`] |
| **lastEventID** | `string` | Defines which events to retrieve. You may use the special value &#x60;ALL_EVENTS&#x60; to retrieve all events. | [Optional] [Defaults to `undefined`] |
| **since** | `Date` | Retrieves events raised after this. In RFC3339 format. | [Optional] [Defaults to `undefined`] |
| **limit** | `number` | Maximum number of past events to include. Only relevant if LastEventID is set to ALL_EVENTS. Limit MAY return fewer events than the limit even if more matching events exists in the database. | [Optional] [Defaults to `undefined`] |
| **names** | `string` | Events to listen to. If not specified, will return all events. | [Optional] [Defaults to `undefined`] |
| **accept** | `string` | Type of stream to accept, see the return details for specifications. | [Optional] [Defaults to `&#39;application/x-ndjson&#39;`] |
| **willReply** | `string` | Events to which you will reply. This means emitting an event with reply-to-id set as the ID of the event you receive here. | [Optional] [Defaults to `undefined`] |

### Return type

[**Event**](Event.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/x-ndjson`, `text/event-stream`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Stream established |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

