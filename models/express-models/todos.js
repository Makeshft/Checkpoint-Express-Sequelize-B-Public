let tasks = {};

/*
  tasks (defined above) will be a place to store tasks by person;
  example:
  {
    person1: [{task object 1}, {task object 2}, etc.],
    person2: [{task object 1}, {task object 2}, etc.],
    etc.
  }
*/

module.exports = {
  reset: function () {
    tasks = {}; // (this function is completed for you.)
  },

  // ==== COMPLETE THE FOLLOWING (SEE `model.js` TEST SPEC) =====
  listPeople: function () {
    // returns an array of all people for whom tasks exist
    return Object.keys(tasks);
  },

  add: function (name, task) {
    // saves a task for a given person
    if(task.complete === undefined) {
      task.complete = false;
    }

    if(!Object.hasOwn(tasks, name)) {
      // console.log(task);
      tasks[name] = [{...task}];
      // console.log(tasks[name])
    } else {
      tasks[name].push({...task});
    }
  },

  list: function (name) {
    // returns tasks for specified person
    return tasks[name];
  },

  complete: function (name, idx) {
    tasks[name][idx].complete = true;
  },

  remove: function (name, idx) {
    tasks[name].splice(idx, 1)
  },
};
