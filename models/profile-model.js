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
const Profile = sequelize.define(
  "Profile",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // refers to User model
        key: "id",
      },
    },
    firstName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
     
    },
    lastName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female"),
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employmentType: {
      type: DataTypes.ENUM("Full-time", "Part-time", "Contract"),
      allowNull: false,
    },
    employmentStatus: {
      type: DataTypes.ENUM("Active", "Inactive", "On Leave"),
      allowNull: false,
    },
    supervisor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankAccount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
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

module.exports = Profile;
