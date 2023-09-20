import React, {useEffect, useState} from "react";
import Card from '../components/Card';
import { getAllPosts } from "../services/postServices";

export default function Body() {

    const [news, setNews] = useState([]);

    async function findAllPosts() {
        const response = await getAllPosts();
        setNews(response.data.results)
    }

    useEffect(() => {
        findAllPosts();
    }, [])

    return(
        <div className="body">
            {news.map((post) => (
                <Card 
                    key={post.id}
                    title={post.title}
                    text={post.text}
                    banner={post.banner}
                />
            ))}                       
        </div>
    )
}