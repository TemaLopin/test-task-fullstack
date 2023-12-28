const Router = require('express')
const router = new Router()

const tasksController = require('../controllers/tasks.controller')

router.get('/tasks', tasksController.getTasks)
router.get('/tasks/:id', tasksController.getOneTask)
router.get('/find-tasks/:title', tasksController.findTasks)

router.post('/tasks', tasksController.createTask)

router.put('/tasks', tasksController.updateTask)

router.delete('/tasks/:id', tasksController.deleteTask)

module.exports = router
