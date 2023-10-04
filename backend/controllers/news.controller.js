import { create_service, find_all_service, get_news_count_service, top_news_service, find_by_id_service, search_title_service, update_service, erase_service, filter_news_service} from '../services/news.service.js'

const create = async (req, res) => {
    try {
        const { title, text, image, filters } = req.body;

        if (!title || !text || !image) {
            res.status(400).json({ message: "Submit all fields for registration" });
            return; 
        }
        const paragraphs = text.split('\n');        

        const news = await create_service({
            title,
            text: paragraphs,
            image,
            user: req.userId,
            filters: Array.isArray(filters) ? filters : [filters], 
        });

        res.status(201).json({ message: "Created", news });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const find_all = async (req, res) => {
    try {
        let { limit, offset } = req.query
        limit = Number(limit)
        offset = Number(offset)

        if (!limit) {
            limit = 6
        }
        if (!offset) {
            offset = 0
        }

        const news = await find_all_service(offset, limit)
        const total = await get_news_count_service()
        const currentUrl = req.baseUrl

        const next = offset + limit
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null

        const previous = offset - limit < 0 ? null : offset - limit
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null


        if (news.length === 0) {
            return res.status(400).json({ message: "There are no news", })
        }
        res.json({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
            results: news.map(newsItem => ({
                id: newsItem._id,
                title: newsItem.title,
                text: newsItem.text,
                image: newsItem.image,
                name: newsItem.user.name,
                username: newsItem.user.username,
                userAvatar: newsItem.user.avatar,
            }))
        })
    } catch (err) { res.status(500).json({ message: err.message }) }

}

const latest_news = async (req, res) => {
    try {
        const news = await top_news_service();
        if (!news) {
            return res.status(400).json({ message: "There is no registeted post" })
        }
        res.json({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                image: news.image,
                name: news.user.name,
                username: news.user.username,
                userAvatar: news.user.avatar,
            }
        })
    } catch (err) { res.status(500).json({ message: err.message }) }

}

const find_by_id = async (req, res) => {
    try {
        const { id } = req.params
        const news = await find_by_id_service(id)
        return res.json({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                image: news.image,
                name: news.user.name,
                username: news.user.username,
                userAvatar: news.user.avatar,
            }
        })
    } catch (err) { res.status(500).json({ message: err.message }) }
}


const search_news_title = async (req, res) => {
    try {
        const { title } = req.query
        const news = await search_title_service(title)

        if (news.length === 0) {
            return res.status(400).json({ message: 'There are no posts with this title' })
        }
        return res.json({
            results: news.map(newsItem => ({
                id: newsItem._id,
                title: newsItem.title,
                text: newsItem.text,
                image: newsItem.image,
                name: newsItem.user.name,
                username: newsItem.user.username,
                userAvatar: newsItem.user.avatar,
            }))
        })
    } catch (err) { res.status(500).json({ message: err.message }) }
}


const update = async (req, res) => {
    try {
        const { title, text, image, filters } = req.body;
        const { id } = req.params;

        if (!title && !text && !image && !filters) {
            res.status(400).json({ message: "Submit at least one field to update the post" });
            return;
        }

        const news = await find_by_id_service(id);

        const reqUserIdString = req.userId.toString();

        if (String(news.user._id) !== reqUserIdString) {
            console.log("Condition is true");
            return res.status(400).json({ message: "You didn't update this post" });
        }

        const currentText = news.text || [];

        let updatedText = currentText;
        if (text) {
            const paragraphs = text.split('\n');
            updatedText = [...paragraphs];
        }

        await update_service(id, title, updatedText, image, filters);

        return res.json({ message: "Post successfully updated" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



const erase = async (req, res) => {
    try {
        const { id } = req.params

        const news = await find_by_id_service(id)

        const reqUserIdString = req.userId.toString()

        if (String(news.user._id) !== reqUserIdString) {
            console.log("Condition is true");
            return res.status(400).json({ message: "You cant delete this post" })
        }

        await erase_service(id)
        return res.json({ message: "Post successfully erased" })

    } catch (err) {
        console.error("Error in erase:", err)
        res.status(500).json({ message: err.message })
    }
}


const find_by_filter = async (req, res) => {
    try {
        const { filters } = req.query;

        if (!filters || typeof filters !== 'string') {
            return res.status(400).json({ message: "Invalid filters provided" });
        }

        const filtersArray = filters.split(',');

        const news = await filter_news_service(filtersArray);

        res.json(news);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

export {
    create,
    find_all,
    latest_news,
    find_by_id,
    search_news_title,
    update,
    erase,
    find_by_filter,
}