const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username })
        if (user) return res.status(400).json({ msg: 'User already exists' })
        const newUser = new User({
            username: username,
            password: password
        })
        await newUser.save()
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET)
        res.status(200).json({user: newUser.username, token: token})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username })
        if (!user) return res.status(400).json({ msg: 'User does not exist' })
        if (password !== user.password) return res.status(401).json({ msg: 'Incorrect password' })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username
            }
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

module.exports = {register, login}