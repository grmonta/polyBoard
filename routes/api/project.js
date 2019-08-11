const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Project = require('../../models/Project');

//@route    POST api/project
//@desc     Create an new project
//@access   Private

router.post(
  '/',
  [
    auth,
    [
      check('createdBy', 'Created By is required')
        .not()
        .isEmpty(),
      check('projectTitle', 'Project title is required')
        .not()
        .isEmpty(),
      check('objective', 'Objective is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    //validate object
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newProject = new Project({
        name: user.name,
        user: req.user.id,
        createdBy: req.body.createdBy,
        projectTitle: req.body.projectTitle,
        createdDate: req.body.createdDate,
        dueDate: req.body.dueDate,
        objective: req.body.objective,
        description: req.body.description,
        status: req.body.status,
        category: req.body.category
      });

      const project = await newProject.save();

      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Errors');
    }
  }
);

//@route    GET api/projects
//@desc     Get all projects
//@access   Private

router.get('/', auth, async (req, res) => {
  try {
    const projectItems = await Project.find().sort({ date: -1 });
    res.json(projectItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@route    GET api/project/:id
//@desc     Get single project item by ID
//@access   Private

router.get('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'project not found' });
    }
    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'project   not found' });
    }

    res.status(500).send('server error');
  }
});

//@route    Delete api/project
//@desc     Delete a project
//@access   Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    await project.remove();
    res.json({ msg: 'project removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'project   not found' });
    }

    res.status(500).send('server error');
  }
});

//@route    POST api/stock/task/:id
//@desc     Adding a task to Project
//@access   Private

router.post('/task/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    const project = await Project.findById(req.params.id);

    const newTask = {
      name: user.name,
      user: req.user.id,
      taskTitle: req.body.taskTitle,
      assignedBy: req.body.assignedBy,
      assignedTo: req.body.assignedTo,
      iat: req.body.iat,
      due: req.body.due,
      status: req.body.status,

      description: req.body.description
    };

    project.task.unshift(newTask);

    await project.save();

    res.json(project.task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/project/task/:id/:note_id
// @desc     Delete task
// @access   Private

router.delete('/task/:id/:task_id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    //pull out tasks
    const task = project.task.find(task => task.id === req.params.task_id);

    if (!task) {
      return res.status(404).json({ msg: 'task does not exist' });
    }

    const removeIndex = project.task
      .map(task => task.id)
      .indexOf(req.params.task_id);

    project.task.splice(removeIndex, 1);

    await project.save();
    res.json(project.task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
