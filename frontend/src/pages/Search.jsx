import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { searchPosts } from "../services/postServices"
import Card from "../components/Card"

export default function Search() {
    const { title } = useParams()
    const [news, setNews] = useState([])

    async function search() {
        try {
            const newsApi = await searchPosts(title)
            setNews(newsApi.data.results)
            console.log(news);
        } catch (error) {
            console.log(error);
            setNews([])
        }
    }

    useEffect(() => {
        search()
    }, [title])

    return (
        <div className="container-search">
            {news.length > 0 ?
                <div className="search-news">
                    {news.map((post) => (
                        <Card
                            key={post.id}
                            title={post.title}
                            text={post.text}
                            banner={post.banner}
                        />
                    ))}
                </div>
                : <span>0 resultados encontrados</span>
            }
        </div>
    )
}