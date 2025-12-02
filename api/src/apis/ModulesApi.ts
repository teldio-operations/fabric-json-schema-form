/* tslint:disable */
/* eslint-disable */
/**
 * Manager API
 * # Changelog  ## 0.16.0 (2025-11-27)   ### Features  * Change perpetual license to have a configured module limit  ## 0.15.3 (2025-11-27)   ### Features  * Add refresh button for modules   ### Bug Fixes  * Ensure debug table don\'t show events sent to another module * Ensure the user is notified of successful license request download * Fix empty external module screen bug  ## 0.15.2 (2025-11-25)   ### Bug Fixes  * Change poll rate for modules to every second  ## 0.15.1 (2025-11-25)   ### Bug Fixes  * Set status when starting up executable  ## 0.15.0 (2025-11-24)   ### Features  * Allow changing the host or port from the UI * Improve replies viewer * Show event titles in debugger instead of names where possible * Show status reason and extra details   ### Bug Fixes  * Ensure modules have titles * Use current manager URL when restarting * Usernames should not contain invalid characters  ## 0.14.0 (2025-11-17)   ### ⚠ BREAKING CHANGES  * Set data directory to ProgramData\\Teldio\\Fabric on Windows  ### Features  * Make manager/supervisor url+port configurable * Set data directory to ProgramData\\Teldio\\Fabric on Windows   ### Bug Fixes  * Fix slow shutdown of modules on Windows   ### Miscellaneous Chores  * Change release number  ## 0.13.0 (2025-11-13)   ### Features  * Add mui timepicker for time fields   ### Bug Fixes  * Ensure service modules run without a license * Make backups work in Windows  ## 0.12.1 (2025-11-07)   ### Bug Fixes  * Fix electron build  ## 0.12.0 (2025-11-07)   ### Features  * Add backup and restore * Allow theming the manager * Manager logs are logged to file on disk * Service modules   ### Bug Fixes  * Add message for when no modules are configured * Ensure manager can handle proxy info better * Ensure passwords are encrypted even if left empty * Ensure status message is correctly set * Improve breakpoints for smaller screens * Skip encryption/decryption of value if key is missing from config * Start modules only after API is registered * Support multi line text in module config form  ## 0.11.0 (2025-10-28)   ### Features  * Add new configured module page and other UI improvements * Allow changing user passwords  ## 0.10.5 (2025-10-28)   ### Miscellaneous Chores  * Upgrade electron-builder version  ## 0.10.4 (2025-10-27)   ### Miscellaneous Chores  * release 0.10.4  ## 0.10.3 (2025-10-27)   ### Bug Fixes  * Run azure trusted action only on windows  ## 0.10.2 (2025-10-27)   ### Bug Fixes  * Fix powershell env variables  ## 0.10.1 (2025-10-27)   ### Miscellaneous Chores  * release 0.10.1  ## 0.10.0 (2025-10-27)   ### Features  * Add HTTPS * Add options for user when reaching a forbidden page * Encrypt config secrets * Provide Manager UI as desktop application * Sign manager and UI Windows executables   ### Bug Fixes  * Disable annoying proxy errors * Ensure debugger displays module titles instead of names * Ensure manager log messages have module name set * Ensure module configs are always read * Improve copy module ID tooltip * Only make first letter uppercase in error messages * Reorganise sidebar and page names  ## 0.9.1 (2025-10-08)   ### Bug Fixes  * Check if a module is approved before running it  ## 0.9.0 (2025-10-07)   ### Features  * Add user management * Module status indicator reflects the latest status event sent by the module instance * Protect system from unapproved executables   ### Bug Fixes  * Add missing auth middleware for unapproved modules * Another license nil panic fix * Fix missing license panic  ## 0.8.1 (2025-09-24)   ### Miscellaneous Chores  * Release as Fabric instead of Arnie  ## 0.8.0 (2025-09-23)  ### Features  - Make Manager UI responsive to system dark mode settings  ### Bug Fixes  - Ensure JSON text appears in light mode - Pass source module id when simulating events from modules and module instances - Show the urls from the proxied behavior module on the main page  ## 0.7.1 (2025-08-21)  ### Bug Fixes  - Don\'t load external modules on first page load - Fix about:blank in frames - Improve display of debug table - Improve display of scrollbars - Tooltip should not appear when sidebar is expanded  ## 0.7.0 (2025-08-20)  ### Features  - Proxied modules grouped by module in sidebar  ### Bug Fixes  - Wrap module IDs and names properly  ## 0.6.0 (2025-08-12)  ### Features  - Support \"password\" fields in configs - Support module proxies  ### Bug Fixes  - Ensure users are shown a warning if leaving unsaved changes  ## 0.5.1 (2025-07-17)  ### Bug Fixes  - Ensure frontend is served correctly in prod  ## 0.5.0 (2025-07-17)  ### Features  - Add advanced behavior UI  ### Bug Fixes  - Don\'t reset config form unnecessarily - Fix useLocalStorageState - Improve error outputting in cases of unexpected info exit - Show title and description in JSON field  ## 0.4.1 (2025-07-08)  ### Bug Fixes  - Improve link handling for changelog  ## 0.4.0 (2025-07-03)  ### Features  - Add JSON field editor to configs - Add JSON viewer for events - Allow searching for modules - Allow simulating events that a module normally emits  ### Bug Fixes  - Add key to app documentation - App documentation tab should default to first available event type (listen, emits) - Detect when modules quit unexpectedly - Disable sorting behavior for debug table - Don\'t output error when context cancelled - Don\'t show running status in AvailableModulesPage when there\'s no module running - Improve executable running code - Save form state for ease of debugging - Searchbar should clear on escape - Use session storage for relevant state instead of local storage  ## 0.3.4 (2025-06-25)  ### Bug Fixes  - Ensure debugger events persist across routes  ## 0.3.3 (2025-06-24)  ### Bug Fixes  - Show manager version in API reference  ## 0.3.2 (2025-06-24)  ### Bug Fixes  - Broken frontend env  ## 0.3.1 (2025-06-24)  ### Bug Fixes  - Ensure typescript errors are caught in build  ## 0.3.0 (2025-06-24)  ### Features  - Update licensing to use stored tokens  ### Bug Fixes  - Don\'t log two errors on dev - Ensure missing configs directory does not crash the program - Remove all references to TAG - Remove unnecessary debugger padding  ## 0.2.1 (2025-06-18)  ### Bug Fixes  - Ensure Proxied services are flushed  ## 0.2.0 (2025-06-17)  ### Features  - Add version support - Change port number  ### Bug Fixes  - Add `-dev` suffix to version when on development - Make version unselectable  ## 0.1.2 (2025-06-16)  ### Bug Fixes  - Only show latest tag  ## 0.1.1 (2025-06-16)  ### Bug Fixes  - Show version overlay  ## 0.1.0 (2025-06-16)  ### Features  - Add CI  ### Bug Fixes  - Sidebar layout zoom fix 
 *
 * The version of the OpenAPI document: v0.16.0-97827b4
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  Config,
  ConfigInput,
  ErrorModel,
  Info,
  PostConfigBody,
  UnapprovedModule,
} from '../models/index';
import {
    ConfigFromJSON,
    ConfigToJSON,
    ConfigInputFromJSON,
    ConfigInputToJSON,
    ErrorModelFromJSON,
    ErrorModelToJSON,
    InfoFromJSON,
    InfoToJSON,
    PostConfigBodyFromJSON,
    PostConfigBodyToJSON,
    UnapprovedModuleFromJSON,
    UnapprovedModuleToJSON,
} from '../models/index';

export interface ApproveModuleRequest {
    path: string;
}

export interface DeleteModuleRequest {
    id: string;
}

export interface DisallowModuleRequest {
    path: string;
}

export interface ModuleGetAppinfoRequest {
    id: string;
}

export interface ModuleSetAppinfoRequest {
    id: string;
    requestBody: { [key: string]: any; };
}

export interface SetConfigRequest {
    configInput: Omit<ConfigInput, '$schema'>;
}

export interface StartModuleRequest {
    id: string;
}

export interface StopModuleRequest {
    id: string;
}

/**
 * 
 */
export class ModulesApi extends runtime.BaseAPI {

    /**
     * Approve an unauthorized module
     */
    async approveModuleRaw(requestParameters: ApproveModuleRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['path'] == null) {
            throw new runtime.RequiredError(
                'path',
                'Required parameter "path" was null or undefined when calling approveModule().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/api/appinfo-unapproved/{path}`;
        urlPath = urlPath.replace(`{${"path"}}`, encodeURIComponent(String(requestParameters['path'])));

        const response = await this.request({
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Approve an unauthorized module
     */
    async approveModule(requestParameters: ApproveModuleRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.approveModuleRaw(requestParameters, initOverrides);
    }

    /**
     * Delete a module
     */
    async deleteModuleRaw(requestParameters: DeleteModuleRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling deleteModule().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/api/config/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        const response = await this.request({
            path: urlPath,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete a module
     */
    async deleteModule(requestParameters: DeleteModuleRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteModuleRaw(requestParameters, initOverrides);
    }

    /**
     * Disallow an unauthorized module
     */
    async disallowModuleRaw(requestParameters: DisallowModuleRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['path'] == null) {
            throw new runtime.RequiredError(
                'path',
                'Required parameter "path" was null or undefined when calling disallowModule().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/api/appinfo-unapproved/{path}`;
        urlPath = urlPath.replace(`{${"path"}}`, encodeURIComponent(String(requestParameters['path'])));

        const response = await this.request({
            path: urlPath,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Disallow an unauthorized module
     */
    async disallowModule(requestParameters: DisallowModuleRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.disallowModuleRaw(requestParameters, initOverrides);
    }

    /**
     * Get info about available modules
     */
    async getAppinfoRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Info>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/api/appinfo`;

        const response = await this.request({
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(InfoFromJSON));
    }

    /**
     * Get info about available modules
     */
    async getAppinfo(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Info>> {
        const response = await this.getAppinfoRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get configs of running modules
     */
    async getConfigsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<{ [key: string]: Config; }>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/api/config`;

        const response = await this.request({
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => runtime.mapValues(jsonValue, ConfigFromJSON));
    }

    /**
     * Get configs of running modules
     */
    async getConfigs(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<{ [key: string]: Config; }> {
        const response = await this.getConfigsRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get info about unapproved modules
     */
    async getUnapprovedAppinfoRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<UnapprovedModule>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/api/appinfo-unapproved`;

        const response = await this.request({
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(UnapprovedModuleFromJSON));
    }

    /**
     * Get info about unapproved modules
     */
    async getUnapprovedAppinfo(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<UnapprovedModule>> {
        const response = await this.getUnapprovedAppinfoRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get info for a module
     */
    async moduleGetAppinfoRaw(requestParameters: ModuleGetAppinfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Info>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling moduleGetAppinfo().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/api/appinfo/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        const response = await this.request({
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => InfoFromJSON(jsonValue));
    }

    /**
     * Get info for a module
     */
    async moduleGetAppinfo(requestParameters: ModuleGetAppinfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Info> {
        const response = await this.moduleGetAppinfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get info for registered modules
     */
    async moduleGetAppinfoConfiguredRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<{ [key: string]: Info; }>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/api/appinfo/configured`;

        const response = await this.request({
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => runtime.mapValues(jsonValue, InfoFromJSON));
    }

    /**
     * Get info for registered modules
     */
    async moduleGetAppinfoConfigured(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<{ [key: string]: Info; }> {
        const response = await this.moduleGetAppinfoConfiguredRaw(initOverrides);
        return await response.value();
    }

    /**
     * Register info for a module
     */
    async moduleSetAppinfoRaw(requestParameters: ModuleSetAppinfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling moduleSetAppinfo().'
            );
        }

        if (requestParameters['requestBody'] == null) {
            throw new runtime.RequiredError(
                'requestBody',
                'Required parameter "requestBody" was null or undefined when calling moduleSetAppinfo().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';


        let urlPath = `/api/appinfo/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        const response = await this.request({
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['requestBody'],
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Register info for a module
     */
    async moduleSetAppinfo(requestParameters: ModuleSetAppinfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.moduleSetAppinfoRaw(requestParameters, initOverrides);
    }

    /**
     * Refresh available modules
     */
    async refreshAppinfoRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/api/appinfo/refresh`;

        const response = await this.request({
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Refresh available modules
     */
    async refreshAppinfo(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.refreshAppinfoRaw(initOverrides);
    }

    /**
     * Add or update a module
     */
    async setConfigRaw(requestParameters: SetConfigRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PostConfigBody>> {
        if (requestParameters['configInput'] == null) {
            throw new runtime.RequiredError(
                'configInput',
                'Required parameter "configInput" was null or undefined when calling setConfig().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';


        let urlPath = `/api/config`;

        const response = await this.request({
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ConfigInputToJSON(requestParameters['configInput']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PostConfigBodyFromJSON(jsonValue));
    }

    /**
     * Add or update a module
     */
    async setConfig(requestParameters: SetConfigRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PostConfigBody> {
        const response = await this.setConfigRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Start a module
     */
    async startModuleRaw(requestParameters: StartModuleRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling startModule().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/api/config/{id}/start`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        const response = await this.request({
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Start a module
     */
    async startModule(requestParameters: StartModuleRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.startModuleRaw(requestParameters, initOverrides);
    }

    /**
     * Stop a module
     */
    async stopModuleRaw(requestParameters: StopModuleRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling stopModule().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/api/config/{id}/stop`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        const response = await this.request({
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Stop a module
     */
    async stopModule(requestParameters: StopModuleRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.stopModuleRaw(requestParameters, initOverrides);
    }

}
