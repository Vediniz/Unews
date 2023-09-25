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
            <div className="card-body">
                {user && (
                    <button className="btn-edit" onClick={handleEdit}>
                        Editar
                    </button>
                )}
                <div>
                    <div className="card-title" onClick={props.onClick}>{props.title}</div>

                    <div className="card-text">
                        <TextLimit text={props.text} limit={200} />
                    </div>
                </div>
                <img src={props.banner} alt="Imagem da noticia" />
            </div>
        </div>
    )
}