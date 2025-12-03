/* tslint:disable */
/* eslint-disable */
/**
 * Manager API
 * # Changelog  ## 0.16.0 (2025-11-27)   ### Features  * Change perpetual license to have a configured module limit  ## 0.15.3 (2025-11-27)   ### Features  * Add refresh button for modules   ### Bug Fixes  * Ensure debug table don\'t show events sent to another module * Ensure the user is notified of successful license request download * Fix empty external module screen bug  ## 0.15.2 (2025-11-25)   ### Bug Fixes  * Change poll rate for modules to every second  ## 0.15.1 (2025-11-25)   ### Bug Fixes  * Set status when starting up executable  ## 0.15.0 (2025-11-24)   ### Features  * Allow changing the host or port from the UI * Improve replies viewer * Show event titles in debugger instead of names where possible * Show status reason and extra details   ### Bug Fixes  * Ensure modules have titles * Use current manager URL when restarting * Usernames should not contain invalid characters  ## 0.14.0 (2025-11-17)   ### ⚠ BREAKING CHANGES  * Set data directory to ProgramData\\Teldio\\Fabric on Windows  ### Features  * Make manager/supervisor url+port configurable * Set data directory to ProgramData\\Teldio\\Fabric on Windows   ### Bug Fixes  * Fix slow shutdown of modules on Windows   ### Miscellaneous Chores  * Change release number  ## 0.13.0 (2025-11-13)   ### Features  * Add mui timepicker for time fields   ### Bug Fixes  * Ensure service modules run without a license * Make backups work in Windows  ## 0.12.1 (2025-11-07)   ### Bug Fixes  * Fix electron build  ## 0.12.0 (2025-11-07)   ### Features  * Add backup and restore * Allow theming the manager * Manager logs are logged to file on disk * Service modules   ### Bug Fixes  * Add message for when no modules are configured * Ensure manager can handle proxy info better * Ensure passwords are encrypted even if left empty * Ensure status message is correctly set * Improve breakpoints for smaller screens * Skip encryption/decryption of value if key is missing from config * Start modules only after API is registered * Support multi line text in module config form  ## 0.11.0 (2025-10-28)   ### Features  * Add new configured module page and other UI improvements * Allow changing user passwords  ## 0.10.5 (2025-10-28)   ### Miscellaneous Chores  * Upgrade electron-builder version  ## 0.10.4 (2025-10-27)   ### Miscellaneous Chores  * release 0.10.4  ## 0.10.3 (2025-10-27)   ### Bug Fixes  * Run azure trusted action only on windows  ## 0.10.2 (2025-10-27)   ### Bug Fixes  * Fix powershell env variables  ## 0.10.1 (2025-10-27)   ### Miscellaneous Chores  * release 0.10.1  ## 0.10.0 (2025-10-27)   ### Features  * Add HTTPS * Add options for user when reaching a forbidden page * Encrypt config secrets * Provide Manager UI as desktop application * Sign manager and UI Windows executables   ### Bug Fixes  * Disable annoying proxy errors * Ensure debugger displays module titles instead of names * Ensure manager log messages have module name set * Ensure module configs are always read * Improve copy module ID tooltip * Only make first letter uppercase in error messages * Reorganise sidebar and page names  ## 0.9.1 (2025-10-08)   ### Bug Fixes  * Check if a module is approved before running it  ## 0.9.0 (2025-10-07)   ### Features  * Add user management * Module status indicator reflects the latest status event sent by the module instance * Protect system from unapproved executables   ### Bug Fixes  * Add missing auth middleware for unapproved modules * Another license nil panic fix * Fix missing license panic  ## 0.8.1 (2025-09-24)   ### Miscellaneous Chores  * Release as Fabric instead of Arnie  ## 0.8.0 (2025-09-23)  ### Features  - Make Manager UI responsive to system dark mode settings  ### Bug Fixes  - Ensure JSON text appears in light mode - Pass source module id when simulating events from modules and module instances - Show the urls from the proxied behavior module on the main page  ## 0.7.1 (2025-08-21)  ### Bug Fixes  - Don\'t load external modules on first page load - Fix about:blank in frames - Improve display of debug table - Improve display of scrollbars - Tooltip should not appear when sidebar is expanded  ## 0.7.0 (2025-08-20)  ### Features  - Proxied modules grouped by module in sidebar  ### Bug Fixes  - Wrap module IDs and names properly  ## 0.6.0 (2025-08-12)  ### Features  - Support \"password\" fields in configs - Support module proxies  ### Bug Fixes  - Ensure users are shown a warning if leaving unsaved changes  ## 0.5.1 (2025-07-17)  ### Bug Fixes  - Ensure frontend is served correctly in prod  ## 0.5.0 (2025-07-17)  ### Features  - Add advanced behavior UI  ### Bug Fixes  - Don\'t reset config form unnecessarily - Fix useLocalStorageState - Improve error outputting in cases of unexpected info exit - Show title and description in JSON field  ## 0.4.1 (2025-07-08)  ### Bug Fixes  - Improve link handling for changelog  ## 0.4.0 (2025-07-03)  ### Features  - Add JSON field editor to configs - Add JSON viewer for events - Allow searching for modules - Allow simulating events that a module normally emits  ### Bug Fixes  - Add key to app documentation - App documentation tab should default to first available event type (listen, emits) - Detect when modules quit unexpectedly - Disable sorting behavior for debug table - Don\'t output error when context cancelled - Don\'t show running status in AvailableModulesPage when there\'s no module running - Improve executable running code - Save form state for ease of debugging - Searchbar should clear on escape - Use session storage for relevant state instead of local storage  ## 0.3.4 (2025-06-25)  ### Bug Fixes  - Ensure debugger events persist across routes  ## 0.3.3 (2025-06-24)  ### Bug Fixes  - Show manager version in API reference  ## 0.3.2 (2025-06-24)  ### Bug Fixes  - Broken frontend env  ## 0.3.1 (2025-06-24)  ### Bug Fixes  - Ensure typescript errors are caught in build  ## 0.3.0 (2025-06-24)  ### Features  - Update licensing to use stored tokens  ### Bug Fixes  - Don\'t log two errors on dev - Ensure missing configs directory does not crash the program - Remove all references to TAG - Remove unnecessary debugger padding  ## 0.2.1 (2025-06-18)  ### Bug Fixes  - Ensure Proxied services are flushed  ## 0.2.0 (2025-06-17)  ### Features  - Add version support - Change port number  ### Bug Fixes  - Add `-dev` suffix to version when on development - Make version unselectable  ## 0.1.2 (2025-06-16)  ### Bug Fixes  - Only show latest tag  ## 0.1.1 (2025-06-16)  ### Bug Fixes  - Show version overlay  ## 0.1.0 (2025-06-16)  ### Features  - Add CI  ### Bug Fixes  - Sidebar layout zoom fix 
 *
 * The version of the OpenAPI document: v0.16.0-31ce037
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  ChangeUserRoleRequest,
  CreateUserRequest,
  ErrorModel,
  GetMeBody,
  GetUsersOutputBody,
  PostLoginRequest,
  SetUserPasswordRequest,
} from '../models/index';
import {
    ChangeUserRoleRequestFromJSON,
    ChangeUserRoleRequestToJSON,
    CreateUserRequestFromJSON,
    CreateUserRequestToJSON,
    ErrorModelFromJSON,
    ErrorModelToJSON,
    GetMeBodyFromJSON,
    GetMeBodyToJSON,
    GetUsersOutputBodyFromJSON,
    GetUsersOutputBodyToJSON,
    PostLoginRequestFromJSON,
    PostLoginRequestToJSON,
    SetUserPasswordRequestFromJSON,
    SetUserPasswordRequestToJSON,
} from '../models/index';

export interface ChangeUserRoleOperationRequest {
    username: string;
    changeUserRoleRequest: Omit<ChangeUserRoleRequest, '$schema'>;
}

export interface CreateUserOperationRequest {
    createUserRequest: Omit<CreateUserRequest, '$schema'>;
}

export interface DeleteUserRequest {
    username: string;
}

export interface GetMeRequest {
    fabricUser?: string;
}

export interface PostLoginOperationRequest {
    postLoginRequest: Omit<PostLoginRequest, '$schema'>;
}

export interface SetUserPasswordOperationRequest {
    setUserPasswordRequest: Omit<SetUserPasswordRequest, '$schema'>;
    fabricUser?: string;
}

/**
 * 
 */
export class AuthApi extends runtime.BaseAPI {

    /**
     * Change user role
     */
    async changeUserRoleRaw(requestParameters: ChangeUserRoleOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['username'] == null) {
            throw new runtime.RequiredError(
                'username',
                'Required parameter "username" was null or undefined when calling changeUserRole().'
            );
        }

        if (requestParameters['changeUserRoleRequest'] == null) {
            throw new runtime.RequiredError(
                'changeUserRoleRequest',
                'Required parameter "changeUserRoleRequest" was null or undefined when calling changeUserRole().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';


        let urlPath = `/api/users/{username}/role`;
        urlPath = urlPath.replace(`{${"username"}}`, encodeURIComponent(String(requestParameters['username'])));

        const response = await this.request({
            path: urlPath,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ChangeUserRoleRequestToJSON(requestParameters['changeUserRoleRequest']),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Change user role
     */
    async changeUserRole(requestParameters: ChangeUserRoleOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.changeUserRoleRaw(requestParameters, initOverrides);
    }

    /**
     * Create user
     */
    async createUserRaw(requestParameters: CreateUserOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['createUserRequest'] == null) {
            throw new runtime.RequiredError(
                'createUserRequest',
                'Required parameter "createUserRequest" was null or undefined when calling createUser().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';


        let urlPath = `/api/users`;

        const response = await this.request({
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateUserRequestToJSON(requestParameters['createUserRequest']),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Create user
     */
    async createUser(requestParameters: CreateUserOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.createUserRaw(requestParameters, initOverrides);
    }

    /**
     * Delete user
     */
    async deleteUserRaw(requestParameters: DeleteUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['username'] == null) {
            throw new runtime.RequiredError(
                'username',
                'Required parameter "username" was null or undefined when calling deleteUser().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/api/users/{username}`;
        urlPath = urlPath.replace(`{${"username"}}`, encodeURIComponent(String(requestParameters['username'])));

        const response = await this.request({
            path: urlPath,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete user
     */
    async deleteUser(requestParameters: DeleteUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteUserRaw(requestParameters, initOverrides);
    }

    /**
     * Get current user info
     */
    async getMeRaw(requestParameters: GetMeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetMeBody>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/api/me`;

        const response = await this.request({
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetMeBodyFromJSON(jsonValue));
    }

    /**
     * Get current user info
     */
    async getMe(requestParameters: GetMeRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetMeBody> {
        const response = await this.getMeRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get users
     */
    async getUsersRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetUsersOutputBody>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/api/users`;

        const response = await this.request({
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetUsersOutputBodyFromJSON(jsonValue));
    }

    /**
     * Get users
     */
    async getUsers(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetUsersOutputBody> {
        const response = await this.getUsersRaw(initOverrides);
        return await response.value();
    }

    /**
     * Log in
     */
    async postLoginRaw(requestParameters: PostLoginOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['postLoginRequest'] == null) {
            throw new runtime.RequiredError(
                'postLoginRequest',
                'Required parameter "postLoginRequest" was null or undefined when calling postLogin().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';


        let urlPath = `/api/login`;

        const response = await this.request({
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: PostLoginRequestToJSON(requestParameters['postLoginRequest']),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Log in
     */
    async postLogin(requestParameters: PostLoginOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.postLoginRaw(requestParameters, initOverrides);
    }

    /**
     * Log out
     */
    async postLogoutRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/api/logout`;

        const response = await this.request({
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Log out
     */
    async postLogout(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.postLogoutRaw(initOverrides);
    }

    /**
     * Set current user password
     */
    async setUserPasswordRaw(requestParameters: SetUserPasswordOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['setUserPasswordRequest'] == null) {
            throw new runtime.RequiredError(
                'setUserPasswordRequest',
                'Required parameter "setUserPasswordRequest" was null or undefined when calling setUserPassword().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';


        let urlPath = `/api/me/password`;

        const response = await this.request({
            path: urlPath,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: SetUserPasswordRequestToJSON(requestParameters['setUserPasswordRequest']),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Set current user password
     */
    async setUserPassword(requestParameters: SetUserPasswordOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.setUserPasswordRaw(requestParameters, initOverrides);
    }

}
