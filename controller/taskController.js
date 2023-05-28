const Task = require("../models/task");

//to fetch multiple documents
const getTasks = async (req, res) => {
  try {
    let tasks = await Task.find().lean();

    // console.log(tasks);
    res.status(200).render("home", {
      tasks,
    });
  } catch (error) {
    res.status(404).json({
      message: "No Task added",
    });
  }
};

//to fetch single document
const getTask = async (req, res) => {
  try {
    let id = req.params.id;
    const task = await Task.findOne({
      _id: id,
    }).lean();
    res.status(200).render("update", {
      task,
    });
  } catch (error) {
    console.log(error);
  }
};

const postTask = async (req, res) => {
  try {
    let task = req.body.task
    let duplicate = await Task.findOne({
      task: task
    }).lean()
    // console.log(req.body);
    if (duplicate) {
      res.json({
        message: "task is already present"
      })
    } else {
      await Task.create({
        task: task,
      });
      res.redirect("/task-manager/task");
    }


  } catch (error) {
    console.log(error);
  }
};

//to update the task
const updateTask = async (req, res) => {
  try {
    let id = req.params.id;
    let updateTask = req.body.task;
    await Task.updateOne({
      _id: id,
    }, {
      $set: {
        task: updateTask,
      },
    });
    res.status(302).redirect("/task-manager/task");
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    let id = req.params.id;
    await Task.findOneAndDelete({
      _id: id,
    });
    res.status(302).redirect("/task-manager/task");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getTasks,
  postTask,
  getTask,
  updateTask,
  deleteTask,
};