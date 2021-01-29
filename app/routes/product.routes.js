module.exports = app => {
  const products = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Create a new Product
  router.post("/", products.create);

  // Retrieve all Products
  router.get("/", products.findAll);


  // Retrieve a single Product with id
  router.get("/:id", products.findOne);

  // Delete a Product with id
  router.delete("/:id", products.delete);

  // Retrieve all Products with highest view count
  router.get('/maxView/findByViewCount', products.findAllByViewCount);

  //Retrieve based on custom currency
  router.get("/:id/getProductByCurrency", products.findOneByCustomCurrency);



  app.use("/api/products", router);
};
