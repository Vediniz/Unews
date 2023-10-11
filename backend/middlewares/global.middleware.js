import mongoose from 'mongoose'
import userService from '../services/user.service.js'

export const valid_id = (req, res, next) => {
    try {
        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid id' })
        }
        next()
    } catch (err) { res.status(500).json({ message: err.message }) }
}

export const valid_user = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await userService.find_by_id_service(id)

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        req.id = id
        req.user = user
        next()
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const errorHandler = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: 'Something went wrong' })
}
// export default {
//     valid_id,
//     valid_user,
//     find_recovery_question,''
// }