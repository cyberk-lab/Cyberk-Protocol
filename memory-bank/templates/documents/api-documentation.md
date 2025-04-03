# {{apiName}} API Documentation

**Version:** {{apiVersion}}  
**Last Updated:** {{lastUpdated}}  
**Base URL:** {{baseUrl}}

## Overview

{{apiDescription}}

## Authentication

{{authDescription}}

### Headers

| Header Name | Required | Description |
|-------------|----------|-------------|
| Authorization | Yes | Bearer token for authentication |
| Content-Type | Yes | Application/json |
| Accept | No | Application/json |

## Endpoints

{{#each endpoints}}

### {{name}}

**URL:** `{{url}}`  
**Method:** {{method}}  
**Description:** {{description}}

#### Request Parameters

{{#if urlParams}}
**URL Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
{{#each urlParams}}
| {{name}} | {{type}} | {{required}} | {{description}} |
{{/each}}
{{/if}}

{{#if queryParams}}
**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
{{#each queryParams}}
| {{name}} | {{type}} | {{required}} | {{description}} |
{{/each}}
{{/if}}

{{#if bodyParams}}
**Request Body:**

```json
{{bodyExample}}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
{{#each bodyParams}}
| {{name}} | {{type}} | {{required}} | {{description}} |
{{/each}}
{{/if}}

#### Response

**Success Response:**

```json
{{successResponse}}
```

**Error Responses:**

{{#each errorResponses}}
Status: {{status}}

```json
{{response}}
```

{{/each}}

#### Example

```bash
curl -X {{method}} \
  {{baseUrl}}{{url}} \
  -H 'Authorization: Bearer {{sampleToken}}' \
  -H 'Content-Type: application/json' \
  {{#if bodyParams}}
  -d '{{bodyExample}}'
  {{/if}}
```

{{/each}}

## Error Codes

| Code | Description |
|------|-------------|
{{#each errorCodes}}
| {{code}} | {{description}} |
{{/each}}

## Rate Limiting

{{rateLimitingDescription}}

## Changelog

{{#each changelog}}
### {{version}} ({{date}})

{{#each changes}}
- {{this}}
{{/each}}

{{/each}}
