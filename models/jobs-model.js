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
const Jobs = sequelize.define(
  "Profile",
  {
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expectations: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
        validate: {
          isArray(value) {
            if (!Array.isArray(value)) {
              throw new Error('Expectations must be an array.');
            }
          }
        }
      }
  },
  {
    timestamps: true,
  }
);

// Define association with user model
User.hasOne(Profile, {
  foreignKey: "userId",
  as: "profile",
  onDelete: "CASCADE",
});
Profile.belongsTo(User, { foreignKey: "userId" });

// sync the model with the database
sequelize
  .sync()
  .then(() => {
    console.log(
      "Profile model has been successfully defined and synchronized with the database."
    );
  })
  .catch((error) => {
    console.error("Unable to sync Profile model with the database:", error);
  });

module.exports = Jobs;
