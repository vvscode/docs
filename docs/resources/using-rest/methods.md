---
id: "5d53ef246ba536033f160abf"
title: "Methods"
excerpt: ""
---
The API is developed using the following REST style operations:

    [GET] - Fetch / Query
    [POST] - Create / New / Start 
    [PUT] - 'Full' Update / Alter / Modify
    [PATCH] - 'Partially' Update / Alter / Modify
    [DELETE] - Remove / Stop / Cancel

## Errors

The API uses the HTTP status code to indicate failure and the body contains more information.

    [Error]
        int - errorCode
        string - message

*Example*

    HTTP Status Code: 401 (Unauthorized)
    {
        "errorCode":40102,
        "message":"Invalid Signature"
    }

## Error Codes

An error code contains five digits. The first three digits are the same as the HTTP Status Code.

    [BadRequest - 400]
    40001 - Parameter Validation
    
    [Unauthorized - 401]
    40100 - Authorization Header
    40101 - Timestamp Header
    40102 - Invalid Signature
    
    [InternalServerError - 500]
    50000 - Internal Server Error
    
    [ServiceUnavailable - 503]
    50300 - Temporary Down