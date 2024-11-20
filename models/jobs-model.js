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
const Job = sequelize.define(
  "Job",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    task: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
      validate: {
        isArray(value) {
          if (!Array.isArray(value)) {
            throw new Error("Tasks must be an array.");
          }
        },
      },
    },
    openings: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
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
      "Jobs model has been successfully defined and synchronized with the database."
    );
  })
  .catch((error) => {
    console.error("Unable to sync Jobs model with the database:", error);
  });

module.exports = Job;
