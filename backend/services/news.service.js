import News from "../models/News.model.js"

const create_service = (body) => News.create(body)

const find_all_service = (offset, limit) => News.find().sort({_id: -1}).skip(offset).limit(limit).populate("user")

const get_news_count_service = () => News.countDocuments()

const top_news_service = () => News.findOne().sort({_id: -1}).populate("user")

const find_by_id_service = (id) => News.findById(id).populate("user")

const search_title_service = (title) => News.find({
    title: {$regex: `${title || ""}`, $options: "i"},
}).sort({_id: -1}).populate("user")


const update_service = (id, title, text, image) => News.findOneAndUpdate({_id: id}, {title, text, image}, {includeResultMetadata: true})

const erase_service = (id) => News.findOneAndDelete({_id: id})


export  {create_service, find_all_service, get_news_count_service, top_news_service, find_by_id_service, search_title_service, update_service, erase_service}