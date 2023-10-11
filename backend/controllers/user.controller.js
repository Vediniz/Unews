import userService from '../services/user.service.js'
import { generate_token } from '../services/auth.service.js'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const create = async (req, res) => {
    try {
        const { name, username, email, password, recoveryQuestion } = req.body

        if (!name || !username || !email || !password || !recoveryQuestion) {
            return res.status(400).json({ message: 'Submit all fields for registration' })
        }

        const user = await userService.create_service(req.body)

        if (!user) {
            return res.status(404).json({ message: 'Error creating user' })
        }

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user._id,
                name,
                username,
                email,
            },
        })
    } catch (err) {
        handle_error(res, err)
    }
}


const find_all = async (req, res) => {
    try {
        const users = await userService.find_all_service()
        if (users.length === 0) {
            return res.status(400).json({ message: 'There are no registered users' })
        }
        res.json(users)
    } catch (err) {
        handle_error(res, err)
    }
}

const find_by_id = async (req, res) => {
    try {
        const user = req.user
        res.json(user)
    } catch (err) {
        handle_error(res, err)
    }
}

const update = async (req, res) => {
    try {
        const { name, username, email, password, avatar } = req.body
        const { id, user } = req

        if (!name && !username && !email && !password && !avatar) {
            return res.status(400).json({ message: 'Submit at least one field for update' })
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10)
            await userService.update_service(id, { name, username, email, password: hashedPassword, avatar }, { new: true, runValidators: true })
        } else {
            await userService.update_service(id, { name, username, email, avatar }, { new: true, runValidators: true })
        }

        res.json({ message: 'User successfully updated' })
    } catch (err) {
        handle_error(res, err)
    }
}


const handle_error = (res, err) => {
    console.error(err.stack)
    res.status(500).json({ message: 'Something went wrong' })
}

const find_by_token = async (req, res, token) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET_JWT)

        if (!decoded || !decoded.id) {
            throw new Error('Token inválido')
        }

        const user = await userService.find_by_id_service(decoded.id)

        if (!user || !user.id) {
            throw new Error('Usuário não encontrado')
        }

        res.json(user)
    } catch (error) {
        res.status(401).json({ message: 'Token inválido: ' + error.message })
    }
}
const find_recovery_question = async (req, res) => {
    try {
        const { email } = req.body 
        const user = await userService.find_email_service({email})

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const recoveryQuestion = user.recoveryQuestion.question
        res.status(200).json({ question: recoveryQuestion })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' })
    }
}

const validate_answer = async (req, res) => {
    try {
        const { email, answer } = req.body
        console.log("Email:", email)
        console.log("Answer:", answer)

        const user = await userService.find_email_service({ email })
        console.log("User found:", user)

        if (!user) {
            console.log("User not found")
            return res.status(404).json({ message: 'User not found' })
        }
        // aqui eu preciso enviar a question pro frontend, tem como?
        const recoveryQuestion = user.recoveryQuestion
        console.log("Recovery Question:", recoveryQuestion)

        if (!recoveryQuestion || recoveryQuestion.answer !== answer) {
            console.log("Invalid answer")
            return res.status(400).json({ message: 'Invalid answer' })
        }

        console.log("Answer is valid")
        const token = generate_token(user.id)
        res.status(200).json({ token: token })
    } catch (err) {
        console.error("Internal server error:", err)
        res.status(500).json({ message: 'Internal server error' })
    }
}





export default {
    create,
    find_all,
    find_by_id,
    update,
    find_by_token,
    validate_answer,
    find_recovery_question
}
