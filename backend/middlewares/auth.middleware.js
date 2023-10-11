import dotenv from 'dotenv'
import userService from '../services/user.service.js'
import jwt from 'jsonwebtoken'

dotenv.config()

export const authMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers

        if (!authorization) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const [schema, token] = authorization.split(" ")

        if (schema !== "Bearer" || !token) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_JWT)

            if (!decoded || !decoded.id) {
                return res.status(401).json({ message: "Invalid Token" })
            }

            const user = await userService.find_by_id_service(decoded.id)

            if (!user || !user.id) {
                return res.status(401).json({ message: "Invalid Token" })
            }

            req.userId = user._id
            // console.log("req.userId:", req.userId)

            next()
        } catch (error) {
            return res.status(401).json({ message: "Token invalid" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
