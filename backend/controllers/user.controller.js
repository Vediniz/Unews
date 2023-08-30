import userService from '../services/user.service.js';

const create = async (req, res) => {
    try {
        const { name, username, email, password, avatar } = req.body;

        if (!name || !username || !email || !password || !avatar ) {
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

        if (!name && !username && !email && !password && !avatar ) {
            return res.status(400).json({ message: 'Submit at least one field for update' });
        }

        await userService.update_service(id, name, username, email, password, avatar);

        res.json({ message: 'User successfully updated' });
    } catch (err) {
        handle_error(res, err);
    }
};

const handle_error = (res, err) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong' });
};

export default {
    create,
    find_all,
    find_by_id,
    update,
};
