const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
const Job = require("./jobs-model");

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
const Application = sequelize.define(
  "Application",
  {
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Job, // refers to Job model
        key: "id",
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    yearsOfExperience: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resume: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// Define association with job model
Job.hasMany(Application, {
  foreignKey: "id",
  as: "applications",
  onDelete: "CASCADE",
});
Application.belongsTo(Job, { foreignKey: "id" });

// sync the model with the database
sequelize
  .sync()
  .then(() => {
    console.log(
      "Application model has been successfully defined and synchronized with the database."
    );
  })
  .catch((error) => {
    console.error(
      "Unable to sync Application model with the database:",
      error
    );
  });

module.exports = Application;
