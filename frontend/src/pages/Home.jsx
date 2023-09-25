import React, { useEffect, useState } from "react";
import Card from '../components/Card';
import NewsModal from "../components/modals/NewsModal";
import { getAllPosts } from "../services/postServices";

export default function Body() {

    const [news, setNews] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    async function findAllPosts() {
        const response = await getAllPosts();
        setNews(response.data.results)
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
        <div className="body">
            {news.map((post) => (
                <Card
                    key={post.id}
                    title={post.title}
                    text={post.text}
                    banner={post.image}
                    onClick={() => openModal(post)}
                />
            ))}

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