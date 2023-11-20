import User from "../models/User.model.js"

// const create_service = (body) => User.create(body)

// const find_all_service = () => User.find()
const find_by_id_service = (id) => User.findById(id)

const update_service = (id, updatedData, options) => User.findOneAndUpdate({ _id: id }, updatedData, options)

const find_email_service = (email) => User.findOne(email)

const update_question_answer_service = (id, new_question, new_answer) => {
    return User.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                'recoveryQuestion.question': new_question,
                'recoveryQuestion.answer': new_answer
            }
        },
        { new: true } 
    )
}
const update_question_service = (id, new_question) => {
    return User.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                'recoveryQuestion.question': new_question
            }
        },
        { new: true }
    )
}

const update_answer_service = (id, new_answer) => {
    return User.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                'recoveryQuestion.answer': new_answer
            }
        },
        { new: true }
    )
}


export default {
    // create_service,
    // find_all_service,
    find_by_id_service,
    update_service,
    find_email_service,
    update_question_answer_service,
    update_answer_service,
    update_question_service
}
