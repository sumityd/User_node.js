const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new express.Router();

router.patch("/tasks/:id", async (req, res) => {
  const taskUpdate = Object.keys(req.body);
  const taskKeys = ["completed", "description"];
  const checkTaskValidition = taskUpdate.every(taskUpdate => taskKeys.includes(taskUpdate));
  if (!checkTaskValidition) {
    res.status(400).send({ error: "this is invalid input" });
  }
  try {
    // const task = await Task.findById(req.params.id);
    const task = await Task.find({ _id: req.params.id, user: req.user._id });

    console.log(task);
    if (!task) {
      res.status(400).send();
      return;
    }
    taskUpdate.forEach(updates => (task[updates] = req.body[updates]));

    await task.save();
    res.status(200).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// task find without any authorisation
router.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;
  Task.findById(_id)
    .then(task => {
      if (!task) {
        res.status(401).send();
      }

      res.status(201).send(task);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// task api with authorisation user
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, user: req.user._id });
    if (!task) {
      res.status(401).send();
    }

    res.status(201).send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    user: req.user._id
  });

  try {
    await task.save();
    res.status(200).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// all task get by the user
// router.get("/tasks", async (req, res) => {
//   const match = {}
//   if(req.query.completed){
//     match.completed = req.query.completed === 'true'
//   }

//   try {
//     const task = await Task.find({match});
//     res.status(201).send(task);
//   } catch (e) {
//     res.status(401).send(e);
//   }
// });

// in this only those task getted by user specific only
router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const part = req.query.sortBy.split(":");
    sort[part[0]] = part[1] === "desc" ? -1 : 1;
  }

  try {
    await req.user.populate({ path: "tasks", match, options: { limit: parseInt(req.query.limit), skip: parseInt(req.query.skip), sort } }).execPopulate();

    res.status(201).send(req.user.tasks);
  } catch (e) {
    res.status(401).send(e);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    if (!deleteTask) {
      res.status(400).send({ error: "delete task not find" });
      return;
    }
    res.status(201).send(deleteTask);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
