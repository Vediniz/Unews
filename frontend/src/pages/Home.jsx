import React, { useEffect, useState } from "react";
import Card from '../components/Card';
import NewsModal from "../components/NewsModal";
import { getAllPosts } from "../services/postServices";

export default function Body() {
    const [news, setNews] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [offset, setOffset] = useState(0);
    const [response, setResponse] = useState(null);

    async function findAllPosts(limit, offset) {
        try {
            const response = await getAllPosts(limit, offset);
            setResponse(response);
            setNews(response.results);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        findAllPosts(6, offset); 
    }, [offset]);  

    const openModal = (card) => {
        setSelectedCard(card);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCard(null);
        setIsModalOpen(false);
    };

    const handleNextPage = () => {
        if (response && response.nextUrl) {
            const nextUrl = response.nextUrl;
            const params = new URLSearchParams(nextUrl.split('?')[1]);
            const nextOffset = Number(params.get('offset'));
            setOffset(nextOffset); 
        }
    };

    const handlePreviousPage = () => {
        if (response && response.previousUrl) {
            const previousUrl = response.previousUrl;
            const params = new URLSearchParams(previousUrl.split('?')[1]);
            const previousOffset = Number(params.get('offset'));
            setOffset(previousOffset);  
        }
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

            <div>
                <button className="button btnFooter" onClick={handlePreviousPage} disabled={!response || !response.previousUrl}>
                    Página Anterior
                </button>
                <button className="button btnFooter" onClick={handleNextPage} disabled={!response || !response.nextUrl}>
                    Próxima Página
                </button>
            </div>
        </div>
    );
}
