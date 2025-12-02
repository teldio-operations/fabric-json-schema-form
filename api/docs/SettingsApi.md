# SettingsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**downloadBackup**](SettingsApi.md#downloadbackup) | **GET** /api/backup | Download backup |
| [**restart**](SettingsApi.md#restart) | **POST** /api/restart | Restart |
| [**restoreBackup**](SettingsApi.md#restorebackup) | **POST** /api/backup | Restore backup |
| [**setHostAndPort**](SettingsApi.md#sethostandportoperation) | **POST** /api/settings/url | Set host and port |



## downloadBackup

> string downloadBackup(excludeEvents)

Download backup

Download a snapshot of your system, including module configurations, settings, and past events. Sensitive data will not be included.

### Example

```ts
import {
  Configuration,
  SettingsApi,
} from 'api';
import type { DownloadBackupRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new SettingsApi();

  const body = {
    // boolean (optional)
    excludeEvents: true,
  } satisfies DownloadBackupRequest;

  try {
    const data = await api.downloadBackup(body);
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
| **excludeEvents** | `boolean` |  | [Optional] [Defaults to `undefined`] |

### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  * Content-Disposition -  <br>  * Content-Length -  <br>  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## restart

> RestartResponseBody restart()

Restart

### Example

```ts
import {
  Configuration,
  SettingsApi,
} from 'api';
import type { RestartRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new SettingsApi();

  try {
    const data = await api.restart();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**RestartResponseBody**](RestartResponseBody.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## restoreBackup

> RestartResponseBody restoreBackup(body, protectExistingConfigs)

Restore backup

### Example

```ts
import {
  Configuration,
  SettingsApi,
} from 'api';
import type { RestoreBackupRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new SettingsApi();

  const body = {
    // Blob
    body: BINARY_DATA_HERE,
    // boolean (optional)
    protectExistingConfigs: true,
  } satisfies RestoreBackupRequest;

  try {
    const data = await api.restoreBackup(body);
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
| **body** | `Blob` |  | |
| **protectExistingConfigs** | `boolean` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**RestartResponseBody**](RestartResponseBody.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/zip`
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## setHostAndPort

> RestartResponseBody setHostAndPort(setHostAndPortRequest)

Set host and port

### Example

```ts
import {
  Configuration,
  SettingsApi,
} from 'api';
import type { SetHostAndPortOperationRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new SettingsApi();

  const body = {
    // SetHostAndPortRequest
    setHostAndPortRequest: ...,
  } satisfies SetHostAndPortOperationRequest;

  try {
    const data = await api.setHostAndPort(body);
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
| **setHostAndPortRequest** | [SetHostAndPortRequest](SetHostAndPortRequest.md) |  | |

### Return type

[**RestartResponseBody**](RestartResponseBody.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

