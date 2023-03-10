const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    manager: {
        type: String,
        required: true,
        unique: true
    },
    users: {
        type: [String],
        required: true
    },
    repository: {
        type: String,
        required: false
    },
    admin: {
        type: Boolean,
        required: true
    }
});

teamSchema.methods.createTeam = function (name, manager, password) {
    this.name = name;
    this.manager = manager;
    this.password = password;
    this.users.push(manager);
    this.admin = false;
    this.repository = "";
    this.description = "";
}

teamSchema.methods.updateName = function (name) {
    this.name = name;
};

teamSchema.methods.updateManager = function (manager) {
    this.manager = manager;
};

teamSchema.methods.addUser = function (email) {
    this.users.push(email);
};

teamSchema.methods.removeUser = function (email) {
    if (this.users.includes(email))
        this.users.splice(this.users.indexOf(email), 1);
};

teamSchema.methods.updateRepository = function(repository) {
    this.repository = repository;
};

teamSchema.methods.updateDescription = function(description) {
    this.description = description;
};

teamSchema.methods.setAdmin = function() {
    this.admin = !this.admin;
};

const TeamModel = mongoose.model(
    "teams",
    teamSchema
);

module.exports = { TeamModel };