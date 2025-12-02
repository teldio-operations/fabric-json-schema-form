# AuthApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**changeUserRole**](AuthApi.md#changeuserroleoperation) | **PUT** /api/users/{username}/role | Change user role |
| [**createUser**](AuthApi.md#createuseroperation) | **POST** /api/users | Create user |
| [**deleteUser**](AuthApi.md#deleteuser) | **DELETE** /api/users/{username} | Delete user |
| [**getMe**](AuthApi.md#getme) | **GET** /api/me | Get current user info |
| [**getUsers**](AuthApi.md#getusers) | **GET** /api/users | Get users |
| [**postLogin**](AuthApi.md#postloginoperation) | **POST** /api/login | Log in |
| [**postLogout**](AuthApi.md#postlogout) | **POST** /api/logout | Log out |
| [**setUserPassword**](AuthApi.md#setuserpasswordoperation) | **PUT** /api/me/password | Set current user password |



## changeUserRole

> changeUserRole(username, changeUserRoleRequest)

Change user role

### Example

```ts
import {
  Configuration,
  AuthApi,
} from 'api';
import type { ChangeUserRoleOperationRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new AuthApi();

  const body = {
    // string
    username: username_example,
    // ChangeUserRoleRequest
    changeUserRoleRequest: ...,
  } satisfies ChangeUserRoleOperationRequest;

  try {
    const data = await api.changeUserRole(body);
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
| **username** | `string` |  | [Defaults to `undefined`] |
| **changeUserRoleRequest** | [ChangeUserRoleRequest](ChangeUserRoleRequest.md) |  | |

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


## createUser

> createUser(createUserRequest)

Create user

### Example

```ts
import {
  Configuration,
  AuthApi,
} from 'api';
import type { CreateUserOperationRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new AuthApi();

  const body = {
    // CreateUserRequest
    createUserRequest: ...,
  } satisfies CreateUserOperationRequest;

  try {
    const data = await api.createUser(body);
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
| **createUserRequest** | [CreateUserRequest](CreateUserRequest.md) |  | |

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
| **204** | No Content |  * Set-Cookie -  <br>  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteUser

> deleteUser(username)

Delete user

### Example

```ts
import {
  Configuration,
  AuthApi,
} from 'api';
import type { DeleteUserRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new AuthApi();

  const body = {
    // string
    username: username_example,
  } satisfies DeleteUserRequest;

  try {
    const data = await api.deleteUser(body);
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
| **username** | `string` |  | [Defaults to `undefined`] |

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


## getMe

> GetMeBody getMe(fabricUser)

Get current user info

### Example

```ts
import {
  Configuration,
  AuthApi,
} from 'api';
import type { GetMeRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new AuthApi();

  const body = {
    // string (optional)
    fabricUser: fabricUser_example,
  } satisfies GetMeRequest;

  try {
    const data = await api.getMe(body);
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
| **fabricUser** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**GetMeBody**](GetMeBody.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  * Set-Cookie -  <br>  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getUsers

> GetUsersOutputBody getUsers()

Get users

### Example

```ts
import {
  Configuration,
  AuthApi,
} from 'api';
import type { GetUsersRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new AuthApi();

  try {
    const data = await api.getUsers();
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

[**GetUsersOutputBody**](GetUsersOutputBody.md)

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


## postLogin

> postLogin(postLoginRequest)

Log in

### Example

```ts
import {
  Configuration,
  AuthApi,
} from 'api';
import type { PostLoginOperationRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new AuthApi();

  const body = {
    // PostLoginRequest
    postLoginRequest: ...,
  } satisfies PostLoginOperationRequest;

  try {
    const data = await api.postLogin(body);
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
| **postLoginRequest** | [PostLoginRequest](PostLoginRequest.md) |  | |

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
| **204** | No Content |  * Set-Cookie -  <br>  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## postLogout

> postLogout()

Log out

### Example

```ts
import {
  Configuration,
  AuthApi,
} from 'api';
import type { PostLogoutRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new AuthApi();

  try {
    const data = await api.postLogout();
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
| **204** | No Content |  * Set-Cookie -  <br>  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## setUserPassword

> setUserPassword(setUserPasswordRequest, fabricUser)

Set current user password

### Example

```ts
import {
  Configuration,
  AuthApi,
} from 'api';
import type { SetUserPasswordOperationRequest } from 'api';

async function example() {
  console.log("🚀 Testing api SDK...");
  const api = new AuthApi();

  const body = {
    // SetUserPasswordRequest
    setUserPasswordRequest: ...,
    // string (optional)
    fabricUser: fabricUser_example,
  } satisfies SetUserPasswordOperationRequest;

  try {
    const data = await api.setUserPassword(body);
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
| **setUserPasswordRequest** | [SetUserPasswordRequest](SetUserPasswordRequest.md) |  | |
| **fabricUser** | `string` |  | [Optional] [Defaults to `undefined`] |

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

