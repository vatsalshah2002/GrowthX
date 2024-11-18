const Assignment = require('../models/assignmentModel');

exports.viewAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ adminId: req.user.id });
    res.status(200).send(assignments);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.acceptAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, { status: 'accepted' });
    res.status(200).send(assignment);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.rejectAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, { status: 'rejected' });
    res.status(200).send(assignment);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
