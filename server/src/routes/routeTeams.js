const express = require('express');
const router = express.Router();
const controllerTeams= require('../controllers/controllerTeams');

router.post('/create', controllerTeams.create); 
router.get('/login', controllerTeams.login);

router.post('/addUser/:id', controllerTeams.addUser);
router.delete('/removeUser/:id', controllerTeams.removeUser);

router.get('/get', controllerTeams.getTeams);
router.get('/get/:id', controllerTeams.getTeamById);

router.put('/updateName/:id', controllerTeams.updateName);

router.put('/updateManager/:id', controllerTeams.updateManager); 

router.put('/updateRepository/:id', controllerTeams.updateRepository);

router.put('/setAdmin/:id', controllerTeams.setAdmin);
router.get('/isAdmin/:id', controllerTeams.isAdmin);

router.delete('/delete/:id', controllerTeams.delete);

router.put('/updateDescription/:id', controllerTeams.updateDescription);


module.exports = router