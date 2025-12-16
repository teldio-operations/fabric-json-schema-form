# api@v0.16.0-31ce037

A TypeScript SDK client for the localhost API.

## Usage

First, install the SDK from npm.

```bash
npm install api --save
```

Next, try it out.


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


## Documentation

### API Endpoints

All URIs are relative to *http://localhost*

| Class | Method | HTTP request | Description
| ----- | ------ | ------------ | -------------
*AuthApi* | [**changeUserRole**](docs/AuthApi.md#changeuserroleoperation) | **PUT** /api/users/{username}/role | Change user role
*AuthApi* | [**createUser**](docs/AuthApi.md#createuseroperation) | **POST** /api/users | Create user
*AuthApi* | [**deleteUser**](docs/AuthApi.md#deleteuser) | **DELETE** /api/users/{username} | Delete user
*AuthApi* | [**getMe**](docs/AuthApi.md#getme) | **GET** /api/me | Get current user info
*AuthApi* | [**getUsers**](docs/AuthApi.md#getusers) | **GET** /api/users | Get users
*AuthApi* | [**postLogin**](docs/AuthApi.md#postloginoperation) | **POST** /api/login | Log in
*AuthApi* | [**postLogout**](docs/AuthApi.md#postlogout) | **POST** /api/logout | Log out
*AuthApi* | [**setUserPassword**](docs/AuthApi.md#setuserpasswordoperation) | **PUT** /api/me/password | Set current user password
*DefaultApi* | [**getInfo**](docs/DefaultApi.md#getinfo) | **GET** /api/info | Get info about the manager
*DefaultApi* | [**getTheme**](docs/DefaultApi.md#gettheme) | **GET** /api/info/theme | Get theming data
*EventsApi* | [**emitEvent**](docs/EventsApi.md#emitevent) | **POST** /api/events/{name} | Emit event
*EventsApi* | [**listenEvent**](docs/EventsApi.md#listenevent) | **GET** /api/events/{name} | Listen to a specific event
*EventsApi* | [**listenEvents**](docs/EventsApi.md#listenevents) | **GET** /api/events/ | Listen to events
*LicensingApi* | [**getLicense**](docs/LicensingApi.md#getlicense) | **GET** /api/license | Get the current license
*LicensingApi* | [**getLicenseRequest**](docs/LicensingApi.md#getlicenserequest) | **GET** /api/license/request | Get a license request file
*LicensingApi* | [**postLicense**](docs/LicensingApi.md#postlicenseoperation) | **POST** /api/license | Register a license
*ModulesApi* | [**approveModule**](docs/ModulesApi.md#approvemodule) | **POST** /api/appinfo-unapproved/{path} | Approve an unauthorized module
*ModulesApi* | [**deleteModule**](docs/ModulesApi.md#deletemodule) | **DELETE** /api/config/{id} | Delete a module
*ModulesApi* | [**disallowModule**](docs/ModulesApi.md#disallowmodule) | **DELETE** /api/appinfo-unapproved/{path} | Disallow an unauthorized module
*ModulesApi* | [**getAppinfo**](docs/ModulesApi.md#getappinfo) | **GET** /api/appinfo | Get info about available modules
*ModulesApi* | [**getConfigs**](docs/ModulesApi.md#getconfigs) | **GET** /api/config | Get configs of running modules
*ModulesApi* | [**getUnapprovedAppinfo**](docs/ModulesApi.md#getunapprovedappinfo) | **GET** /api/appinfo-unapproved | Get info about unapproved modules
*ModulesApi* | [**moduleGetAppinfo**](docs/ModulesApi.md#modulegetappinfo) | **GET** /api/appinfo/{id} | Get info for a module
*ModulesApi* | [**moduleGetAppinfoConfigured**](docs/ModulesApi.md#modulegetappinfoconfigured) | **GET** /api/appinfo/configured | Get info for registered modules
*ModulesApi* | [**moduleSetAppinfo**](docs/ModulesApi.md#modulesetappinfo) | **POST** /api/appinfo/{id} | Register info for a module
*ModulesApi* | [**refreshAppinfo**](docs/ModulesApi.md#refreshappinfo) | **POST** /api/appinfo/refresh | Refresh available modules
*ModulesApi* | [**setConfig**](docs/ModulesApi.md#setconfig) | **POST** /api/config | Add or update a module
*ModulesApi* | [**startModule**](docs/ModulesApi.md#startmodule) | **POST** /api/config/{id}/start | Start a module
*ModulesApi* | [**stopModule**](docs/ModulesApi.md#stopmodule) | **POST** /api/config/{id}/stop | Stop a module
*SettingsApi* | [**downloadBackup**](docs/SettingsApi.md#downloadbackup) | **GET** /api/backup | Download backup
*SettingsApi* | [**restart**](docs/SettingsApi.md#restart) | **POST** /api/restart | Restart
*SettingsApi* | [**restoreBackup**](docs/SettingsApi.md#restorebackup) | **POST** /api/backup | Restore backup
*SettingsApi* | [**setHostAndPort**](docs/SettingsApi.md#sethostandportoperation) | **POST** /api/settings/url | Set host and port


### Models

- [ChangeUserRoleRequest](docs/ChangeUserRoleRequest.md)
- [Config](docs/Config.md)
- [ConfigInput](docs/ConfigInput.md)
- [CreateUserRequest](docs/CreateUserRequest.md)
- [DemoLicense](docs/DemoLicense.md)
- [DevelopmentLicense](docs/DevelopmentLicense.md)
- [ErrorDetail](docs/ErrorDetail.md)
- [ErrorModel](docs/ErrorModel.md)
- [Event](docs/Event.md)
- [Event1](docs/Event1.md)
- [Event2](docs/Event2.md)
- [Event2Data](docs/Event2Data.md)
- [EventInfo](docs/EventInfo.md)
- [EventMeta](docs/EventMeta.md)
- [GetInfoBody](docs/GetInfoBody.md)
- [GetLicenseResponseBody](docs/GetLicenseResponseBody.md)
- [GetMeBody](docs/GetMeBody.md)
- [GetUsersOutputBody](docs/GetUsersOutputBody.md)
- [Info](docs/Info.md)
- [LicenseClaims](docs/LicenseClaims.md)
- [LicenseV1](docs/LicenseV1.md)
- [PerpetualLicense](docs/PerpetualLicense.md)
- [PostConfigBody](docs/PostConfigBody.md)
- [PostLicenseRequest](docs/PostLicenseRequest.md)
- [PostLoginRequest](docs/PostLoginRequest.md)
- [ProxyOptions](docs/ProxyOptions.md)
- [Queryable](docs/Queryable.md)
- [RestartResponseBody](docs/RestartResponseBody.md)
- [Role](docs/Role.md)
- [Schema](docs/Schema.md)
- [SetHostAndPortRequest](docs/SetHostAndPortRequest.md)
- [SetUserPasswordRequest](docs/SetUserPasswordRequest.md)
- [SidebarItem](docs/SidebarItem.md)
- [Theme](docs/Theme.md)
- [UnapprovedModule](docs/UnapprovedModule.md)
- [UserDetails](docs/UserDetails.md)

### Authorization

Endpoints do not require authorization.


## About

This TypeScript SDK client supports the [Fetch API](https://fetch.spec.whatwg.org/)
and is automatically generated by the
[OpenAPI Generator](https://openapi-generator.tech) project:

- API version: `v0.16.0-31ce037`
- Package version: `v0.16.0-31ce037`
- Generator version: `7.17.0`
- Build package: `org.openapitools.codegen.languages.TypeScriptFetchClientCodegen`

The generated npm module supports the following:

- Environments
  * Node.js
  * Webpack
  * Browserify
- Language levels
  * ES5 - you must have a Promises/A+ library installed
  * ES6
- Module systems
  * CommonJS
  * ES6 module system


## Development

### Building

To build the TypeScript source code, you need to have Node.js and npm installed.
After cloning the repository, navigate to the project directory and run:

```bash
npm install
npm run build
```

### Publishing

Once you've built the package, you can publish it to npm:

```bash
npm publish
```

## License

[]()
