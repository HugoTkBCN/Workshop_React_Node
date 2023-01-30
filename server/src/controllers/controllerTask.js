const {TaskModel} = require('../models/TaskModel');

exports.addTask = function (req, res) {
  console.log(req.body);
  if (req.body.text == undefined)
    return res.status(400).json({ error: "Missing arguments" });

  var newTask = new TaskModel();
  newTask.addTask(req.body.text);

  newTask.save((err_saved, saved) => {
    if (err_saved)
      return res.status(500).json(err_saved);
    else
      return res.status(200).json({
        id: saved._id,
        text: saved.text,
        status: saved.status
      });
  });
};

exports.getTasks = function (req, res) {
  TaskModel.find({}).exec((err_task, tasks) => {
    if (err_task)
      return res.status(500).json(err_task);
    else {
      return res.status(200).json({
        tasks
      });
    }
  });
}

exports.getTask = function (req, res) {
  if (req.params.id === undefined)
    return res.status(400).json({ error: 'Missing params' });

  TaskModel.findOne({ _id: req.params.id }).exec((err_task, task) => {
    if (err_task)
      return res.status(500).json(err_task);
    if (task === null)
      return res.status(409).json({ error: "Bad Task id" });
      console.log(task);

    return res.status(200).json({
      task
    });
  });
}

exports.updateTask = function (req, res) {
  console.log(req.params);
  if (req.params.id == undefined)
      return res.status(400).json({ error: "Missing params" });

  TaskModel.findOne({ _id: req.params.id }).exec((err_task, task) => {
    if (err_task)
      return res.status(500).json(err_task);
    if (task === null)
      return res.status(409).json({ error: "Bad Task id" });

    task.updateStatus(!task.status);
    task.save((err_saved, saved) => {
      if (err_saved)
        return res.status(500).json(err_saved);
      else
        return res.status(200).json({
          saved
        });
    });
  });
}

exports.deleteTask = function (req, res) {
  if (req.params.id === undefined)
    return res.status(400).json({ error: 'Missing params' });

  TaskModel.deleteOne({ _id: req.params.id }).exec((err_task, task) => {
    if (err_task)
      return res.status(500).json(err_user);
    if (task === null || task.deletedCount === 0)
      return res.status(409).json({ error: 'Bad Taks id' });
    console.log(task);
    return res.status(200).json({
      success: true
    });
  })
}