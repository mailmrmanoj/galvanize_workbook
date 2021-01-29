# Product Management

 

 
 

## Project setup
```
npm install
```

### Run
```
node server.js
```

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
