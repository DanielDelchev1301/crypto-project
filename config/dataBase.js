const mongoose = require('mongoose');
const { CONNECTION_STRING } = require('./constants');

exports.initializeDataBase = () => mongoose.connect(CONNECTION_STRING);