const express = require('express')
const router = express.Router()

const { createTodo, updateTodo, deleteTodo, getTodo, getTodos, done } = require('../controllers/todo')

router.post('/', createTodo)
router.patch('/:id', updateTodo)
router.delete('/:id', deleteTodo)
router.patch('/:id', done)
router.get('/:id', getTodo)
router.get('/', getTodos)

module.exports = router
