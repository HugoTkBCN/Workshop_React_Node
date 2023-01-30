const express = require('express');
const router = express.Router();
const controllerTask= require('../controllers/controllerTask');

router.post('/addTask', controllerTask.addTask);
router.get('/getTasks', controllerTask.getTasks);
router.get('/getTask/:id', controllerTask.getTask);
router.put('/updateTask/:id', controllerTask.updateTask);
router.delete('/deleteTask/:id', controllerTask.deleteTask);

module.exports = router