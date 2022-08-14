const db = require('./database');
const Sequelize = require('sequelize');
const helper = require('../../helper');

// Make sure you have `postgres` running!

//---------VVVV---------  your code below  ---------VVV----------

const Task = db.define('Task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  due: Sequelize.DATE,
});

const Owner = db.define('Owner', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Task.belongsTo(Owner);
Owner.hasMany(Task);


Task.clearCompleted = async () => {
  await Task.destroy({
    where: {
      complete: true
    }
  });
};

Task.completeAll = async () => {
  await Task.update(
    {
      complete: true
    },
    {
      where: {
        complete: false
      },
    }
  );
};

Task.prototype.getTimeRemaining = function() {
  if(this.due === undefined) {
    return Infinity;
  } else {
    const start = Date.now();
    return this.due - start;
  }
};

Task.prototype.isOverdue = function() {
  if(this.getTimeRemaining() < 0 && this.complete !== true) {
    return true;
  } else {
    return false;
  }
};

Task.prototype.assignOwner = async function(owner) {
  return await this.setOwner(owner);
};

Owner.getOwnersAndTasks = async function() {
  return await this.findAll({ include: Task });
};

Owner.prototype.getIncompleteTasks = async function() {
  return await Task.findAll({ include: Owner, where: { complete: false} })
}

//---------^^^---------  your code above  ---------^^^----------

module.exports = {
  Task,
  Owner,
};
