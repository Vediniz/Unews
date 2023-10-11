import User from '../models/User.model.js'
import jwt from 'jsonwebtoken'

const login_service = (email) => User.findOne({email: email}).select("+password")

const generate_token = (id) => jwt.sign({id: id}, process.env.SECRET_JWT, {expiresIn: 86400})

export {login_service,
        generate_token,        
}