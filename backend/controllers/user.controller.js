import userService from '../services/user.service.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';


const create = async (req, res) => {
    try {
        const { name, username, email, password, avatar } = req.body;

        if (!name || !username || !email || !password || !avatar) {
            return res.status(400).json({ message: 'Submit all fields for registration' });
        }

        const user = await userService.create_service(req.body);

        if (!user) {
            return res.status(404).json({ message: 'Error creating user' });
        }

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user._id,
                name,
                username,
                email,
                avatar,
            },
        });
    } catch (err) {
        handle_error(res, err);
    }
};

const find_all = async (req, res) => {
    try {
        const users = await userService.find_all_service();
        if (users.length === 0) {
            return res.status(400).json({ message: 'There are no registered users' });
        }
        res.json(users);
    } catch (err) {
        handle_error(res, err);
    }
};

const find_by_id = async (req, res) => {
    try {
        const user = req.user;
        res.json(user);
    } catch (err) {
        handle_error(res, err);
    }
};

const update = async (req, res) => {
    try {
        const { name, username, email, password, avatar } = req.body;
        const { id, user } = req;

        if (!name && !username && !email && !password && !avatar) {
            return res.status(400).json({ message: 'Submit at least one field for update' });
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await userService.update_service(id, name, username, email, hashedPassword, avatar);
        } else {
            await userService.update_service(id, name, username, email, password, avatar);
        }

        res.json({ message: 'User successfully updated' });
    } catch (err) {
        handle_error(res, err);
    }
};

const handle_error = (res, err) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong' });
};

const find_by_token = async (req, res, token) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_JWT);

        if (!decoded || !decoded.id) {
            throw new Error('Token inválido');
        }

        const user = await userService.find_by_id_service(decoded.id);

        if (!user || !user.id) {
            throw new Error('Usuário não encontrado');
        }

        res.json(user);
    } catch (error) {
        res.status(401).json({ message: 'Token inválido: ' + error.message });
    }
};


export default {
    create,
    find_all,
    find_by_id,
    update,
    find_by_token,
};
