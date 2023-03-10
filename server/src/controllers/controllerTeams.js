const {TeamModel} = require('../models/TeamModel');

exports.create = function (req, res) {
  if (req.body.name == undefined || req.body.manager == undefined || req.body.password == undefined)
    return res.status(400).json({ error: "Missing arguments" });
  
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.manager))
    return res.status(402).json({ error: "Bad email format" });

  var newTeam = new TeamModel();
  newTeam.createTeam(req.body.name, req.body.manager, req.body.password);

  newTeam.save((err, saved) => {
    if (err)
      return res.status(500).json(err);
    else
      return res.status(200).json({
        id: saved._id,
        name: saved.name,
        manager: saved.manager
      });
  });
};

exports.login = function (req, res) {
  if (req.query.email === undefined && req.query.password === undefined)
    return res.status(400).json({ error: 'Missing param' });

  TeamModel.find().exec((err, teams) => {
    var found = null;
    if (err)
      return res.status(500).json(err);
    if (teams === null)
      return res.status(409).json({ error: "No Teams" });
    teams.map(team => {
      if (team.users.filter(user => {return user === req.query.email}).length > 0) {
        if (team.password === req.query.password)
          found = team
      }
    });
    if (found)
      return res.status(200).json({
        id: found._id,
        description: found.description,
        manager: found.manager,
        name: found.name,
        repository: found.repository,
        users: found.users
      });
    else
      return res.status(400).json({
        error: 'Bad username or password'
      });
  });
}

exports.addUser = function (req, res) {
  if (req.params.id == undefined)
    return res.status(400).json({ error: "Missing param" });
  if (req.body.email === undefined)
    return res.status(400).json({ error: "Missing argument" });

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))
    return res.status(402).json({ error: "Bad email format" });

  TeamModel.findOne({ _id: req.params.id }).exec((err, team) => {
    if (err)
      return res.status(500).json(err);
    if (team === null)
      return res.status(409).json({ error: "Bad Team id" });

    if (team.users.includes(req.body.email))
      return res.status(409).json({ error: "User already exists" });

    team.addUser(req.body.email);
    team.save((err, saved) => {
      if (err)
        return res.status(500).json(err);
      else
        return res.status(200).json({
          id: saved._id,
          description: saved.description,
          manager: saved.manager,
          name: saved.name,
          repository: saved.repository,
          users: saved.users
        });
    });
  });
}

exports.removeUser = function (req, res) {
  if (req.params.id == undefined)
    return res.status(400).json({ error: "Missing param" });
  if (req.body.email === undefined)
    return res.status(400).json({ error: "Missing argument" });

  TeamModel.findOne({ _id: req.params.id }).exec((err, team) => {
    if (err)
      return res.status(500).json(err);
    if (team === null)
      return res.status(409).json({ error: "Bad Team id" });

    team.removeUser(req.body.email);
    team.save((err, saved) => {
      if (err)
        return res.status(500).json(err);
      else
        return res.status(200).json({
          id: saved._id,
          description: saved.description,
          manager: saved.manager,
          name: saved.name,
          repository: saved.repository,
          users: saved.users
        });
    });
  });
}

exports.getTeams = function (req, res) {
  TeamModel.find({}).exec((err, teams) => {
    if (err)
      return res.status(500).json(err);
    else {
      const result = teams.map((t) => {
        return ({
          id: t._id,
          description: t.description,
          manager: t.manager,
          name: t.name,
          repository: t.repository,
          users: t.users
        })
      });
      return res.status(200).json({
        teams: result
      });
    }
  });
}

exports.getTeamById = function (req, res) {
  if (req.params.id === undefined)
    return res.status(400).json({ error: 'Missing param' });

  TeamModel.findOne({ _id: req.params.id }).exec((err, team) => {
    if (err)
      return res.status(500).json(err);
    if (team === null)
      return res.status(409).json({ error: "Bad Team id" });
    return res.status(200).json({
      id: team._id,
      description: team.description,
      manager: team.manager,
      name: team.name,
      repository: team.repository,
      users: team.users
      });
  });
}

exports.updateName = function (req, res) {
  if (req.params.id == undefined)
    return res.status(400).json({ error: "Missing param" });
  if (req.body.name === undefined)
    return res.status(400).json({ error: "Missing argument" });

  TeamModel.findOne({ _id: req.params.id }).exec((err, team) => {
    console.log(team);
    if (err)
      return res.status(500).json(err);
    if (team === null)
      return res.status(409).json({ error: "Bad Team id" });

    team.updateName(req.body.name);
    team.save((err, saved) => {
      if (err)
        return res.status(500).json(err);
      else
        return res.status(200).json({
          id: saved._id,
          description: saved.description,
          manager: saved.manager,
          name: saved.name,
          repository: saved.repository,
          users: saved.users
        });
    });
  });
}

exports.updateManager = function (req, res) {
  if (req.params.id == undefined)
    return res.status(400).json({ error: "Missing param" });
  if (req.body.email === undefined)
    return res.status(400).json({ error: "Missing argument" });

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))
    return res.status(402).json({ error: "Bad email format" });

  TeamModel.findOne({ _id: req.params.id }).exec((err, team) => {
    if (err)
      return res.status(500).json(err);
    if (team === null)
      return res.status(409).json({ error: "Bad Team id" });

    if (!team.users.includes(req.body.email))
      return res.status(409).json({ error: "User not in team" });

    team.updateManager(req.body.email);
    team.save((err, saved) => {
      if (err)
        return res.status(500).json(err);
      else
        return res.status(200).json({
          id: saved._id,
          description: saved.description,
          manager: saved.manager,
          name: saved.name,
          repository: saved.repository,
          users: saved.users
        });
    });
  });
}

exports.updateRepository = function (req, res) {
  if (req.params.id == undefined)
    return res.status(400).json({ error: "Missing param" });
  if (req.body.repository === undefined)
    return res.status(400).json({ error: "Missing argument" });

  TeamModel.findOne({ _id: req.params.id }).exec((err, team) => {
    if (err)
      return res.status(500).json(err);
    if (team === null)
      return res.status(409).json({ error: "Bad Team id" });

    team.updateRepository(req.body.repository);
    team.save((err, saved) => {
      if (err)
        return res.status(500).json(err);
      else
        return res.status(200).json({
          id: saved._id,
          description: saved.description,
          manager: saved.manager,
          name: saved.name,
          repository: saved.repository,
          users: saved.users
        });
    });
  });
}

exports.delete = function (req, res) {
  if (req.params.id === undefined)
    return res.status(400).json({ error: 'Missing params' });

  TeamModel.deleteOne({ _id: req.params.id }).exec((err, team) => {
    if (err)
      return res.status(500).json(err);
    if (team === null || team.deletedCount === 0)
      return res.status(409).json({ error: 'Bad Team id' });
    return res.status(200).json({
      success: true
    });
  })
}

exports.updateDescription = function (req, res) {
  if (req.params.id == undefined)
    return res.status(400).json({ error: "Missing param" });
  if (req.body.description === undefined)
    return res.status(400).json({ error: "Missing argument" });

  TeamModel.findOne({ _id: req.params.id }).exec((err, team) => {
    if (err)
      return res.status(500).json(err);
    if (team === null)
      return res.status(409).json({ error: "Bad Team id" });

    team.updateDescription(req.body.description);
    team.save((err, saved) => {
      if (err)
        return res.status(500).json(err);
      else
        return res.status(200).json({
          id: saved._id,
          description: saved.description,
          manager: saved.manager,
          name: saved.name,
          repository: saved.repository,
          users: saved.users
        });
    });
  });
}

exports.setAdmin = function (req, res) {
  if (req.params.id == undefined)
    return res.status(400).json({ error: "Missing param" });

  TeamModel.findOne({ _id: req.params.id }).exec((err, team) => {
    if (err)
      return res.status(500).json(err);
    if (team === null)
      return res.status(409).json({ error: "Bad Team id" });

    team.setAdmin();
    team.save((err, saved) => {
      if (err)
        return res.status(500).json(err);
      else
        return res.status(200).json({
          id: saved._id,
          description: saved.description,
          manager: saved.manager,
          name: saved.name,
          repository: saved.repository,
          users: saved.users
        });
    });
  });
}

exports.isAdmin = function (req, res) {
  if (req.params.id == undefined)
    return res.status(400).json({ error: "Missing param" });

  TeamModel.findOne({ _id: req.params.id }).exec((err, team) => {
    if (err)
      return res.status(500).json(err);
    if (team === null)
      return res.status(409).json({ error: "Bad Team id" });

    return res.status(200).json({
      isAdmin: team.admin
    });
  });
}