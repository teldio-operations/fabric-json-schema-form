# DefaultApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getInfo**](DefaultApi.md#getinfo) | **GET** /api/info | Get info about the manager |
| [**getTheme**](DefaultApi.md#gettheme) | **GET** /api/info/theme | Get theming data |



## getInfo

> GetInfoBody getInfo()

Get info about the manager

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from 'api';
import type { GetInfoRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new DefaultApi();

  try {
    const data = await api.getInfo();
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

[**GetInfoBody**](GetInfoBody.md)

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


## getTheme

> Theme getTheme()

Get theming data

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from 'api';
import type { GetThemeRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new DefaultApi();

  try {
    const data = await api.getTheme();
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

[**Theme**](Theme.md)

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

