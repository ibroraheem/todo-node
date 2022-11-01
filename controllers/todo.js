const Todo = require('../models/todo')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const createTodo = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const { title, description, time } = req.body
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        if (!user) return res.status(401).send({ message: "Unauthorized" })
        const newTodo = new Todo({
            title: title,
            description: description,
            time: time,
            createdBy: user._id
        })
        await newTodo.save()
        res.status(201).json({ msg: 'Todo created successfully', data: newTodo })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

const getTodos = async (req, res) => {
    try {
        const token = req.params.token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        if (!user) return res.status(401).send({ message: "Unauthorized" })
        const todos = await Todo.find({ createdBy: user._id })
        res.status(200).json(todos)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

const getTodo = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const { id } = req.params.id
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        if (!user) return res.status(401).send({ message: "Unauthorized" })
        const todo = await Todo.findById(id)
        if (!todo) return res.status(404).json({ msg: 'Todo not found' })
        res.status(200).json(todo)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

const updateTodo = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const { id } = req.params.id
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        if (!user) return res.status(401).send({ message: "Unauthorized" })
        const todo = await Todo.findById(id)
        if (!todo) return res.status(404).json({ msg: 'Todo not found' })
        const { title, description, time } = req.body
        if (title) todo.title = title
        if (description) todo.description = description
        if (time) todo.time = time
        await todo.save()
        res.status(200).json({ msg: 'Todo updated successfully', data: todo })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

const deleteTodo = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const { id } = req.params.id
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        if (!user) return res.status(401).send({ message: "Unauthorized" })
        const todo = await Todo.findById(id)
        if (!todo) return res.status(404).json({ msg: 'Todo not found' })
        await todo.remove()
        res.status(200).json({ msg: 'Todo deleted successfully' })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

const done = async(req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const { id } = req.params.id
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        if (!user) return res.status(401).send({ message: "Unauthorized" })
        const todo = await Todo.findById(id)
        if (!todo) return res.status(404).json({ msg: 'Todo not found' })
        todo.done = true
        await Todo.save()
        res.status(200).json({ msg: 'Todo done successfully' })
    } catch (error) {
      res.status(500).json({ msg: error.message })
    }
}

module.exports = {createTodo, getTodos, getTodo, updateTodo, deleteTodo, done}