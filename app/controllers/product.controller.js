const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;
let CurrencyConverter = require('@y2nk4/currency-converter')

// Create a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name && !req.body.price) {
    res.status(400).send({
      message: "Please enter mandatory fields like name and price !"
    });
    return;
  }
  const product = {
    name: req.body.name,
    price: req.body.price,
    currency: req.body.currency ? req.body.currency : 'USD',
    description: req.body.description ? req.body.description : 'NA',
    isDeleted: req.body.isDeleted ? req.body.isDeleted : false,
    viewCount: req.body.viewCount ? req.body.viewCount : 0
  };

  // Save Product in the database
  Product.create(product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });
};

// Retrieve all Products from the database.
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
// Use Case
/**
 * 
When a product is deleted, it should no longer
be included in any of the API responses but 
should remain in the database for audit purposes.
 */

exports.findAll = (req, res) => {
  Product.findAll({ where: { isDeleted: false } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products"
      });
    });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  // increment viewCount by 1 for each retrieval
  Product.findByPk(id)
    .then(data => {
      Product.update({
        'viewCount': data.viewCount + 1
      }, { where: { id: id } }).then((data) => {
      })
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + id
      });
    });
  // send updated record
  Product.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + id
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  req.body.isDeleted = true;
  Product.update(req.body, {
    where: {
      id: id
    }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

/**
 * 
When a list of the most viewed products is requested, the API should return the products with the highest view-counts. By default, the top 5
products will be returned, but the request can also specify a custom number of products to return. Only products with at least 1 view should be
included
 */

exports.findAllByViewCount = (req, res) => {
  var numberOfProducts = req.param('numberOfProducts');
  Product.findAll({
    limit: numberOfProducts ? numberOfProducts : 5,
    where: {
      [Op.and]: [
        { isDeleted: false },
        {
          viewCount: {
            [Op.gt]: 0
          }
        }
      ]
    },
    order: [
      ['viewCount', 'DESC']
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products"
      });
    });
};



// Retrieve single product based on custom currency

exports.findOneByCustomCurrency = (req, res) => {
  const id = req.params.id;
  const currency = req.param('currency');

  // increment viewCount by 1 for each retrieval
  Product.findByPk(id)
    .then(data => {
      Product.update({
        'viewCount': data.viewCount + 1
      }, { where: { id: id } }).then((data) => {
      })
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + id
      });
    });
  // send updated record
  Product.findByPk(id)
    .then(data => {
      if (currency != 'USD') {
        // This key is used for testing purpose only
        let converter = new CurrencyConverter('4953ef282a05f56f9351');
        converter.convert('USD', currency, data.price).then(latestCurrency => {
          data.price = latestCurrency;
          data.currency = currency;
          res.send(data);
        }).catch(err => {
          res.status(500).send({
            message: "Error retrieving  currrency details"
          })
        });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + id
      });
    });
};
