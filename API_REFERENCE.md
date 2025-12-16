# Domihive API Reference

Generated from Swagger documentation.

### `GET` /

#### Responses

| Code | Description | Links |
|---|---|---|
---


## Auth

### `POST` /auth/signup
**Description**: User Signup


#### Request Body
```json
{
  "email": "user@example.com",
  "password": "strongPassword123",
  "role": "user",
  "phoneNumber": "string",
  "firstName": "string",
  "lastName": "string"
}
```


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `POST` /auth/login
**Description**: User Login


#### Request Body
```json
{
  "email": "user@example.com",
  "password": "yourPassword123"
}
```


#### Responses

| Code | Description | Links |
|---|---|---|
```json
[
  {
    "email": "user@example.com",
    "password": "yourPassword123"
  }
]
```

---

### `POST` /auth/forgot-password
**Description**: Request a password reset link via email


#### Request Body
```json
{
  "email": "user@example.com"
}
```


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `POST` /auth/reset-password
**Description**: Reset Password with Token


#### Request Body
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "newPassword": "NewPassword123!"
}
```


#### Responses

| Code | Description | Links |
|---|---|---|
```json
[
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "newPassword": "NewPassword123!"
  }
]
```

---


## Users

### `GET` /users/profile/agent/{id}
**Description**: Get an Agent's Profile


#### Responses

| Code | Description | Links |
|---|---|---|
```json
[
  {
    "id": "string",
    "email": "user@example.com",
    "password": "stringst",
    "firstName": "string",
    "lastName": "string",
    "accountVerified": false,
    "role": "user"
  }
]
```

---

### `GET` /users
**Description**: Get All Users


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /users/requests/all
**Description**: Get All User's Requests


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `DELETE` /users/requests/{id}
**Description**: Delete User's requests


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /users/user/interests
**Description**: Get All User's Interest


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /users/user/interests/active
**Description**: Get All User's Active Interests


#### Responses

| Code | Description | Links |
|---|---|---|
---


## Requests

### `POST` /requests
**Description**: Create a Request


#### Request Body
```json
{
  "propertyTypeId": "123e4567-e89b-12d3-a456-426614174000",
  "cities": [
    "Lekki Phase 1",
    "Victoria Island"
  ],
  "state": "Lagos",
  "minPrice": 300000,
  "maxPrice": 300000,
  "bedrooms": 3,
  "bathrooms": 2
}
```


#### Responses

| Code | Description | Links |
|---|---|---|
```json
[
  {
    "propertyTypeId": "123e4567-e89b-12d3-a456-426614174000",
    "cities": [
      "Lekki Phase 1",
      "Victoria Island"
    ],
    "state": "Lagos",
    "minPrice": 300000,
    "maxPrice": 300000,
    "bedrooms": 3,
    "bathrooms": 2
  }
]
```

---

### `GET` /requests
**Description**: Get All Requests


#### Responses

| Code | Description | Links |
|---|---|---|
```json
[
  {}
]
```

---

### `GET` /requests/{id}
**Description**: Get A Request


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /requests/{userId}/all
**Description**: Get All User Requests


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `PATCH` /requests/{id}/archive
**Description**: Archive an active request


#### Responses

| Code | Description | Links |
|---|---|---|
---


## Interests

### `POST` /interests/user/{userId}/listing/{listingId}
**Description**: User shows interest in a listing


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `DELETE` /interests/user/{userId}/listing/{listingId}
**Description**: Remove a user's interest in a listing


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /interests/user/{userId}
**Description**: Get all interests for a user


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /interests/user/{userId}/active
**Description**: Get all active interests for a user


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /interests/listing/{listingId}
**Description**: Get all user interests for a specific listing


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /interests/listing/{listingId}/count
**Description**: Get number of interests for a listing


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /interests/{id}
**Description**: Get an interest by its ID


#### Responses

| Code | Description | Links |
|---|---|---|
---


## Agents

### `POST` /agents/profile
**Description**: Create a new agent profile


#### Request Body
```json
{}
```


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /agents/document-types
**Description**: Get all agent document types


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `POST` /agents/document-types
**Description**: Create a new document type


#### Request Body
```json
{}
```


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /agents/profiles
**Description**: Get all agent profiles


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `PATCH` /agents/verify/{agentId}
**Description**: Verify an agent


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `PATCH` /agents/suspend/{agentId}
**Description**: Suspend an agent


#### Request Body
```json
{
  "reason": "string"
}
```


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `PATCH` /agents/document/{documentId}/approval
**Description**: Approve or Reject a document


#### Request Body
```json
{}
```


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `PATCH` /agents/document-types/{id}
**Description**: Update a document type


#### Request Body
```json
{}
```


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `DELETE` /agents/document-types/{id}
**Description**: Delete a document type


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /agents/documents
**Description**: Get all agent documents


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `POST` /agents/documents
**Description**: Create a new agent document


#### Request Body
```json
{}
```


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /agents/documents/user/{userId}
**Description**: Get all documents for a specific user


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /agents/profile/{userId}
**Description**: Get a specific agent profile


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /agents/documents/{agentProfileId}/pending
**Description**: Get all the agents pending documents


#### Responses

| Code | Description | Links |
|---|---|---|
---


## Listings

### `GET` /listing
**Description**: Get all listings


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `POST` /listing
**Description**: Create a new listing


#### Request Body
```json
{}
```


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /listing/search
**Description**: Search listings using filters


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /listing/agent/{agentId}
**Description**: Get listings belonging to a specific agent


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /listing/{id}
**Description**: Get a listing by ID


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `PATCH` /listing/{id}
**Description**: Update a listing


#### Request Body
```json
{}
```


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `DELETE` /listing/{id}
**Description**: Delete a listing by ID


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `PATCH` /listing/{id}/status
**Description**: Change listing status (e.g., ACTIVE, DRAFT)


#### Request Body
```json
{}
```


#### Responses

| Code | Description | Links |
|---|---|---|
---


## Properties

### `GET` /properties
**Description**: Get all properties with optional filters


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /properties/search
**Description**: Search properties by keyword


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /properties/location
**Description**: Get properties filtered by location


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /properties/agent/{agentId}
**Description**: Get all properties belonging to an agent


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `POST` /properties/agent/{agentId}
**Description**: Create a new property for an agent


#### Request Body
```json
{}
```


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /properties/{id}
**Description**: Get property by ID


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `PATCH` /properties/{id}
**Description**: Update an existing property


#### Request Body
```json
{}
```


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `DELETE` /properties/{id}
**Description**: Delete property by ID


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /properties/types/all
**Description**: Get all property types


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /properties/types/{id}
**Description**: Get a single property type by ID


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `PATCH` /properties/types/{id}
**Description**: Update a property type


#### Request Body
```json
{}
```


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `DELETE` /properties/types/{id}
**Description**: Delete a property type


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `POST` /properties/types
**Description**: Create new property type


#### Request Body
```json
{}
```


#### Responses

| Code | Description | Links |
|---|---|---|
---


## Inquiry

### `POST` /inquiry/listing/{listingId}
**Description**: Ask a question about a listing


#### Request Body
```json
{
  "content": "Is this place available for short stays?"
}
```


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /inquiry/listing/{listingId}
**Description**: Get all questions for a listing


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /inquiry/user/my-questions
**Description**: Get all questions asked by the authenticated user


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /inquiry/agent/unanswered
**Description**: Get all unanswered questions assigned to an agent


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `PATCH` /inquiry/question/{id}
**Description**: Update a question (User only)


#### Request Body
```json
{}
```


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `DELETE` /inquiry/question/{id}
**Description**: Delete a question (User only)


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `POST` /inquiry/question/{questionId}/answer
**Description**: Answer a question (Agent only)


#### Request Body
```json
{}
```


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `PATCH` /inquiry/answer/{id}
**Description**: Update an answer


#### Request Body
```json
{}
```


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `DELETE` /inquiry/answer/{id}
**Description**: Delete an answer


#### Responses

| Code | Description | Links |
|---|---|---|
---


## Request-Response

### `POST` /request-response/{requestId}/respond
**Description**: Respond to a client request (Agent only)


#### Request Body
```json
{
  "agentId": "uuid-agent",
  "propertyIds": [
    "uuid-prop1",
    "uuid-prop2"
  ],
  "message": "I found options you might like."
}
```


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /request-response/request/{requestId}
**Description**: Get all agent responses for a request


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `GET` /request-response/client/{userId}
**Description**: Get all property requests submitted by a client


#### Responses

| Code | Description | Links |
|---|---|---|
---

### `PATCH` /request-response/{responseId}/viewed
**Description**: Mark a response as viewed


#### Responses

| Code | Description | Links |
|---|---|---|
---


## Cloudinary

### `POST` /upload
**Description**: Upload a single file


#### Request Body

#### Responses

| Code | Description | Links |
|---|---|---|
```json
{
  "message": "File uploaded successfully",
  "data": {
    "publicId": "uploads/abc123xyz",
    "url": "https://res.cloudinary.com/demo/image/upload/v1234567890/uploads/abc123xyz.jpg",
    "format": "jpg",
    "width": 1920,
    "height": 1080,
    "bytes": 245678,
    "createdAt": "2024-01-01T12:00:00Z"
  }
}
```

---

### `POST` /upload/upload-multiple
**Description**: Upload multiple files


#### Request Body

#### Responses

| Code | Description | Links |
|---|---|---|
```json
{
  "message": "3 file(s) uploaded successfully",
  "data": [
    {
      "publicId": "uploads/file1",
      "url": "https://res.cloudinary.com/demo/image/upload/v1234567890/uploads/file1.jpg",
      "format": "jpg",
      "bytes": 123456
    },
    {
      "publicId": "uploads/file2",
      "url": "https://res.cloudinary.com/demo/image/upload/v1234567890/uploads/file2.png",
      "format": "png",
      "bytes": 234567
    }
  ]
}
```

---

### `DELETE` /upload/delete
**Description**: Delete a single file


#### Request Body
```json
{
  "publicId": "uploads/abc123"
}
```


#### Responses

| Code | Description | Links |
|---|---|---|
```json
{
  "message": "File deleted successfully",
  "data": {
    "result": "ok"
  }
}
```

---

### `DELETE` /upload/delete-multiple
**Description**: Delete multiple files


#### Request Body
```json
{
  "publicIds": [
    "uploads/abc123",
    "uploads/def456"
  ]
}
```


#### Responses

| Code | Description | Links |
|---|---|---|
```json
{
  "message": "3 file(s) deletion processed",
  "data": {
    "deleted": {
      "uploads/file1": "deleted",
      "uploads/file2": "deleted"
    },
    "deleted_counts": {
      "uploads/file1": {
        "original": 1
      },
      "uploads/file2": {
        "original": 1
      }
    }
  }
}
```

---
