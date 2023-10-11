import bcrypt from 'bcrypt'
import { login_service, generate_token } from '../services/auth.service.js'

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await login_service(email)
        
        if (!user) {
            return res.status(404).json({ message: 'User or password not found' })
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password)

        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Invalid password' })
        }

        const token = generate_token(user.id)

        res.json({ token: token })
    } catch (err) {
        handle_error(res, err)
    }
}

const handle_error = (res, err) => {
    console.error(err.stack)
    res.status(500).json({ message: 'An error occurred' })
}

export { login }
