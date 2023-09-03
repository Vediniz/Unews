import React from "react";
import Card from './Card';
import { getAllPosts } from "../services/postServices";

export default function Body() {

    async function findAllPosts() {
        const response = await getAllPosts();
        // console.log(response.data.results);
        console.log(response)
    }

    findAllPosts();

    return(
        <div className="body">
            <Card />
            <Card />
            <Card />
            <Card />                        
            <Card />                        
            <Card />                        
            <Card />                        
            <Card />                        
        </div>
    )
}