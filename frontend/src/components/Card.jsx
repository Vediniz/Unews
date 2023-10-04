import React, { useContext } from "react";
import { TextLimit } from "./TextLimit";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Card(props) {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    function handleEdit() {
        const id = props.id;
        navigate(`/news/edit/${id}`);
    }

    return (
        <div className="card">
            <img src={props.banner} alt="Imagem da noticia" />
            <div className="card-body">
                <div className="card-title" onClick={props.onClick}>{props.title}</div>

                <div className="card-text">
                    <TextLimit text={props.text} limit={100} />
                </div>
                <div className="card-footer">
                    <span onClick={props.onClick}>Ler mais...</span>
                    {!user && (
                        <span className="arrow" onClick={props.onClick}>&rarr;</span>
                    )}
                    {user && (
                        <button className="button" onClick={handleEdit}>
                            Editar
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}