const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
});

taskSchema.methods.updateStatus = function (status) {
    this.status = status;
};

taskSchema.methods.addTask = function (text) {
    this.text = text;
    this.status = false;
};

const TaskModel = mongoose.model(
    "tasks",
    taskSchema
);

module.exports = { TaskModel };