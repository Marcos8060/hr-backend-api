const User = require("../models/authentication-model");
const Leave = require("../models/leave-model");

const getLeaveDetails = async (req, res) => {
  try {
    const leave = await Leave.findAll({ where: { userId: req.user.id } });
    return res.status(200).json(leave);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const fetchAllLeaves = async (req, res) => {
  try {
    const leave = await Leave.findAll({
      include: {
        model: User,
        as: "applicant",
        attributes: ["id", "username"],
      },
    });
    return res.status(200).json(leave);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createLeave = async (req, res) => {
  try {
    await Leave.create({
      ...req.body,
      userId: req.user.id,
    });
    return res.status(201).json({ message: "Leave created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateLeave = async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Leave.update(req.body, { where: { id } });
    if (!updated) {
      return res.status(404).json({ message: "Leave not found" });
    }
    res.status(200).json({ message: "Leave updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLeave = async (req, res) => {
  const { id } = req.params;

  try {
    const leave = await Leave.destroy({ where: { id: id } });
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }
    res.status(200).json({ message: "Leave deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLeaveDetails,
  createLeave,
  updateLeave,
  deleteLeave,
  fetchAllLeaves
};
