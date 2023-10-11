import User from "../models/User.model.js"

const create_service = (body) => User.create(body)

const find_all_service = () => User.find()
const find_by_id_service = (id) => User.findById(id)

const update_service = (id, updatedData, options) => User.findOneAndUpdate({ _id: id }, updatedData, options)

const find_email_service = (email) => User.findOne(email)
export default {
    create_service,
    find_all_service,
    find_by_id_service,
    update_service,
    find_email_service
}
