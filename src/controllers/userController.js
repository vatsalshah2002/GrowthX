const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Assignment = require('../models/assignmentModel');
const { generateToken } = require('../utils/jwtHelper');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).send({ userId: user._id });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = generateToken(user);
    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.uploadAssignment = async (req, res) => {
  try {
    const { task, adminId } = req.body;
    const assignment = await Assignment.create({
      userId: req.user.id,
      adminId,
      task,
    });
    res.status(201).send(assignment);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.fetchAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' });
    res.status(200).send(admins);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
