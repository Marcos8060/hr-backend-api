const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
const User = require("./authentication-model");

dotenv.config();

// initialize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

// define models
const Product = sequelize.define(
  "Product",
  {
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: "username",
      },
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("in stock", "out of stock"),
      defaultValue: "in stock",
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

// sync the model with the database
sequelize
  .sync()
  .then(() => {
    console.log(
      "Product model has been successfully defined and synchronized with the database."
    );
  })
  .catch((error) => {
    console.error("Unable to sync Product model with the database:", error);
  });

module.exports = Product;
