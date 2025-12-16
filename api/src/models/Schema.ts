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

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface Schema
 */
export interface Schema {
    [key: string]: any | any;
    /**
     * 
     * @type {string}
     * @memberof Schema
     */
    $anchor?: string;
    /**
     * 
     * @type {string}
     * @memberof Schema
     */
    $comment?: string;
    /**
     * 
     * @type {{ [key: string]: Schema; }}
     * @memberof Schema
     */
    $defs?: { [key: string]: Schema; };
    /**
     * 
     * @type {string}
     * @memberof Schema
     */
    $dynamicRef?: string;
    /**
     * 
     * @type {string}
     * @memberof Schema
     */
    $id?: string;
    /**
     * 
     * @type {string}
     * @memberof Schema
     */
    $ref?: string;
    /**
     * 
     * @type {string}
     * @memberof Schema
     */
    $schema?: string;
    /**
     * 
     * @type {Schema}
     * @memberof Schema
     */
    additionalProperties?: Schema;
    /**
     * 
     * @type {Array<Schema>}
     * @memberof Schema
     */
    allOf?: Array<Schema> | null;
    /**
     * 
     * @type {Array<Schema>}
     * @memberof Schema
     */
    anyOf?: Array<Schema> | null;
    /**
     * 
     * @type {any}
     * @memberof Schema
     */
    _const?: any | null;
    /**
     * 
     * @type {Schema}
     * @memberof Schema
     */
    contains?: Schema;
    /**
     * 
     * @type {string}
     * @memberof Schema
     */
    contentEncoding?: string;
    /**
     * 
     * @type {string}
     * @memberof Schema
     */
    contentMediaType?: string;
    /**
     * 
     * @type {Schema}
     * @memberof Schema
     */
    contentSchema?: Schema;
    /**
     * 
     * @type {any}
     * @memberof Schema
     */
    _default?: any | null;
    /**
     * 
     * @type {{ [key: string]: Array<string> | null; }}
     * @memberof Schema
     */
    dependentRequired?: { [key: string]: Array<string> | null; };
    /**
     * 
     * @type {{ [key: string]: Schema; }}
     * @memberof Schema
     */
    dependentSchemas?: { [key: string]: Schema; };
    /**
     * 
     * @type {boolean}
     * @memberof Schema
     */
    deprecated?: boolean;
    /**
     * 
     * @type {string}
     * @memberof Schema
     */
    description?: string;
    /**
     * 
     * @type {Schema}
     * @memberof Schema
     */
    _else?: Schema;
    /**
     * 
     * @type {Array<any>}
     * @memberof Schema
     */
    _enum?: Array<any> | null;
    /**
     * 
     * @type {Array<any>}
     * @memberof Schema
     */
    examples?: Array<any> | null;
    /**
     * 
     * @type {number}
     * @memberof Schema
     */
    exclusiveMaximum?: number;
    /**
     * 
     * @type {number}
     * @memberof Schema
     */
    exclusiveMinimum?: number;
    /**
     * 
     * @type {string}
     * @memberof Schema
     */
    format?: string;
    /**
     * 
     * @type {Schema}
     * @memberof Schema
     */
    _if?: Schema;
    /**
     * 
     * @type {Schema}
     * @memberof Schema
     */
    items?: Schema;
    /**
     * 
     * @type {number}
     * @memberof Schema
     */
    maxContains?: number;
    /**
     * 
     * @type {number}
     * @memberof Schema
     */
    maxItems?: number;
    /**
     * 
     * @type {number}
     * @memberof Schema
     */
    maxLength?: number;
    /**
     * 
     * @type {number}
     * @memberof Schema
     */
    maxProperties?: number;
    /**
     * 
     * @type {number}
     * @memberof Schema
     */
    maximum?: number;
    /**
     * 
     * @type {number}
     * @memberof Schema
     */
    minContains?: number;
    /**
     * 
     * @type {number}
     * @memberof Schema
     */
    minItems?: number;
    /**
     * 
     * @type {number}
     * @memberof Schema
     */
    minLength?: number;
    /**
     * 
     * @type {number}
     * @memberof Schema
     */
    minProperties?: number;
    /**
     * 
     * @type {number}
     * @memberof Schema
     */
    minimum?: number;
    /**
     * 
     * @type {number}
     * @memberof Schema
     */
    multipleOf?: number;
    /**
     * 
     * @type {Schema}
     * @memberof Schema
     */
    not?: Schema;
    /**
     * 
     * @type {Array<Schema>}
     * @memberof Schema
     */
    oneOf?: Array<Schema> | null;
    /**
     * 
     * @type {string}
     * @memberof Schema
     */
    pattern?: string;
    /**
     * 
     * @type {{ [key: string]: Schema; }}
     * @memberof Schema
     */
    patternProperties?: { [key: string]: Schema; };
    /**
     * 
     * @type {Array<Schema>}
     * @memberof Schema
     */
    prefixItems?: Array<Schema> | null;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof Schema
     */
    properties?: { [key: string]: any; };
    /**
     * 
     * @type {Schema}
     * @memberof Schema
     */
    propertyNames?: Schema;
    /**
     * 
     * @type {boolean}
     * @memberof Schema
     */
    readOnly?: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof Schema
     */
    required?: Array<string> | null;
    /**
     * 
     * @type {Schema}
     * @memberof Schema
     */
    then?: Schema;
    /**
     * 
     * @type {string}
     * @memberof Schema
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof Schema
     */
    type?: string;
    /**
     * 
     * @type {boolean}
     * @memberof Schema
     */
    uniqueItems?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Schema
     */
    writeOnly?: boolean;
}

/**
 * Check if a given object implements the Schema interface.
 */
export function instanceOfSchema(value: object): value is Schema {
    return true;
}

export function SchemaFromJSON(json: any): Schema {
    return SchemaFromJSONTyped(json, false);
}

export function SchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): Schema {
    if (json == null) {
        return json;
    }
    return {
        
            ...json,
        '$anchor': json['$anchor'] == null ? undefined : json['$anchor'],
        '$comment': json['$comment'] == null ? undefined : json['$comment'],
        '$defs': json['$defs'] == null ? undefined : (mapValues(json['$defs'], SchemaFromJSON)),
        '$dynamicRef': json['$dynamicRef'] == null ? undefined : json['$dynamicRef'],
        '$id': json['$id'] == null ? undefined : json['$id'],
        '$ref': json['$ref'] == null ? undefined : json['$ref'],
        '$schema': json['$schema'] == null ? undefined : json['$schema'],
        'additionalProperties': json['additionalProperties'] == null ? undefined : SchemaFromJSON(json['additionalProperties']),
        'allOf': json['allOf'] == null ? undefined : ((json['allOf'] as Array<any>).map(SchemaFromJSON)),
        'anyOf': json['anyOf'] == null ? undefined : ((json['anyOf'] as Array<any>).map(SchemaFromJSON)),
        '_const': json['const'] == null ? undefined : json['const'],
        'contains': json['contains'] == null ? undefined : SchemaFromJSON(json['contains']),
        'contentEncoding': json['contentEncoding'] == null ? undefined : json['contentEncoding'],
        'contentMediaType': json['contentMediaType'] == null ? undefined : json['contentMediaType'],
        'contentSchema': json['contentSchema'] == null ? undefined : SchemaFromJSON(json['contentSchema']),
        '_default': json['default'] == null ? undefined : json['default'],
        'dependentRequired': json['dependentRequired'] == null ? undefined : json['dependentRequired'],
        'dependentSchemas': json['dependentSchemas'] == null ? undefined : (mapValues(json['dependentSchemas'], SchemaFromJSON)),
        'deprecated': json['deprecated'] == null ? undefined : json['deprecated'],
        'description': json['description'] == null ? undefined : json['description'],
        '_else': json['else'] == null ? undefined : SchemaFromJSON(json['else']),
        '_enum': json['enum'] == null ? undefined : json['enum'],
        'examples': json['examples'] == null ? undefined : json['examples'],
        'exclusiveMaximum': json['exclusiveMaximum'] == null ? undefined : json['exclusiveMaximum'],
        'exclusiveMinimum': json['exclusiveMinimum'] == null ? undefined : json['exclusiveMinimum'],
        'format': json['format'] == null ? undefined : json['format'],
        '_if': json['if'] == null ? undefined : SchemaFromJSON(json['if']),
        'items': json['items'] == null ? undefined : SchemaFromJSON(json['items']),
        'maxContains': json['maxContains'] == null ? undefined : json['maxContains'],
        'maxItems': json['maxItems'] == null ? undefined : json['maxItems'],
        'maxLength': json['maxLength'] == null ? undefined : json['maxLength'],
        'maxProperties': json['maxProperties'] == null ? undefined : json['maxProperties'],
        'maximum': json['maximum'] == null ? undefined : json['maximum'],
        'minContains': json['minContains'] == null ? undefined : json['minContains'],
        'minItems': json['minItems'] == null ? undefined : json['minItems'],
        'minLength': json['minLength'] == null ? undefined : json['minLength'],
        'minProperties': json['minProperties'] == null ? undefined : json['minProperties'],
        'minimum': json['minimum'] == null ? undefined : json['minimum'],
        'multipleOf': json['multipleOf'] == null ? undefined : json['multipleOf'],
        'not': json['not'] == null ? undefined : SchemaFromJSON(json['not']),
        'oneOf': json['oneOf'] == null ? undefined : ((json['oneOf'] as Array<any>).map(SchemaFromJSON)),
        'pattern': json['pattern'] == null ? undefined : json['pattern'],
        'patternProperties': json['patternProperties'] == null ? undefined : (mapValues(json['patternProperties'], SchemaFromJSON)),
        'prefixItems': json['prefixItems'] == null ? undefined : ((json['prefixItems'] as Array<any>).map(SchemaFromJSON)),
        'properties': json['properties'] == null ? undefined : json['properties'],
        'propertyNames': json['propertyNames'] == null ? undefined : SchemaFromJSON(json['propertyNames']),
        'readOnly': json['readOnly'] == null ? undefined : json['readOnly'],
        'required': json['required'] == null ? undefined : json['required'],
        'then': json['then'] == null ? undefined : SchemaFromJSON(json['then']),
        'title': json['title'] == null ? undefined : json['title'],
        'type': json['type'] == null ? undefined : json['type'],
        'uniqueItems': json['uniqueItems'] == null ? undefined : json['uniqueItems'],
        'writeOnly': json['writeOnly'] == null ? undefined : json['writeOnly'],
    };
}

export function SchemaToJSON(json: any): Schema {
    return SchemaToJSONTyped(json, false);
}

export function SchemaToJSONTyped(value?: Schema | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
            ...value,
        '$anchor': value['$anchor'],
        '$comment': value['$comment'],
        '$defs': value['$defs'] == null ? undefined : (mapValues(value['$defs'], SchemaToJSON)),
        '$dynamicRef': value['$dynamicRef'],
        '$id': value['$id'],
        '$ref': value['$ref'],
        '$schema': value['$schema'],
        'additionalProperties': SchemaToJSON(value['additionalProperties']),
        'allOf': value['allOf'] == null ? undefined : ((value['allOf'] as Array<any>).map(SchemaToJSON)),
        'anyOf': value['anyOf'] == null ? undefined : ((value['anyOf'] as Array<any>).map(SchemaToJSON)),
        'const': value['_const'],
        'contains': SchemaToJSON(value['contains']),
        'contentEncoding': value['contentEncoding'],
        'contentMediaType': value['contentMediaType'],
        'contentSchema': SchemaToJSON(value['contentSchema']),
        'default': value['_default'],
        'dependentRequired': value['dependentRequired'],
        'dependentSchemas': value['dependentSchemas'] == null ? undefined : (mapValues(value['dependentSchemas'], SchemaToJSON)),
        'deprecated': value['deprecated'],
        'description': value['description'],
        'else': SchemaToJSON(value['_else']),
        'enum': value['_enum'],
        'examples': value['examples'],
        'exclusiveMaximum': value['exclusiveMaximum'],
        'exclusiveMinimum': value['exclusiveMinimum'],
        'format': value['format'],
        'if': SchemaToJSON(value['_if']),
        'items': SchemaToJSON(value['items']),
        'maxContains': value['maxContains'],
        'maxItems': value['maxItems'],
        'maxLength': value['maxLength'],
        'maxProperties': value['maxProperties'],
        'maximum': value['maximum'],
        'minContains': value['minContains'],
        'minItems': value['minItems'],
        'minLength': value['minLength'],
        'minProperties': value['minProperties'],
        'minimum': value['minimum'],
        'multipleOf': value['multipleOf'],
        'not': SchemaToJSON(value['not']),
        'oneOf': value['oneOf'] == null ? undefined : ((value['oneOf'] as Array<any>).map(SchemaToJSON)),
        'pattern': value['pattern'],
        'patternProperties': value['patternProperties'] == null ? undefined : (mapValues(value['patternProperties'], SchemaToJSON)),
        'prefixItems': value['prefixItems'] == null ? undefined : ((value['prefixItems'] as Array<any>).map(SchemaToJSON)),
        'properties': value['properties'],
        'propertyNames': SchemaToJSON(value['propertyNames']),
        'readOnly': value['readOnly'],
        'required': value['required'],
        'then': SchemaToJSON(value['then']),
        'title': value['title'],
        'type': value['type'],
        'uniqueItems': value['uniqueItems'],
        'writeOnly': value['writeOnly'],
    };
}

