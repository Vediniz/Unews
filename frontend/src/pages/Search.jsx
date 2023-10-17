import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { searchPosts } from "../services/postServices"
import Card from "../components/Card"
import NewsModal from "../components/NewsModal";


export default function Search() {
    const { title } = useParams()
    const [news, setNews] = useState([])
    const [selectedCard, setSelectedCard] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    async function search() {
        try {
            const newsApi = await searchPosts(title)
            setNews(newsApi.data.results)
        } catch (error) {
            setNews([])
        }
    }

    useEffect(() => {
        search()
    }, [title])

    const openModal = (card) => {
        setSelectedCard(card);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCard(null);
        setIsModalOpen(false);
    };

    const count = news.length

    return (
        <div className="home">
            {count > 0 ?
                <>
                    <h1>{count > 1 ? `${count} notícias encontradas` : `${count} notícia encontrada`}</h1>
                    <div className="body">
                        {news.map((post) => (
                            <Card
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                text={post.text.join(' ')}
                                banner={post.image}
                                onClick={() => openModal(post)}
                            />
                        ))}
                    </div>
                </>
                : <span className="span-search">{count} resultados encontrados</span>
            }

            <NewsModal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={selectedCard ? selectedCard.title : ''}
                banner={selectedCard ? selectedCard.image : ''}
                text={selectedCard ? selectedCard.text : ''}
            />
        </div>
    )
}