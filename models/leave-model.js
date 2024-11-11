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
const Leave = sequelize.define(
  "Leave",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // refers to User model
        key: "id",
      },
    },
    leaveType: {
        type: DataTypes.ENUM("Annual Leave", "Medical Leave","Maternity Leave","Academic Leave"),
      allowNull: false,
     
    },
    fromDate: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    toDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    days: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Approved","Rejected"),
      defaultValue: "Pending",
   
  },
  },
  {
    timestamps: true,
  }
);

// Define association with user model
User.hasOne(Leave, {
  foreignKey: "userId",
  as: "leave",
  onDelete: "CASCADE",
});
Leave.belongsTo(User, { foreignKey: "userId" });

// sync the model with the database
sequelize
  .sync()
  .then(() => {
    console.log(
      "Leave model has been successfully defined and synchronized with the database."
    );
  })
  .catch((error) => {
    console.error("Unable to sync Leave model with the database:", error);
  });

module.exports = Leave;
