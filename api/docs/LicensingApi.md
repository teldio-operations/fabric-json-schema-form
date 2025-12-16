# LicensingApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getLicense**](LicensingApi.md#getlicense) | **GET** /api/license | Get the current license |
| [**getLicenseRequest**](LicensingApi.md#getlicenserequest) | **GET** /api/license/request | Get a license request file |
| [**postLicense**](LicensingApi.md#postlicenseoperation) | **POST** /api/license | Register a license |



## getLicense

> GetLicenseResponseBody getLicense()

Get the current license

### Example

```ts
import {
  Configuration,
  LicensingApi,
} from 'api';
import type { GetLicenseRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new LicensingApi();

  try {
    const data = await api.getLicense();
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

[**GetLicenseResponseBody**](GetLicenseResponseBody.md)

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


## getLicenseRequest

> string getLicenseRequest()

Get a license request file

### Example

```ts
import {
  Configuration,
  LicensingApi,
} from 'api';
import type { GetLicenseRequestRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new LicensingApi();

  try {
    const data = await api.getLicenseRequest();
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

**string**

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


## postLicense

> postLicense(postLicenseRequest)

Register a license

### Example

```ts
import {
  Configuration,
  LicensingApi,
} from 'api';
import type { PostLicenseOperationRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new LicensingApi();

  const body = {
    // PostLicenseRequest
    postLicenseRequest: ...,
  } satisfies PostLicenseOperationRequest;

  try {
    const data = await api.postLicense(body);
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
| **postLicenseRequest** | [PostLicenseRequest](PostLicenseRequest.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | No Content |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

