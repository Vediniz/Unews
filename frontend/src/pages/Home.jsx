import React, { useEffect, useState } from "react";
import Card from '../components/Card';
import NewsModal from "../components/NewsModal";
import { getAllPosts } from "../services/postServices";
import { useNavigate } from "react-router-dom";

export default function Body() {

    const [news, setNews] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    async function findAllPosts() {
        try {
            const response = await getAllPosts();
            setNews(response.data.results)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        findAllPosts();
    }, [])


    const openModal = (card) => {
        setSelectedCard(card);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCard(null);
        setIsModalOpen(false);
    };

    return (
        <div className="home">
            <h1>Notícias</h1>
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