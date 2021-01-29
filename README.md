# Product Management

 

 
 

## Project setup
```
npm install
```

### Run
```
node server.js
```

# REST API


The REST API to the product app is described below.

## Create a new product


### Request

`POST /products/`

     'Accept: application/json' http://localhost:9005/api/products

### Body

     {
        "name": "Banana",
        "price": 10,
        "description": "Banana supplies"
     }

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {
        "id": 6,
        "name": "Banana",
        "price": 10,
        "currency": "USD",
        "description": "Banana supplies",
        "isDeleted": false,
        "viewCount": 0,
        "updatedAt": "2021-01-29T15:14:27.048Z",
        "createdAt": "2021-01-29T15:14:27.048Z"
    }


## Get list of Products

### Request

`GET /products/`

     'Accept: application/json' http://localhost:9005/api/products

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    [
    {
        "id": 1,
        "name": "Board",
        "price": 10,
        "currency": "USD",
        "description": "This is a Board",
        "isDeleted": false,
        "viewCount": 0,
        "createdAt": "2021-01-29T14:48:44.212Z",
        "updatedAt": "2021-01-29T14:48:44.212Z"
    },
    {
        "id": 2,
        "name": "Bond",
        "price": 10,
        "currency": "USD",
        "description": "This is a Bond",
        "isDeleted": false,
        "viewCount": 10,
        "createdAt": "2021-01-29T14:48:13.200Z",
        "updatedAt": "2021-01-29T15:06:15.708Z"
    }
]

## Get a single product

### Request

`GET /products/:id`

     'Accept: application/json' http://localhost:9005/api/products/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 1

    {
        "id": 2,
        "name": "Bond",
        "price": 10,
        "currency": "USD",
        "description": "This is a Bond",
        "isDeleted": false,
        "viewCount": 11,
        "createdAt": "2021-01-29T14:48:13.200Z",
        "updatedAt": "2021-01-29T15:06:15.708Z"
    }

## List the most viewed products (will exclude deleted products & viewCount > 0 Order by DESC limit 5)

### Request

`GET /products/maxView/findByViewCount`

     'Accept: application/json' http://localhost:9005/api/products/maxView/findByViewCount

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 1

    [
        {
            "id": 10,
            "name": "Pencil",
            "price": 10,
            "currency": "USD",
            "description": "This is a Pencil",
            "isDeleted": false,
            "viewCount": 10,
            "createdAt": "2021-01-29T14:48:13.200Z",
            "updatedAt": "2021-01-29T15:06:15.708Z"
        },
        {
            "id": 13,
            "name": "Pencil",
            "price": 10,
            "currency": "USD",
            "description": "This is a Pencil",
            "isDeleted": false,
            "viewCount": 7,
            "createdAt": "2021-01-29T14:48:13.200Z",
            "updatedAt": "2021-01-29T15:06:15.708Z"
        }
     ]

## Delete a product

### Request

`GET /products/:id`

     'Accept: application/json' http://localhost:9005/api/products/1

### Response
 
    {
        "message": "Product was deleted successfully!"
    }

?numberOfProducts=2


GET
localhost:9005/api/products

GET by product id
localhost:9005/api/products/id

DELETE
localhost:9005/api/products/id

GET BY MAX VIEW COUNT-CUSTOM LIMIT(numberOfProducts)-DEFAULT LIMIT:5
localhost:9005/api/products/maxView/findByViewCount?numberOfProducts=2

https://www.npmjs.com/package/@y2nk4/currency-converter

localhost:9005/api/products/2/getProductByCurrency?currency=EUR

 localhost:9005/api/products/maxView/findByViewCount?numberOfProducts=2&currency=INR
