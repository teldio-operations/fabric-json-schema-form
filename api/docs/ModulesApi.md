# ModulesApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**approveModule**](ModulesApi.md#approvemodule) | **POST** /api/appinfo-unapproved/{path} | Approve an unauthorized module |
| [**deleteModule**](ModulesApi.md#deletemodule) | **DELETE** /api/config/{id} | Delete a module |
| [**disallowModule**](ModulesApi.md#disallowmodule) | **DELETE** /api/appinfo-unapproved/{path} | Disallow an unauthorized module |
| [**getAppinfo**](ModulesApi.md#getappinfo) | **GET** /api/appinfo | Get info about available modules |
| [**getConfigs**](ModulesApi.md#getconfigs) | **GET** /api/config | Get configs of running modules |
| [**getUnapprovedAppinfo**](ModulesApi.md#getunapprovedappinfo) | **GET** /api/appinfo-unapproved | Get info about unapproved modules |
| [**moduleGetAppinfo**](ModulesApi.md#modulegetappinfo) | **GET** /api/appinfo/{id} | Get info for a module |
| [**moduleGetAppinfoConfigured**](ModulesApi.md#modulegetappinfoconfigured) | **GET** /api/appinfo/configured | Get info for registered modules |
| [**moduleSetAppinfo**](ModulesApi.md#modulesetappinfo) | **POST** /api/appinfo/{id} | Register info for a module |
| [**refreshAppinfo**](ModulesApi.md#refreshappinfo) | **POST** /api/appinfo/refresh | Refresh available modules |
| [**setConfig**](ModulesApi.md#setconfig) | **POST** /api/config | Add or update a module |
| [**startModule**](ModulesApi.md#startmodule) | **POST** /api/config/{id}/start | Start a module |
| [**stopModule**](ModulesApi.md#stopmodule) | **POST** /api/config/{id}/stop | Stop a module |



## approveModule

> approveModule(path)

Approve an unauthorized module

### Example

```ts
import {
  Configuration,
  ModulesApi,
} from 'api';
import type { ApproveModuleRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new ModulesApi();

  const body = {
    // string
    path: path_example,
  } satisfies ApproveModuleRequest;

  try {
    const data = await api.approveModule(body);
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
| **path** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | No Content |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteModule

> deleteModule(id)

Delete a module

### Example

```ts
import {
  Configuration,
  ModulesApi,
} from 'api';
import type { DeleteModuleRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new ModulesApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeleteModuleRequest;

  try {
    const data = await api.deleteModule(body);
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
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | No Content |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## disallowModule

> disallowModule(path)

Disallow an unauthorized module

### Example

```ts
import {
  Configuration,
  ModulesApi,
} from 'api';
import type { DisallowModuleRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new ModulesApi();

  const body = {
    // string
    path: path_example,
  } satisfies DisallowModuleRequest;

  try {
    const data = await api.disallowModule(body);
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
| **path** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | No Content |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getAppinfo

> Array&lt;Info&gt; getAppinfo()

Get info about available modules

### Example

```ts
import {
  Configuration,
  ModulesApi,
} from 'api';
import type { GetAppinfoRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new ModulesApi();

  try {
    const data = await api.getAppinfo();
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

[**Array&lt;Info&gt;**](Info.md)

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


## getConfigs

> { [key: string]: Config; } getConfigs()

Get configs of running modules

### Example

```ts
import {
  Configuration,
  ModulesApi,
} from 'api';
import type { GetConfigsRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new ModulesApi();

  try {
    const data = await api.getConfigs();
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

[**{ [key: string]: Config; }**](Config.md)

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


## getUnapprovedAppinfo

> Array&lt;UnapprovedModule&gt; getUnapprovedAppinfo()

Get info about unapproved modules

### Example

```ts
import {
  Configuration,
  ModulesApi,
} from 'api';
import type { GetUnapprovedAppinfoRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new ModulesApi();

  try {
    const data = await api.getUnapprovedAppinfo();
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

[**Array&lt;UnapprovedModule&gt;**](UnapprovedModule.md)

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


## moduleGetAppinfo

> Info moduleGetAppinfo(id)

Get info for a module

### Example

```ts
import {
  Configuration,
  ModulesApi,
} from 'api';
import type { ModuleGetAppinfoRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new ModulesApi();

  const body = {
    // string
    id: id_example,
  } satisfies ModuleGetAppinfoRequest;

  try {
    const data = await api.moduleGetAppinfo(body);
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
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Info**](Info.md)

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


## moduleGetAppinfoConfigured

> { [key: string]: Info; } moduleGetAppinfoConfigured()

Get info for registered modules

### Example

```ts
import {
  Configuration,
  ModulesApi,
} from 'api';
import type { ModuleGetAppinfoConfiguredRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new ModulesApi();

  try {
    const data = await api.moduleGetAppinfoConfigured();
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

[**{ [key: string]: Info; }**](Info.md)

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


## moduleSetAppinfo

> moduleSetAppinfo(id, requestBody)

Register info for a module

### Example

```ts
import {
  Configuration,
  ModulesApi,
} from 'api';
import type { ModuleSetAppinfoRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new ModulesApi();

  const body = {
    // string
    id: id_example,
    // { [key: string]: any; }
    requestBody: Object,
  } satisfies ModuleSetAppinfoRequest;

  try {
    const data = await api.moduleSetAppinfo(body);
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
| **id** | `string` |  | [Defaults to `undefined`] |
| **requestBody** | `{ [key: string]: any; }` |  | |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`, `application/octet-stream`
- **Accept**: `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | No Content |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## refreshAppinfo

> refreshAppinfo()

Refresh available modules

### Example

```ts
import {
  Configuration,
  ModulesApi,
} from 'api';
import type { RefreshAppinfoRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new ModulesApi();

  try {
    const data = await api.refreshAppinfo();
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

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | No Content |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## setConfig

> PostConfigBody setConfig(configInput)

Add or update a module

### Example

```ts
import {
  Configuration,
  ModulesApi,
} from 'api';
import type { SetConfigRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new ModulesApi();

  const body = {
    // ConfigInput
    configInput: ...,
  } satisfies SetConfigRequest;

  try {
    const data = await api.setConfig(body);
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
| **configInput** | [ConfigInput](ConfigInput.md) |  | |

### Return type

[**PostConfigBody**](PostConfigBody.md)

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


## startModule

> startModule(id)

Start a module

### Example

```ts
import {
  Configuration,
  ModulesApi,
} from 'api';
import type { StartModuleRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new ModulesApi();

  const body = {
    // string
    id: id_example,
  } satisfies StartModuleRequest;

  try {
    const data = await api.startModule(body);
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
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | No Content |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## stopModule

> stopModule(id)

Stop a module

### Example

```ts
import {
  Configuration,
  ModulesApi,
} from 'api';
import type { StopModuleRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new ModulesApi();

  const body = {
    // string
    id: id_example,
  } satisfies StopModuleRequest;

  try {
    const data = await api.stopModule(body);
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
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | No Content |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

