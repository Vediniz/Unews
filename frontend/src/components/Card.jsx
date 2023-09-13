import React from "react";
import { TextLimit } from "./TextLimit";

export default function Card(props) {
    return (
        <div className="card">
            <div className="card-body">
                <div>
                    <div className="card-title">{props.title}</div>

                    <div className="card-text">
                        <TextLimit text={props.text} limit={200} />
                    </div>
                </div>
                <img src={props.banner} alt="Imagem da noticia" />
            </div>
        </div>
    )
}