module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    name: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.INTEGER
    },
    currency: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    isDeleted: {
      type: Sequelize.BOOLEAN
    },
    viewCount: {
      type: Sequelize.INTEGER
    }
  });

  return Product;
};
