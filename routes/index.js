const express = require('express');
const router = express.Router();
const todos = require('../models/express-models/todos');

// write your routes here. Feel free to split into multiple files if you like.

// GET /users
router.get('/', (req, res, next) => {
    res.status(200).send(todos.listPeople());
});

// GET /users/:name/tasks
router.get('/:name/tasks', (req, res) => {
    const name = req.params.name;
    const search = todos.list(name);
    if( !todos.listPeople().includes(name) ) {
        res.status(404).send('Name does not exist.');
    }

    if(req.query.status === 'complete') {
        const complete = search.filter(task => task.complete === true);
        res.status(200).send(complete);
    } else if (req.query.status === 'active'){
        const active = search.filter(task => task.complete !== true);
        res.status(200).send(active);
    }

    res.status(200).send(search);
});

// POST /users/:name/tasks
router.post('/:name/tasks', (req, res) => {
    if(req.body.content.length < 1) {
        res.status(400).send('Task has no content.')
    } else {
        const name =  req.params.name;
        todos.add(name, req.body);
        res.status(201);
        res.send(req.body);
    }
});

// PUT /users/:name/:index
router.put('/:name/tasks/:index', (req, res) => {
    const name = req.params.name;
    const index = req.params.index;
    todos.complete(name, index);
    res.status(200).send(todos.list(name));
});

// DELETE /users/:name/tasks/:index
router.delete('/:name/tasks/:index', (req, res) => {
    const name = req.params.name;
    const index = req.params.index;
    todos.remove(name, index);
    res.status(204).send(todos.list(name));
});

module.exports = router;