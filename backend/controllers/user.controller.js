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
        const { id } = req.params
        const user = await userService.find_by_id_service(id)

        if (!user || !user._id) {
            throw new Error('Usuário não encontrado')
        }

        const { new_question, new_answer, name, username, email, password } = req.body

        if (!name && !username && !email && !password && !new_question && !new_answer) {
            return res.status(400).json({ message: 'Submit at least one field for update' })
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10)
            await userService.update_service(id, { name, username, email, password: hashedPassword }, { new: true, runValidators: true })
        } else {
            await userService.update_service(id, { name, username, email }, { new: true, runValidators: true })
        }

        if (new_question && new_answer) {
            const hashedAnswer = await bcrypt.hash(new_answer, 10)
            const updatedUser = await userService.update_question_answer_service(id, new_question, hashedAnswer)

            if (updatedUser) {
                res.status(200).json({ message: 'User and recovery question/answer updated successfully' })
            } else {
                throw new Error('Failed to update user and recovery question/answer')
            }
        } else if (new_question) {
            const updatedUser = await userService.update_question_answer_service(id, new_question)

            if (updatedUser) {
                res.status(200).json({ message: 'User and recovery question updated successfully' })
            } else {
                throw new Error('Failed to update recovery question')
            }
        } else if (new_answer) {
            const hashedAnswer = await bcrypt.hash(new_answer, 10)
            const updatedUser = await userService.update_question_answer_service(id, hashedAnswer)

            if (updatedUser) {
                res.status(200).json({ message: 'User and recovery answer updated successfully' })
            } else {
                throw new Error('Failed to update recovery answer')
            }
        } else {
            res.status(200).json({ message: 'User information updated successfully' })
        }
    } catch (err) {
        handle_error(res, err)
    }
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
    } catch (err) {
        handle_error(res, err)
    }
}

const validate_answer = async (req, res) => {
        try {
            const { email, answer } = req.body
    
            const user = await userService.find_email_service({email})
    
            if (!user) {
                console.log("User not found")
                return res.status(404).json({ message: 'User not found' })
            }
            const recovery_question = user.recoveryQuestion
    
            if (!recovery_question) {
                return res.status(400).json({ message: 'Recovery question not set for this user' })
            }
    
            const hashedAnswer = recovery_question.answer
    
            const isMatch = await bcrypt.compare(answer, hashedAnswer)
    
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid answer' })
            }
    
            console.log("Answer is valid")
            const token = generate_token(user.id)
            res.status(200).json({ token: token })
        } catch (err) {
            handle_error(res, err)
        }
}

const handle_error = (res, err) => {
    console.error(err.stack)
    res.status(500).json({ message: 'Something went wrong' })
}
export default {
    create,
    find_all,
    find_by_id,
    update,
    find_by_token,
    validate_answer,
    find_recovery_question,
}
